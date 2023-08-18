export interface IDispose {
  dispose(): void;
}

export function toDispose(handler: () => void): IDispose {
  return {
    dispose: handler,
  };
}

export default class Disposable implements IDispose {
  protected disposes: IDispose[] = [];

  protected registerDispose(dispose: IDispose) {
    this.disposes.push(dispose);
  }

  dispose(): void {
    for (let i = 0; i < this.disposes.length; i += 1) {
      this.disposes[i].dispose();
    }
    this.disposes.length = 0;
  }
}
