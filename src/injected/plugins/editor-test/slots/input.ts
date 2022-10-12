import { IRecorderContext } from '@/injected/services';

let prevEvent: InputEvent | null = null;

export default function inputSlot(
  type: string,
  event: InputEvent,
  context: IRecorderContext,
) {
  if (event.type === 'input' && prevEvent !== event) {
    prevEvent = event;
    if (!event.data) return false;
    const { selector } = context.selector.generateSelector(context.dom);
    context.addAction({
      name: 'fill',
      selector,
      signals: [],
      text: event.data || '',
    });
  }
  return false;
}
