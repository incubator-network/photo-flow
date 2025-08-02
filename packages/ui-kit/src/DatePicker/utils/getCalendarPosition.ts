export const getCalendarPositionStyles = (rect: DOMRect | undefined) => {
  return {
    top: `top-[${Math.floor(<number>rect?.top + 39)}px]`,
    left: `left-[${Math.floor(<number>rect?.left)}px]`,
  }
}
