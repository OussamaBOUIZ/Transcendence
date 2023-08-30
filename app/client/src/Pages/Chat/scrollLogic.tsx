export const scrollLogic = (outerDiv: React.RefObject<HTMLDivElement>, innerDiv: React.RefObject<HTMLDivElement>, prevInnerDivHeight: React.MutableRefObject<number>) => {
    return () => {
        const outerDivHeight = outerDiv?.current?.clientHeight ?? 0;
        const innerDivHeight = innerDiv?.current?.clientHeight !== undefined
        ? innerDiv.current.clientHeight + 24 : 24;
        const outerDivScrollTop = outerDiv?.current?.scrollTop;
        if (
            !prevInnerDivHeight.current || Number(prevInnerDivHeight.current) === 24 ||
            outerDivScrollTop === Number(prevInnerDivHeight.current) - outerDivHeight
        ) {
            outerDiv?.current?.scrollTo({
                top: innerDivHeight - outerDivHeight,
                left: 0,
                behavior: prevInnerDivHeight.current ? "smooth" : "auto"
            });
        }
        prevInnerDivHeight.current = innerDivHeight;
    }
}