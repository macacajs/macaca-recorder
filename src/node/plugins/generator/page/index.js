/* eslint-disable */
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * 生成对应接口的注入id
 */
const genInjectID = (() => {
    let number = 0;
    return () => {
        number += 1;
        return number;
    };
})();
function injectID2No(id) {
    return id;
}
function getDeps(clz) {
    return (clz === null || clz === void 0 ? void 0 : clz.__deps) || [];
}
function registerDeps(clz, id, key) {
    var _a;
    if (!clz.__deps) {
        clz.__deps = getDeps((_a = Reflect.getPrototypeOf(clz.prototype)) === null || _a === void 0 ? void 0 : _a.constructor).slice(0);
    }
    clz.__deps.push([id, key]);
}
/**
 * 自动注入对应的Interface实现如果注入失败则会设置为null
 * @param id service的id
 */
function autowired(id) {
    return (target, key) => {
        // 注册依赖
        registerDeps(target.constructor, injectID2No(id), key);
    };
}
const _provides = {};
// provide service for all ioc class
function Provide(id) {
    return (constructor) => {
        _provides[injectID2No(id)] = constructor;
    };
}
class IOCContext {
    constructor() {
        // 注册的service
        this.clazz = {};
        // 已经初始化的实例 每个id可能有多个实例
        this.instances = {};
    }
    registerBeanClazz(id, clz) {
        const idNo = id;
        this.clazz[idNo] = clz;
    }
    registerBean(id, bean) {
        this.instances[injectID2No(id)] = [bean];
    }
    getBeanClazz(id) {
        const idNo = id;
        return this.clazz[idNo] || _provides[idNo] || null;
    }
    newBean(id) {
        const Clz = this.getBeanClazz(id);
        if (Clz !== null) {
            const bean = new Clz();
            this.instances[injectID2No(id)] = [bean];
            this.resolveDeps(bean, Clz);
            return bean;
        }
        return null;
    }
    getBean(id, create = true) {
        const beans = this.instances[injectID2No(id)];
        if (beans) {
            return beans[0];
        }
        if (create) {
            return this.newBean(id);
        }
        return null;
    }
    resolveDeps(ins, Clz) {
        const deps = getDeps(Clz);
        deps.forEach(([id, key]) => {
            Reflect.defineProperty(ins, key, {
                get: () => this.getBean(id),
            });
        });
    }
    of(Clz) {
        const ins = new Clz();
        this.resolveDeps(ins, Clz);
        return ins;
    }
    dispose() {
        this.clazz = {};
        this.instances = {};
    }
}
IOCContext.autowired = autowired;
IOCContext.genInjectID = genInjectID;
IOCContext.Provide = Provide;

const pluginManagerID = genInjectID();

const serviceManagerID = genInjectID();

const ieventID = genInjectID();

function uniq(arr) {
    return arr.reduce((ret, cur) => {
        if (!ret.includes(cur)) {
            ret.push(cur);
        }
        return ret;
    }, []);
}

const iappID = genInjectID();

class App {
    // @internal
    // 禁止通过new App创建
    // 应该采用creatApp创建
    constructor(plugins) {
        this.context = new IOCContext();
        this.plugins = [];
        this.pluginInstances = [];
        this.plugins = plugins;
        this.start();
    }
    /**
     * 创建应用
     * @param plugins 插件列表
     * @param id 对外报漏的服务id
     * @returns 对外接口
     */
    static createApp(plugins, id) {
        const app = new App(uniq(plugins));
        const api = app.getService(id);
        if (!api) {
            throw new Error('unregister api plugin');
        }
        return api;
    }
    start() {
        this.context.registerBean(iappID, this);
        this.context.registerBean(pluginManagerID, this);
        this.context.registerBean(serviceManagerID, this);
        this.pluginInstances = this.plugins.map(plugin => {
            return this.context.of(plugin);
        });
        // 注册服务
        this.pluginInstances.forEach(plug => {
            var _a;
            (_a = plug.registerSrv) === null || _a === void 0 ? void 0 : _a.call(plug);
        });
        this.context.resolveDeps(this, App);
        if (this.eventManager) {
            this.eventManager.start.trigger();
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // 解析依赖并触发init事件
            yield Promise.all(this.pluginInstances.map((plug, index) => {
                var _a;
                this.context.resolveDeps(plug, this.plugins[index]);
                return (_a = plug.init) === null || _a === void 0 ? void 0 : _a.call(plug);
            }));
            // 触发插件的afterInit事件
            this.pluginInstances.forEach(plug => {
                var _a;
                (_a = plug.afterInit) === null || _a === void 0 ? void 0 : _a.call(plug);
            });
            if (this.eventManager) {
                this.eventManager.afterInit.trigger();
            }
        });
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.eventManager) {
                this.eventManager.dispose.trigger();
            }
            // 解析依赖并触发dispose事件
            yield Promise.all(this.pluginInstances.map(plug => {
                var _a;
                return (_a = plug.dispose) === null || _a === void 0 ? void 0 : _a.call(plug);
            }));
            this.context.dispose();
        });
    }
    /**
     * 注册插件
     * @param plugin 插件
     */
    registerPlugin(plugin) {
        var _a;
        // 防止重复注册
        if (this.hasRegisterPlugin(plugin))
            return;
        const plugins = this.plugins.slice(0);
        const pluginInstances = this.pluginInstances.slice(0);
        try {
            plugins.push(plugin);
            const plug = this.context.of(plugin);
            pluginInstances.push(plug);
            (_a = plug.registerSrv) === null || _a === void 0 ? void 0 : _a.call(plug);
            this.plugins = plugins;
            this.pluginInstances = pluginInstances;
        }
        catch (e) {
            throw new Error(`register plugin ${plugin.name} error`);
        }
    }
    /**
     * 注册插件
     * @param plugins 插件列表
     */
    registerPlugins(plugins) {
        plugins.forEach(plugin => this.registerPlugin(plugin));
    }
    /**
     * 判断是否注册某个插件
     * @param plugin 插件
     * @returns 是否注册
     */
    hasRegisterPlugin(plugin) {
        return !!this.plugins.find(v => v === plugin);
    }
    unregisterPlugin(plugin) {
        var _a, _b;
        const index = this.plugins.indexOf(plugin);
        if (index >= 0) {
            (_b = (_a = this.pluginInstances[index]).onUnregistter) === null || _b === void 0 ? void 0 : _b.call(_a);
            this.pluginInstances.slice(index, 1);
            this.plugins.splice(index, 1);
        }
    }
    registerServiceBean(id, srv) {
        this.context.registerBean(id, srv);
    }
    registerService(id, srv) {
        this.context.registerBeanClazz(id, srv);
    }
    getService(id) {
        return this.context.getBean(id);
    }
}
__decorate([
    autowired(ieventID),
    __metadata("design:type", Object)
], App.prototype, "eventManager", void 0);

const iapiID = genInjectID();

const icodeGenID = genInjectID();

class Api {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.init();
        });
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.dispose();
        });
    }
    getService(id) {
        return this.serviceManager.getService(id);
    }
}
__decorate([
    autowired(iappID),
    __metadata("design:type", Object)
], Api.prototype, "app", void 0);
__decorate([
    autowired(ieventID),
    __metadata("design:type", Object)
], Api.prototype, "eventManger", void 0);
__decorate([
    autowired(icodeGenID),
    __metadata("design:type", Object)
], Api.prototype, "codeGen", void 0);
__decorate([
    autowired(serviceManagerID),
    __metadata("design:type", Object)
], Api.prototype, "serviceManager", void 0);

class ApiPlugin {
    registerSrv() {
        this.srvManager.registerService(iapiID, Api);
    }
}
__decorate([
    autowired(serviceManagerID),
    __metadata("design:type", Object)
], ApiPlugin.prototype, "srvManager", void 0);

class EventBase {
    constructor() {
        this.callbacks = [];
        this.onceCallbacks = [];
    }
    on(cb) {
        this.callbacks.push(cb);
    }
    once(cb) {
        this.onceCallbacks.push(cb);
    }
    off(cb) {
        this.callbacks = this.callbacks.filter(mcb => mcb !== cb);
        this.onceCallbacks = this.onceCallbacks.filter(mcb => mcb !== cb);
    }
    trigger(arg) {
        this.callbacks.forEach(cb => cb(arg));
        this.onceCallbacks.forEach(cb => cb(arg));
        this.onceCallbacks = [];
    }
}

class EventImpl {
    constructor() {
        this.start = new EventBase();
        this.stop = new EventBase();
        this.afterInit = new EventBase();
        this.dispose = new EventBase();
    }
}

class EventPlugin {
    registerSrv() {
        this.srvManager.registerService(ieventID, EventImpl);
    }
}
__decorate([
    autowired(serviceManagerID),
    __metadata("design:type", Object)
], EventPlugin.prototype, "srvManager", void 0);

/**
 *  recorder 前端代码
 */
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = App.createApp([ApiPlugin, EventPlugin], iapiID);
        yield app.init();
    });
}
start();
