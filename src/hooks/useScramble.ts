import { useState } from "react";
import {
  CubeState,
  scrambleProcessing,
} from "../components/scrambleViewer/scrambleProcessing";
import { randomScrambleForEvent } from "cubing/scramble";
import { useLocalStorage } from "usehooks-ts";

export type ScrambleType = "2x2x2" | "3x3x3" | "4x4x4" | "5x5x5" | "6x6x6" | "7x7x7";

export function useScramble() {
  const [scramble, setScramble] = useState<string>("");
  const [nowCubeType, setNowCubeType] = useLocalStorage<ScrambleType>("cube-type", "3x3x3");

  const cubeList: ScrambleType[] = ["2x2x2", "3x3x3", "4x4x4", "5x5x5", "6x6x6", "7x7x7"];

  function changeCubeType(newCubeType: ScrambleType) {
    setNowCubeType(newCubeType);
  }

  async function setNewScramble(scrambleType: ScrambleType) {
    const newScr = await getScramble(scrambleType);
    setScramble(newScr);
  }

  async function getScramble(scrambleType: ScrambleType): Promise<string> {
    if (scrambleType === "3x3x3") {
      const scrAlg = await randomScrambleForEvent("333");
      return scrAlg.toString();
    } else if (scrambleType === "2x2x2") {
      const scrAlg = await randomScrambleForEvent("222");
      return scrAlg.toString();
    } else if (scrambleType === "4x4x4") {
      const scrAlg = await randomScrambleForEvent("444");
      return scrAlg.toString();
    } else if (scrambleType === "5x5x5") {
      const scrAlg = await randomScrambleForEvent("555");
      return scrAlg.toString();
    } else if (scrambleType === "6x6x6") {
      const scrAlg = await randomScrambleForEvent("666");
      return scrAlg.toString();
    } else if (scrambleType === "7x7x7") {
      const scrAlg = await randomScrambleForEvent("777");
      return scrAlg.toString();
    }

    return "";
  }

  // function get3x3x3Scramble(): string {
  //   const scrambleArr: string[] = [];
  //   let prevMove: string | null = null;
  //   let prvOfprvMove: string | null = null;

  //   for (let i = 0; i < 25; i++) {
  //     let move = faces[Math.floor(Math.random() * 6)];
  //     while (
  //       move === prevMove ||
  //       (oppFaceMap[move] === prevMove && move === prvOfprvMove)
  //     ) {
  //       move = faces[Math.floor(Math.random() * 6)];
  //     }
  //     const modifier = modifiers[Math.floor(Math.random() * 3)];

  //     scrambleArr.push(move + modifier);
  //     prvOfprvMove = prevMove;
  //     prevMove = move;
  //   }

  //   return scrambleArr.join(" ");
  // }

  function getScrambleCubeState(scrambleType: ScrambleType, scramble: string) {
    if (scrambleType === "3x3x3") return scrambleProcessing(scramble);
    else
      return {
        U: ["U", "U", "U", "U", "U", "U", "U", "U", "U"],
        D: ["D", "D", "D", "D", "D", "D", "D", "D", "D"],
        F: ["F", "F", "F", "F", "F", "F", "F", "F", "F"],
        B: ["B", "B", "B", "B", "B", "B", "B", "B", "B"],
        L: ["L", "L", "L", "L", "L", "L", "L", "L", "L"],
        R: ["R", "R", "R", "R", "R", "R", "R", "R", "R"],
      } as CubeState;
  }

  return { scramble, setNewScramble, getScrambleCubeState, nowCubeType, changeCubeType, cubeList };
}
