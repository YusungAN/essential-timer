import { useState } from "react";
import {
  CubeState,
  scrambleProcessing,
} from "../components/scrambleViewer/scrambleProcessing";

type ScrambleType = "3x3x3";

export function useScramble() {
  const [scramble, setScramble] = useState<string>("");

  const faces = ["U", "D", "R", "L", "F", "B"];
  const modifiers = ["", "'", "2"];

  const oppFaceMap: { [key: string]: string } = {
    U: "D",
    D: "U",
    F: "B",
    B: "F",
    R: "L",
    L: "R",
  };

  function setNewScramble(scrambleType: ScrambleType) {
    setScramble(getScramble(scrambleType));
  }

  function getScramble(scrambleType: ScrambleType): string {
    if (scrambleType === "3x3x3") {
      return get3x3x3Scramble();
    }

    return "";
  }

  function get3x3x3Scramble(): string {
    const scrambleArr: string[] = [];
    let prevMove: string | null = null;
    let prvOfprvMove: string | null = null;

    for (let i = 0; i < 25; i++) {
      let move = faces[Math.floor(Math.random() * 6)];
      while (
        move === prevMove ||
        (oppFaceMap[move] === prevMove && move === prvOfprvMove)
      ) {
        move = faces[Math.floor(Math.random() * 6)];
      }
      const modifier = modifiers[Math.floor(Math.random() * 3)];

      scrambleArr.push(move + modifier);
      prvOfprvMove = prevMove;
      prevMove = move;
    }

    return scrambleArr.join(" ");
  }

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

  return { scramble, setNewScramble, getScrambleCubeState };
}
