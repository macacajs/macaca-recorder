import { IRecorderContext } from '@/injected/services';

let prevEvent: MouseEvent | null = null;

export default function clickSlot(
  type: string,
  event: MouseEvent,
  context: IRecorderContext,
) {
  if (event.type === 'click' && prevEvent !== event) {
    prevEvent = event;
    const { selector } = context.selector.generateSelector(context.dom);
    context.addAction({
      name: 'click',
      selector,
      signals: [],
      clickCount: event.detail,
      modifiers: context.modifiersForEvent(event),
      button: context.buttonForEvent(event),
      position: context.positionForEvent(event),
    });
  }
  return false;
}
