import { useState, useRef, useEffect } from "react";

export interface ElementPos {
    x: number;
    y: number;
}

export interface ElementSize {
    width: number;
    height: number;
}

export enum ResizingPart {
    NO_RESIZING,
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    TOP_RIGHT,
    TOP_LEFT,
    BOT_RIGHT,
    BOT_LEFT
}

export function useElementMover(initialPos: ElementPos, initialSize: ElementSize) {

    const touchMargin = 20;

    const [isCliking, setIsClicking] = useState(false);
    const [isResizing, setIsResizing] = useState(ResizingPart.NO_RESIZING);
    const [isReSizable, setIsResizable] = useState(ResizingPart.NO_RESIZING);
    const [elementPos, setElementPos] = useState<ElementPos>(initialPos);
    const [elementSize, setElementSize] = useState<ElementSize>(initialSize);
    const firstMousePosRef = useRef<ElementPos | null> (null);
    const firstResizePosRef = useRef<ElementPos | null>(null);
    const elementPosRef = useRef(initialPos);
    const isResizingRef = useRef(false);

    function _detectResizeAction(cx: number, cy: number) {
        const isOnTop = cy < elementPosRef.current.y + touchMargin;
        const isOnBottom = cy > elementPosRef.current.y + elementSize.height - touchMargin;
        const isOnLeft = cx < elementPosRef.current.x + touchMargin;
        const isOnRight = cx > elementPosRef.current.x + elementSize.width - touchMargin;

        return [isOnTop, isOnBottom, isOnLeft, isOnRight];
    }

    function initMove(e: React.MouseEvent) {
        firstMousePosRef.current = {x: e.clientX - elementPos.x, y: e.clientY - elementPos.y};
        firstResizePosRef.current = {x: elementSize.width + elementPos.x - e.clientX, y: elementSize.height + elementPos.y - e.clientY};


        const [isOnTop, isOnBottom, isOnLeft, isOnRight] = _detectResizeAction(e.clientX, e.clientY);
        // console.log(isOnTop, isOnBottom, isOnLeft, isOnRight);


        if (isOnTop || isOnLeft || isOnBottom || isOnRight) isResizingRef.current = true;

        if (isOnTop && isOnLeft) setIsResizing(ResizingPart.TOP_LEFT);
        else if (isOnTop && isOnRight) setIsResizing(ResizingPart.TOP_RIGHT)
        else if (isOnBottom && isOnLeft) setIsResizing(ResizingPart.BOT_LEFT);
        else if (isOnBottom && isOnRight) setIsResizing(ResizingPart.BOT_RIGHT);
        else if (isOnTop) setIsResizing(ResizingPart.TOP);
        else if (isOnBottom) setIsResizing(ResizingPart.BOTTOM);
        else if (isOnLeft) setIsResizing(ResizingPart.LEFT);
        else if (isOnRight) setIsResizing(ResizingPart.RIGHT);
        else setIsClicking(true);
    }

    function moveElement(e: React.MouseEvent) {
        if (firstMousePosRef.current === null) return;

        const isOnBottom = e.clientY > elementPos.y + elementSize.height - touchMargin;
        const isOnRight = e.clientX > elementPos.x + elementSize.width - touchMargin;

        if (isOnBottom && isOnRight) setIsResizable(ResizingPart.BOT_RIGHT);
        else if (isOnBottom) setIsResizable(ResizingPart.BOTTOM);
        else if (isOnRight) setIsResizable(ResizingPart.RIGHT);

        if (isCliking) {
            const xNew = (e.clientX - firstMousePosRef.current.x);
            const yNew = (e.clientY - firstMousePosRef.current.y);
            setElementPos({x: xNew, y: yNew});
            elementPosRef.current = {x: xNew, y: yNew};
        }
    }

    function resizeElement(e: MouseEvent) {
        if (firstResizePosRef.current === null) return;
        let newWidth = elementSize.width;
        let newHeight = elementSize.height;
        // let newTop = elementPosRef.current.y; // state를 그대로 쓰는 경우 최신 값에 접근이 안됨
        // let newLeft = elementPosRef.current.x;

        if (isResizingRef.current) {
            // console.log('holy moly');
            const [isOnBottom, isOnRight] = _detectResizeAction(e.clientX, e.clientY);
            // console.log(isOnTop, isOnBottom, isOnLeft, isOnRight);

            if (isOnBottom) {
                newHeight = e.clientY - elementPosRef.current.y + firstResizePosRef.current.y;
            }
            if (isOnRight) {
                newWidth = e.clientX - elementPosRef.current.x + firstResizePosRef.current.x;
            }

            // if (isOnTop) {
            //     console.log('asdfasdfasdf');
            //     newHeight = elementSize.height + (e.clientY - elementPosRef.current.y + elementSize.height - firstResizePosRef.current.y);
            //     newTop -= newHeight - elementSize.height;

            //     console.log(elementSize.height, newHeight);
            //     console.log(elementPosRef.current.y, newTop);
            //     elementPosRef.current.y = newTop;
                
            // }
            setElementSize({width: newWidth, height: newHeight});
            // setElementPos({x: newLeft, y: newTop});
        }

    }

    function endResize() {
        firstResizePosRef.current = {x: 0, y: 0};
        setIsResizing(ResizingPart.NO_RESIZING);
        isResizingRef.current = false;
    }

    function endMove() {
        firstMousePosRef.current = {x: 0, y: 0};
        setIsClicking(false);
        console.log('fuck');
    }

    useEffect(() => {
        document.addEventListener('mousemove', resizeElement);
        document.addEventListener('mouseup', endResize);
    }, []);

    return {
        isCliking,
        isResizing,
        isReSizable,
        elementPos,
        elementSize,
        initMove,
        moveElement,
        endMove
    };

}