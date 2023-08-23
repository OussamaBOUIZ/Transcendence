import { useEffect, useRef, useCallback } from 'react';
import OuterProvider from "./OuterProvider";
import InnerProvider from "./InnerProvider";

const useScrollableBox = ({messageList}) => {
  const outerDiv = useRef(null);
  const innerDiv = useRef(null);
  const prevInnerDivHeight = useRef(null);

  useEffect(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;
    const outerDivScrollTop = outerDiv.current.scrollTop;

    if (
      !prevInnerDivHeight.current ||
      outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
    ) {
      outerDiv.current.scrollTo({
        top: innerDivHeight - outerDivHeight,
        left: 0,
        behavior: prevInnerDivHeight.current ? "smooth" : "auto"
      });
    }
    console.log("hhhhhssss")
    prevInnerDivHeight.current = innerDivHeight;
  }, [messageList]);

  const handleScrollButtonClick = () => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;

    outerDiv.current.scrollTo({
      top: innerDivHeight - outerDivHeight,
      left: 0,
      behavior: "smooth"
    });
  };

  return {
    outerDiv,
    innerDiv,
    OuterProvider,
    InnerProvider,
    handleScrollButtonClick
  };
};

export default useScrollableBox;
