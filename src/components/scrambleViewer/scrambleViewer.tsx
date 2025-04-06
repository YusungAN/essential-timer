import { ScrambleType, useScramble } from "../../hooks/useScramble";
import { useState, useEffect } from "react";
import CubeFace from "./subs/cubeFace";
import { CubeState } from "./genNxNxNScrambleState";
import Square1Face from "./subs/square1Face";
import Square1Slice from "./subs/square1Slice";
import { useLocalStorage } from "usehooks-ts";
// import { useElementMover } from "../../hooks/useElementMover";
// import { ResizingPart } from "../../hooks/useElementMover";
// import {
//   subscribeCustomEvent,
//   unsubscribeCustomEvent,
// } from "../../util/customEvent";
import { Square1State } from "./genSquare1ScrambleState";

function ScrambleViewer(props: {
  scramble: string;
  cubeType: ScrambleType;
  isLoading: boolean;
}) {
  const { scramble, cubeType, isLoading } = props;
  const [isScrambleViewOpen] = useLocalStorage("isScrambleViewOpen", true);

  const [cube, setCube] = useState<CubeState | Square1State>({
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

  // const isOpenedScrambleViewer = useViewersHandlingStore(
  //   (state) => state.isOpenedScrambleViewer
  // );

  // function showResizecursor(resizeType: ResizingPart) {
  //   if (resizeType === ResizingPart.BOT_RIGHT) return "cursor-nwse-resize";
  //   // else if (resizeType === ResizingPart.RIGHT) return 'cursor-ew-resize'
  //   // else if (resizeType === ResizingPart.BOTTOM) return 'cursor-ns-resize'
  //   return "";
  // }

  function isNxNxN(obj: CubeState | Square1State) {
    return (obj as CubeState).U !== undefined;
  }

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
        className={`rounded-md p-[10px] ${
          isScrambleViewOpen ? "flex" : "hidden"
        } w-[80vw] sm:w-[50vw] md:w-[400px] md:h-[350px] justify-content items-center absolute bottom-[50px] md:top-[calc(100vh-350px)] left-auto md:right-[0]`}
      >
        {isLoading ? (
          <div className="w-full flex justify-center">
            <div>Loading...</div>
          </div>
        ) : isNxNxN(cube) ? (
          <div className="w-full grid grid-rows-3 grid-cols-4 gap-3">
            <div className="w-full aspect-square"></div>
            <CubeFace faceColors={(cube as CubeState).U} />
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <CubeFace faceColors={(cube as CubeState).L} />
            <CubeFace faceColors={(cube as CubeState).F} />
            <CubeFace faceColors={(cube as CubeState).R} />
            <CubeFace faceColors={(cube as CubeState).B} />
            <div className="w-full aspect-square"></div>
            <CubeFace faceColors={(cube as CubeState).D} />
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
          </div>
        ) : (
          <>
            {/* <div className="flex"> */}
            <div className="absolute top-[-24vh] sm:top-[-30vh] md:top-[0] left-[0vw] sm:left-[-10vw] md:left-[0] scale-80 sm:scale-100">
              <Square1Face
                sizeRate={1}
                pieces={(cube as Square1State).top}
                base="U"
              />
            </div>
            <div className="absolute top-[calc(-24vh+250px)] sm:top-[calc(-30vh+310px)] md:top-[310px] right-[40vw] sm:right-[25vw] md:right-[200px] scale-80 sm:scale-100">
              <Square1Face
                sizeRate={1}
                pieces={(cube as Square1State).down}
                base="D"
              />
            </div>
            <div className="absolute top-[calc(-24vh)] md:top-[0px] left-[0] sm:left-[-11vw] md:left-[0px] scale-80 sm:scale-100">
              <Square1Slice
                sizeRate={1}
                isSliced={(cube as Square1State).slice}
              />
            </div>

            {/* </div> */}
            {/* <Square1Sticker piece={new SquarePiece("U", 2, ["F", "R"])} rotateDeg={0} />
            <Square1Sticker piece={new SquarePiece("U", 2, ["F", "R"])} rotateDeg={180} /> */}
          </>
        )}
      </div>
    </>
  );
}

export default ScrambleViewer;
