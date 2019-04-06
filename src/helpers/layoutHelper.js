import React, { useEffect } from "react";

export const useLayoutHelper = () => {
    const fixedElement = React.createRef();
    const scrollingElement = React.createRef();

    useEffect(() => {
        if (scrollingElement && fixedElement) {
            scrollingElement.current.style.marginTop = `${
                fixedElement.current.clientHeight
            }px`;
        }
    });
    return { fixedElement, scrollingElement };
};