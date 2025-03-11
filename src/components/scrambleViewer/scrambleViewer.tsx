import { useScramble } from "../../hooks/useScramble";
import { useState, useEffect } from "react";
import { CubeState } from "./scrambleProcessing";
import CubeFace from "./subs/cubeFace";
import { useElementMover } from "../../hooks/useElementMover";
import { ResizingPart } from "../../hooks/useElementMover";

function ScrambleViewer(props: {scramble: string}) {

    const {scramble} = props;

    const [cube, setCube] = useState<CubeState>({
        U: ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
        D: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
        F: ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
        B: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
        L: ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
        R: ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R']
    });
    const {getScrambleCubeState} = useScramble();
    const {isCliking, isResizing, isReSizable, elementPos, elementSize, initMove, moveElement, endMove} = useElementMover({x: window.innerWidth-450, y: window.innerHeight/2-175}, {width: 400, height: 350}, 'sc-viewer');

    function showResizecursor(resizeType: ResizingPart) {
        if (resizeType === ResizingPart.BOT_RIGHT) return 'cursor-nwse-resize';
        // else if (resizeType === ResizingPart.RIGHT) return 'cursor-ew-resize'
        // else if (resizeType === ResizingPart.BOTTOM) return 'cursor-ns-resize'
        return ''
    }

    useEffect(() => {
        setCube(getScrambleCubeState('3x3x3', scramble));
    }, [scramble]);

    // xl:left-[calc(100vw-420px)] lg:left-[calc(100vw-320px)] md:left-[calc(100vw-420px)]
    // xl:w-[400px] lg:w-[300px] md:w-[200px]


    return (
        <>
            <div 
                style={{top: `${elementPos.y}px`, left: `${elementPos.x}px`, width: `${elementSize.width}px`, height: `${elementSize.height}px`}}
                className={`absolute top-[30vh] bg-[#F4F4F7] rounded-md p-[10px] ${isCliking || isResizing ? 'opacity-75' : 'opacity-100'} ${showResizecursor(isReSizable)} min-h-fit min-w-[200px] flex justify-content items-center`}
                onMouseDown={initMove}
                onMouseMove={moveElement}
                onMouseUp={endMove}
                onMouseLeave={endMove}
            >
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
                <div className="w-[10px] aspect-square border-b-1 border-r-1 absolute top-[calc(100%-10px)] left-[calc(100%-10px)]"></div>
            </div>
        </>
    )
}

export default ScrambleViewer;
