/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
export type InjectIDType<T> = T[];
export interface CLAZZ<T> extends Function {
  new (...args: any[]): T;
}

/**
 * 生成对应接口的注入id
 */
export const genInjectID: <T>() => InjectIDType<T> = (() => {
  let number = 0;
  return () => {
    number += 1;
    return number as never;
  };
})();

export function injectID2No(id: InjectIDType<unknown>): number {
  return id as unknown as number;
}

function getDeps(clz: any): Array<[InjectIDType<object>, string]> {
  return clz?.__deps || [];
}

function registerDeps(clz: any, id: number, key: string) {
  if (!clz.__deps) {
    clz.__deps = getDeps(
      Reflect.getPrototypeOf(clz.prototype)?.constructor
    ).slice(0);
  }
  clz.__deps.push([id, key]);
}

/**
 * 自动注入对应的Interface实现如果注入失败则会设置为null
 * @param id service的id
 */
export function autowired<Type>(id: InjectIDType<Type>) {
  return <K extends string, T extends Record<K, Type>>(target: T, key: K) => {
    // 注册依赖
    registerDeps(target.constructor, injectID2No(id), key);
  };
}

const _provides: { [key: number]: CLAZZ<unknown> } = {};

// provide service for all ioc class
export function Provide<Type>(id: InjectIDType<Type>) {
  return (constructor: CLAZZ<Type>) => {
    _provides[injectID2No(id)] = constructor;
  };
}

export default class IOCContext {
  static autowired = autowired;

  static genInjectID = genInjectID;

  static Provide = Provide;

  private clazzInstanceMap: Map<CLAZZ<unknown>, unknown> = new Map();

  // 注册的service
  private clazz: { [key: number]: CLAZZ<unknown> } = {};

  // 已经初始化的实例 每个id可能有多个实例
  private instances: { [key: number]: unknown[] } = {};

  registerBeanClazz<T>(id: InjectIDType<T>, clz: CLAZZ<T>) {
    const idNo = id as unknown as number;
    this.clazz[idNo] = clz;
  }

  registerBean<T>(id: InjectIDType<T>, bean: T) {
    this.instances[injectID2No(id)] = [bean];
  }

  getBeanClazz<T>(id: InjectIDType<T>): null | CLAZZ<T> {
    const idNo = id as unknown as number;
    return (this.clazz[idNo] as CLAZZ<T>) || _provides[idNo] || null;
  }

  getBeanByClazz<T>(Clz: CLAZZ<T>): T {
    if (this.clazzInstanceMap.has(Clz)) {
      return this.clazzInstanceMap.get(Clz) as never;
    }
    const bean = new Clz();
    this.clazzInstanceMap.set(Clz, bean);
    return bean;
  }

  newBean<T>(id: InjectIDType<T>): T | null {
    const Clz = this.getBeanClazz(id);
    if (Clz !== null) {
      const bean = this.getBeanByClazz(Clz);
      this.instances[injectID2No(id)] = [bean];
      this.resolveDeps(bean, Clz);
      return bean;
    }
    return null;
  }

  getBean<T>(id: InjectIDType<T>, create = true): T | null {
    const beans = this.instances[injectID2No(id)];
    if (beans) {
      return beans[0] as T;
    }
    if (create) {
      return this.newBean(id);
    }
    return null;
  }

  resolveDeps<T>(ins: T, Clz: CLAZZ<T>) {
    const deps = getDeps(Clz);
    deps.forEach(([id, key]) => {
      Reflect.defineProperty(ins as unknown as object, key, {
        get: () => this.getBean(id),
      });
    });
  }

  of<T extends object>(Clz: CLAZZ<T>): T {
    const ins = this.getBeanByClazz(Clz);
    this.resolveDeps(ins, Clz);
    return ins;
  }

  dispose() {
    this.clazz = {};
    this.instances = {};
  }
}
