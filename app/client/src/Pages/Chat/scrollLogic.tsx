export const scrollLogic = (outerDiv, innerDiv, prevInnerDivHeight) => {
    return () => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight + 24;
        const outerDivScrollTop = outerDiv.current.scrollTop;
        console.log('scroll logic')
        if (
        !prevInnerDivHeight.current || prevInnerDivHeight.current === 24 ||
        outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
        ) {
            outerDiv.current.scrollTo({
                top: innerDivHeight - outerDivHeight,
                left: 0,
                behavior: prevInnerDivHeight.current ? "smooth" : "auto"
            });
        }
        prevInnerDivHeight.current = innerDivHeight;
    }
}