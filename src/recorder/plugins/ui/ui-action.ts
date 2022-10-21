import { IActions, IUIActions } from '@/recorder/services';

export default class UIActions implements IUIActions {
  actions: IActions[] = [];

  get uiActions() {
    return this.actions;
  }

  registerAction(name: string, action: () => Promise<void>): void {
    this.actions.push({ name, action });
  }
}
