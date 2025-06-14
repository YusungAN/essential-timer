// import { useState, useRef, useEffect } from "react";
// import { useLocalStorage } from "usehooks-ts";

// export interface ElementPos {
//   x: number;
//   y: number;
// }

// export interface ElementSize {
//   width: number;
//   height: number;
// }

// export enum ResizingPart {
//   NO_RESIZING,
//   TOP,
//   RIGHT,
//   BOTTOM,
//   LEFT,
//   TOP_RIGHT,
//   TOP_LEFT,
//   BOT_RIGHT,
//   BOT_LEFT,
// }

// export function useResize(
//   initialSize: ElementSize,
//   cursorPosition: 'TOP_LEFT' | 'TOP_RIGHT' | 'LEFT' | 'RIGHT',
//   storedInfoKey: string
// ) {
//   const touchMargin = 20;

//   const [isCliking, setIsClicking] = useState(false);
//   const [isResizing, setIsResizing] = useState(ResizingPart.NO_RESIZING);
//   const [isReSizable, setIsResizable] = useState(ResizingPart.NO_RESIZING);
//   const [elementPos, setElementPos] = useState<ElementPos>(initialPos);
//   const [elementSize, setElementSize] = useState<ElementSize>(initialSize);
//   const firstMousePosRef = useRef<ElementPos | null>(null);
//   const firstResizePosRef = useRef<ElementPos | null>(null);
//   const elementPosRef = useRef(initialPos);
//   const isResizingRef = useRef(false);
//   const elementSizeRef = useRef(initialSize);

//   const [elementSizeStorage, setElementSizeStorage] = useLocalStorage(
//     `${storedInfoKey}-size`,
//     initialSize
//   );

//   function _isTryingResize(cx: number, cy: number) {
//     const isOnTop = cy < elementPosRef.current.y + touchMargin;
//     const isOnLeft = cx < elementPosRef.current.x + touchMargin;
//     //need isOnRight.
  
//     return isOnTop && isOnLeft;
//   }

//   function initMove(e: React.MouseEvent) {
//     firstMousePosRef.current = {
//       x: e.clientX - elementPos.x,
//       y: e.clientY - elementPos.y,
//     };
//     firstResizePosRef.current = {
//       x: elementSize.width + elementPos.x - e.clientX,
//       y: elementSize.height + elementPos.y - e.clientY,
//     };

//     const isResize = _detectResizeAction(e.clientX, e.clientY);

//     if (isResize) {
//       isResizingRef.current = true;
//     } else setIsClicking(true);
//   }

//   function moveElement(e: React.MouseEvent) {
//     if (firstMousePosRef.current === null) return;

//     const { isOnBottom, isOnRight } = _detectResizeAction(e.clientX, e.clientY);

//     if (isOnBottom && isOnRight) setIsResizable(ResizingPart.BOT_RIGHT);
//     else if (isOnBottom) setIsResizable(ResizingPart.BOTTOM);
//     else if (isOnRight) setIsResizable(ResizingPart.RIGHT);

//     if (isCliking) {
//       const xNew = e.clientX - firstMousePosRef.current.x;
//       const yNew = e.clientY - firstMousePosRef.current.y;
//       setElementPos({ x: xNew, y: yNew });
//       elementPosRef.current = { x: xNew, y: yNew };
//     }
//   }

//   function resizeElement(e: MouseEvent) {
//     document.body.style.userSelect = "none";
//     if (firstResizePosRef.current === null) return;
//     let newWidth = elementSize.width;
//     let newHeight = elementSize.height;

//     if (isResizingRef.current) {
//       const { isOnBottom, isOnRight } = _detectResizeAction(
//         e.clientX,
//         e.clientY
//       );
//       console.log(newWidth, newHeight);

//       if (isOnBottom) {
//         newHeight =
//           e.clientY - elementPosRef.current.y + firstResizePosRef.current.y;
//       }
//       if (isOnRight) {
//         newWidth =
//           e.clientX - elementPosRef.current.x + firstResizePosRef.current.x;
//       }
//       setElementSize({ width: newWidth, height: newHeight });
//       elementSizeRef.current = { width: newWidth, height: newHeight };
//     }
//   }

//   function endResize() {
//     document.body.style.userSelect = "all";
//     firstResizePosRef.current = { x: 0, y: 0 };
//     setIsResizing(ResizingPart.NO_RESIZING);
//     isResizingRef.current = false;
//     setElementSizeStorage(elementSizeRef.current);
//   }

//   function endMove() {
//     firstMousePosRef.current = { x: 0, y: 0 };
//     setIsClicking(false);
//     setElementPosStorage(elementPosRef.current);
//   }

//   function resetSizeandPos() {
//     setElementPos(initialPos);
//     setElementSize(initialSize);
//     setElementSizeStorage(initialSize);
//     setElementPosStorage(initialPos);
//   }

//   useEffect(() => {
//     document.addEventListener("mousemove", resizeElement);
//     document.addEventListener("mouseup", endResize);
    
//     setElementSize(elementSizeStorage);

//     return () => {
//       document.removeEventListener("mousemove", resizeElement);
//       document.removeEventListener("mouseup", endResize);
//     };
//   }, []);

//   return {
//     isCliking,
//     isResizing,
//     isReSizable,
//     elementPos,
//     elementSize,
//     initMove,
//     moveElement,
//     endMove,
//     resetSizeandPos,
//   };
// }
