import { useState } from "react";
import {
  CubeState,
  genNxNxNScrambleState,
} from "../components/scrambleViewer/genNxNxNScrambleState";
import { randomScrambleForEvent } from "cubing/scramble";
import { useLocalStorage } from "usehooks-ts";
import { genSquare1ScrambleState } from "../components/scrambleViewer/genSquare1ScrambleState";
import { CUBE_TYPES, CubeType } from "../constants/cubeTypes";

export type ScrambleType = CubeType;

export function useScramble() {
  const [scramble, setScramble] = useState<string>("");
  const [nowCubeType, setNowCubeType] = useLocalStorage<ScrambleType>(
    "cube-type",
    CUBE_TYPES.CUBE_3X3
  );

  const cubeList: ScrambleType[] = [
    CUBE_TYPES.CUBE_2X2,
    CUBE_TYPES.CUBE_3X3,
    CUBE_TYPES.CUBE_4X4,
    CUBE_TYPES.CUBE_5X5,
    CUBE_TYPES.CUBE_6X6,
    CUBE_TYPES.CUBE_7X7,
    CUBE_TYPES.SQUARE_1,
    CUBE_TYPES.CUBE_3BLD,
    CUBE_TYPES.CUBE_4BLD,
    CUBE_TYPES.CUBE_5BLD,
  ];

  function changeCubeType(newCubeType: ScrambleType) {
    setNowCubeType(newCubeType);
  }

  async function setNewScramble(scrambleType: ScrambleType) {
    const newScr = await getScramble(scrambleType);
    setScramble(newScr);
  }

  async function getScramble(scrambleType: ScrambleType): Promise<string> {
    if (scrambleType === CUBE_TYPES.CUBE_3X3) {
      const scrAlg = await randomScrambleForEvent("333");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.CUBE_2X2) {
      const scrAlg = await randomScrambleForEvent("222");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.CUBE_4X4) {
      const scrAlg = await randomScrambleForEvent("444");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.CUBE_5X5) {
      const scrAlg = await randomScrambleForEvent("555");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.CUBE_6X6) {
      const scrAlg = await randomScrambleForEvent("666");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.CUBE_7X7) {
      const scrAlg = await randomScrambleForEvent("777");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.SQUARE_1) {
      const scrAlg = await randomScrambleForEvent("sq1");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.CUBE_3BLD) {
      const scrAlg = await randomScrambleForEvent("333bf");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.CUBE_4BLD) {
      const scrAlg = await randomScrambleForEvent("444bf");
      return scrAlg.toString();
    } else if (scrambleType === CUBE_TYPES.CUBE_5BLD) {
      const scrAlg = await randomScrambleForEvent("555bf");
      return scrAlg.toString();
    }

    return "";
  }

  function getScrambleCubeState(scrambleType: ScrambleType, scramble: string) {
    if (
      scrambleType === CUBE_TYPES.CUBE_3X3 ||
      scrambleType === CUBE_TYPES.CUBE_3BLD
    )
      return genNxNxNScrambleState(scramble, 3);
    else if (scrambleType === CUBE_TYPES.CUBE_2X2)
      return genNxNxNScrambleState(scramble, 2);
    else if (
      scrambleType === CUBE_TYPES.CUBE_4X4 ||
      scrambleType === CUBE_TYPES.CUBE_4BLD
    )
      return genNxNxNScrambleState(scramble, 4);
    else if (
      scrambleType === CUBE_TYPES.CUBE_5X5 ||
      scrambleType === CUBE_TYPES.CUBE_5BLD
    )
      return genNxNxNScrambleState(scramble, 5);
    else if (scrambleType === CUBE_TYPES.CUBE_6X6)
      return genNxNxNScrambleState(scramble, 6);
    else if (scrambleType === CUBE_TYPES.CUBE_7X7)
      return genNxNxNScrambleState(scramble, 7);
    else if (scrambleType === CUBE_TYPES.SQUARE_1)
      return genSquare1ScrambleState(scramble);
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

  return {
    scramble,
    setNewScramble,
    getScrambleCubeState,
    nowCubeType,
    changeCubeType,
    cubeList,
  };
}
