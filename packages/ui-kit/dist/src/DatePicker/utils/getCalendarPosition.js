export const getCalendarPositionStyles = (rect) => {
    return {
        top: `top-[${Math.floor(rect?.top + 39)}px]`,
        left: `left-[${Math.floor(rect?.left)}px]`,
    };
};
