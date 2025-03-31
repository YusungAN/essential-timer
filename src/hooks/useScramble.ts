import { useState } from "react";
import { CubeState, genNxNxNScrambleState } from "../components/scrambleViewer/genNxNxNScrambleState";
import { randomScrambleForEvent } from "cubing/scramble";
import { useLocalStorage } from "usehooks-ts";
import { genSquare1ScrambleState } from "../components/scrambleViewer/genSquare1ScrambleState";

export type ScrambleType = "2x2x2" | "3x3x3" | "4x4x4" | "5x5x5" | "6x6x6" | "7x7x7" | "Square-1" | "3x3x3BLD" | "4x4x4BLD" | "5x5x5BLD";

export function useScramble() {
  const [scramble, setScramble] = useState<string>("");
  const [nowCubeType, setNowCubeType] = useLocalStorage<ScrambleType>("cube-type", "3x3x3");

  const cubeList: ScrambleType[] = ["2x2x2", "3x3x3", "4x4x4", "5x5x5", "6x6x6", "7x7x7", "Square-1", "3x3x3BLD", "4x4x4BLD", "5x5x5BLD"];

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
    } else if (scrambleType === "Square-1") {
      const scrAlg = await randomScrambleForEvent("sq1");
      return scrAlg.toString();
    } else if (scrambleType === "3x3x3BLD") {
      const scrAlg = await randomScrambleForEvent("333bf");
      return scrAlg.toString();
    } else if (scrambleType === "4x4x4BLD") {
      const scrAlg = await randomScrambleForEvent("444bf");
      return scrAlg.toString();
    } else if (scrambleType === "5x5x5BLD") {
      const scrAlg = await randomScrambleForEvent("555bf");
      return scrAlg.toString();
    }

    return "";
  }

  function getScrambleCubeState(scrambleType: ScrambleType, scramble: string) {
    if (scrambleType === "3x3x3" || scrambleType === "3x3x3BLD") return genNxNxNScrambleState(scramble, 3);
    else if (scrambleType === "2x2x2") return genNxNxNScrambleState(scramble, 2);
    else if (scrambleType === "4x4x4" || scrambleType === "4x4x4BLD") return genNxNxNScrambleState(scramble, 4);
    else if (scrambleType === "5x5x5" || scrambleType === "5x5x5BLD") return genNxNxNScrambleState(scramble, 5);
    else if (scrambleType === "6x6x6") return genNxNxNScrambleState(scramble, 6);
    else if (scrambleType === "7x7x7") return genNxNxNScrambleState(scramble, 7);
    else if (scrambleType === "Square-1") return genSquare1ScrambleState(scramble);
    else
      return {
        U: Array(3).map(() => Array(3).fill("U")),
        D: Array(3).map(() => Array(3).fill("D")),
        F: Array(3).map(() => Array(3).fill("F")),
        B: Array(3).map(() => Array(3).fill("B")),
        R: Array(3).map(() => Array(3).fill("R")),
        L: Array(3).map(() => Array(3).fill("L")),
      } as CubeState;
  }

  return { scramble, setNewScramble, getScrambleCubeState, nowCubeType, changeCubeType, cubeList };
}
