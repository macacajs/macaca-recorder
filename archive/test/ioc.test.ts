import { expect } from 'chai';
import IOCContext, { Provide } from '@/core/ioc';

describe('test ioc', () => {
  it('should work create class', () => {
    class Car {}

    const ctx = new IOCContext();
    expect(ctx.of(Car)).to.instanceOf(Car);
  });

  it('should work create class inject with registerBeanClazz', () => {
    interface IEngine {
      run(): number;
    }

    const IEngine = IOCContext.genInjectID<IEngine>();

    class Engine implements IEngine {
      ID = 1;

      run() {
        return this.ID;
      }
    }

    class Car {
      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    const ctx = new IOCContext();
    ctx.registerBeanClazz(IEngine, Engine);
    expect(ctx.of(Car).engine.run()).to.equal(1);
  });

  it('should work create class inject with registerBean', () => {
    interface IEngine {
      run(): number;
    }

    const IEngine = IOCContext.genInjectID<IEngine>();

    class Engine implements IEngine {
      ID = 1;

      run() {
        return this.ID;
      }
    }

    class Car {
      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    const ctx = new IOCContext();
    ctx.registerBean(IEngine, ctx.of(Engine));
    expect(ctx.of(Car).engine.run()).to.equal(1);
  });

  it('should work create class inject with Provide', () => {
    interface IEngine {
      run(): number;
    }

    const IEngine = IOCContext.genInjectID<IEngine>();

    @IOCContext.Provide(IEngine)
    class Engine implements IEngine {
      ID = 1;

      run() {
        return this.ID;
      }
    }

    class Car {
      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    const ctx = new IOCContext();
    expect(ctx.of(Car).engine.run()).to.equal(1);
    expect(ctx.of(Car).engine).to.instanceOf(Engine);
  });

  it('registerBeanClazz order before then Provide', () => {
    interface IEngine {
      run(): number;
    }

    const IEngine = IOCContext.genInjectID<IEngine>();

    @IOCContext.Provide(IEngine)
    class MEngine implements IEngine {
      ID = 1;

      run() {
        return this.ID;
      }
    }

    class Engine implements IEngine {
      ID = 2;

      run() {
        return this.ID;
      }
    }

    class Car {
      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    const ctx = new IOCContext();
    ctx.registerBeanClazz(IEngine, Engine);
    expect(ctx.of(Car).engine.run()).to.equal(2);
    expect(ctx.of(Car).engine).to.instanceOf(Engine);
    expect(ctx.of(Car).engine).not.instanceOf(MEngine);
  });

  it('should be cache', () => {
    interface IEngine {
      run(): number;
    }

    const IEngine = IOCContext.genInjectID<IEngine>();

    @IOCContext.Provide(IEngine)
    class NEngine implements IEngine {
      ID = 1;

      run() {
        return this.ID;
      }
    }

    class Car {
      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    class NCar {
      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    const ctx = new IOCContext();
    expect(ctx.of(Car).engine).to.equal(ctx.of(NCar).engine);
    expect(ctx.of(Car).engine).to.instanceOf(NEngine);
  });

  it('should be null when no provider', () => {
    interface IEngine {
      run(): number;
    }

    const IEngine = IOCContext.genInjectID<IEngine>();

    class Car {
      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    const ctx = new IOCContext();
    expect(ctx.of(Car).engine).to.equal(null);
  });

  it('should be work whit circle deps', () => {
    interface IEngine {
      car: ICar;
      run(): number;
    }

    interface ICar {
      engine: IEngine;
    }

    const IEngine = IOCContext.genInjectID<IEngine>();
    const ICar = IOCContext.genInjectID<ICar>();

    @Provide(IEngine)
    class Engine implements IEngine {
      ID = 1;

      @IOCContext.autowired(ICar)
      car: ICar;

      run() {
        return this.ID;
      }
    }

    @Provide(ICar)
    class Car {
      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    class App {
      @IOCContext.autowired(ICar)
      car: ICar;

      @IOCContext.autowired(IEngine)
      engine: IEngine;
    }

    const ctx = new IOCContext();
    const app = ctx.of(App);

    expect(app.engine).not.equal(null);
    expect(app.car).not.equal(null);
    expect(app.engine.car).to.equal(app.car);
    expect(app.engine).to.instanceOf(Engine);
    expect(app.car).to.instanceOf(Car);
  });

  it('should be work with extends class', () => {
    interface IEngine {
      run(): number;
    }

    const IEngine = IOCContext.genInjectID<IEngine>();

    @IOCContext.Provide(IEngine)
    class Engine implements IEngine {
      ID = 1;

      run() {
        return this.ID;
      }
    }

    class ParentCar {
      @IOCContext.autowired(IEngine)
      pengine: IEngine;
    }

    class Car extends ParentCar {
      @IOCContext.autowired(IEngine)
      cengine: IEngine;
    }

    const ctx = new IOCContext();
    const car = ctx.of(Car);
    expect(car.cengine).to.instanceOf(Engine);
    expect(car.pengine).to.instanceOf(Engine);
  });
});
