/* eslint-disable no-bitwise */
export function modifiersForEvent(event: MouseEvent | KeyboardEvent): number {
  return (
    (event.altKey ? 1 : 0) |
    (event.ctrlKey ? 2 : 0) |
    (event.metaKey ? 4 : 0) |
    (event.shiftKey ? 8 : 0)
  );
}

export function buttonForEvent(event: MouseEvent): 'left' | 'middle' | 'right' {
  switch (event.which) {
    case 1:
      return 'left';
    case 2:
      return 'middle';
    case 3:
      return 'right';
    default:
      return 'left';
  }
}

export function positionForEvent(
  event: MouseEvent,
): { x: number; y: number } | undefined {
  return {
    x: event.offsetX,
    y: event.offsetY,
  };
}
