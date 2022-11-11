import { IRecorderContext } from '@/injected/services';

let prevEvent: KeyboardEvent | null = null;

export default function keydownSlot(
  type: string,
  event: KeyboardEvent,
  context: IRecorderContext,
) {
  if (type === 'keydown' && prevEvent !== event) {
    prevEvent = event;
    const { selector } = context.selector.generateSelector(context.dom);
    context.addAction({
      name: 'press',
      selector,
      signals: [],
      key: event.key,
      modifiers: context.modifiersForEvent(event),
    });
  }
  return false;
}
