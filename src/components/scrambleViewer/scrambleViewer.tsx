import { ScrambleType, useScramble } from "../../hooks/useScramble";
import { useState, useEffect } from "react";
import CubeFace from "./subs/cubeFace";
import { CubeState } from "./genNxNxNScrambleState";
// import { useElementMover } from "../../hooks/useElementMover";
// import { ResizingPart } from "../../hooks/useElementMover";
// import {
//   subscribeCustomEvent,
//   unsubscribeCustomEvent,
// } from "../../util/customEvent";
import { useViewersHandlingStore } from "../../store/useViewersHandleStore";

function ScrambleViewer(props: {
  scramble: string;
  cubeType: ScrambleType;
  isLoading: boolean;
}) {
  const { scramble, cubeType, isLoading } = props;

  const [cube, setCube] = useState<CubeState>({
    U: Array(3)
      .fill("U")
      .map(() => Array(3).fill("U")),
    D: Array(3)
      .fill("D")
      .map(() => Array(3).fill("U")),
    F: Array(3)
      .fill("F")
      .map(() => Array(3).fill("F")),
    B: Array(3)
      .fill("B")
      .map(() => Array(3).fill("B")),
    R: Array(3)
      .fill("R")
      .map(() => Array(3).fill("R")),
    L: Array(3)
      .fill("L")
      .map(() => Array(3).fill("L")),
  });

  const { getScrambleCubeState } = useScramble();
  // const {
  //   isCliking,
  //   isResizing,
  //   isReSizable,
  //   elementPos,
  //   elementSize,
  //   initMove,
  //   moveElement,
  //   endMove,
  //   resetSizeandPos,
  // } = useElementMover(
  //   { x: window.innerWidth - 450, y: window.innerHeight / 2 - 175 },
  //   { width: 400, height: 350 },
  //   "sc-viewer"
  // );
  const isOpenedScrambleViewer = useViewersHandlingStore(
    (state) => state.isOpenedScrambleViewer
  );

  // function showResizecursor(resizeType: ResizingPart) {
  //   if (resizeType === ResizingPart.BOT_RIGHT) return "cursor-nwse-resize";
  //   // else if (resizeType === ResizingPart.RIGHT) return 'cursor-ew-resize'
  //   // else if (resizeType === ResizingPart.BOTTOM) return 'cursor-ns-resize'
  //   return "";
  // }

  useEffect(() => {
    setCube(getScrambleCubeState(cubeType, scramble));
  }, [scramble]);

  // useEffect(() => {
  //   subscribeCustomEvent("reset-display", resetSizeandPos);
  //   return () => unsubscribeCustomEvent("reset-display", resetSizeandPos);
  // }, []);

  // xl:left-[calc(100vw-420px)] lg:left-[calc(100vw-320px)] md:left-[calc(100vw-420px)]
  // xl:w-[400px] lg:w-[300px] md:w-[200px]

  return (
    <>
      <div
        // style={{
        //   top: `${elementPos.y}px`,
        //   left: `${elementPos.x}px`,
        //   width: `${elementSize.width}px`,
        //   height: `${elementSize.height}px`,
        // }}
        // className={`absolute top-[30vh] bg-[#F4F4F7] rounded-md p-[10px] ${
        //   isCliking || isResizing ? "opacity-75" : "opacity-100"
        // } ${showResizecursor(isReSizable)} min-h-fit min-w-[200px] ${
        //   isOpenedScrambleViewer ? "flex" : "hidden"
        // } justify-content items-center`}
        // onMouseDown={initMove}
        // onMouseMove={moveElement}
        // onMouseUp={endMove}
        // onMouseLeave={endMove}
        className={`bg-[#F4F4F7] rounded-md p-[10px] ${
          isOpenedScrambleViewer ? "flex" : "hidden"
        } w-[400px] h-[350px] justify-content items-center absolute top-[calc(100vh-350px)] right-[0]`}
      >
        {isLoading ? (
          <div className="w-full flex justify-center">
            <div>Loading...</div>
          </div>
        ) : (
          <div className="w-full grid grid-rows-3 grid-cols-4 gap-3">
            <div className="w-full aspect-square"></div>
            <CubeFace faceColors={cube.U} />
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <CubeFace faceColors={cube.L} />
            <CubeFace faceColors={cube.F} />
            <CubeFace faceColors={cube.R} />
            <CubeFace faceColors={cube.B} />
            <div className="w-full aspect-square"></div>
            <CubeFace faceColors={cube.D} />
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
          </div>
        )}
        {/* <div className="w-[10px] aspect-square border-b-1 border-r-1 absolute top-[calc(100%-10px)] left-[calc(100%-10px)]"></div> */}
      </div>
    </>
  );
}

export default ScrambleViewer;
