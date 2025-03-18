export interface CubeState {
  U: ("U" | "D" | "F" | "B" | "L" | "R")[];
  D: ("U" | "D" | "F" | "B" | "L" | "R")[];
  F: ("U" | "D" | "F" | "B" | "L" | "R")[];
  B: ("U" | "D" | "F" | "B" | "L" | "R")[];
  L: ("U" | "D" | "F" | "B" | "L" | "R")[];
  R: ("U" | "D" | "F" | "B" | "L" | "R")[];
}

function scrambleProcessing(scramble: string) {
  // Define the cube with solved state
  const cube: CubeState = {
    U: ["U", "U", "U", "U", "U", "U", "U", "U", "U"],
    D: ["D", "D", "D", "D", "D", "D", "D", "D", "D"],
    F: ["F", "F", "F", "F", "F", "F", "F", "F", "F"],
    B: ["B", "B", "B", "B", "B", "B", "B", "B", "B"],
    L: ["L", "L", "L", "L", "L", "L", "L", "L", "L"],
    R: ["R", "R", "R", "R", "R", "R", "R", "R", "R"],
  };

  function rotate(faceArr: string[]) {
    [
      faceArr[0],
      faceArr[1],
      faceArr[2],
      faceArr[3],
      faceArr[4],
      faceArr[5],
      faceArr[6],
      faceArr[7],
      faceArr[8],
    ] = [
      faceArr[6],
      faceArr[3],
      faceArr[0],
      faceArr[7],
      faceArr[4],
      faceArr[1],
      faceArr[8],
      faceArr[5],
      faceArr[2],
    ];
  }

  function rotateR(faceArr: string[]) {
    [
      faceArr[0],
      faceArr[1],
      faceArr[2],
      faceArr[3],
      faceArr[4],
      faceArr[5],
      faceArr[6],
      faceArr[7],
      faceArr[8],
    ] = [
      faceArr[2],
      faceArr[5],
      faceArr[8],
      faceArr[1],
      faceArr[4],
      faceArr[7],
      faceArr[0],
      faceArr[3],
      faceArr[6],
    ];
  }
  function sideSwap(
    face1: string[],
    face2: string[],
    face3: string[],
    face4: string[],
    l1: number[],
    l2: number[],
    l3: number[],
    l4: number[]
  ) {
    for (let i = 0; i < 3; i++) {
      [face1[l1[i]], face2[l2[i]], face3[l3[i]], face4[l4[i]]] = [
        face4[l4[i]],
        face1[l1[i]],
        face2[l2[i]],
        face3[l3[i]],
      ];
    }
  }

  function sideSwapR(
    face1: string[],
    face2: string[],
    face3: string[],
    face4: string[],
    l1: number[],
    l2: number[],
    l3: number[],
    l4: number[]
  ) {
    sideSwap(face4, face3, face2, face1, l4, l3, l2, l1);
  }

  function rotateFace(
    face: "U" | "D" | "F" | "B" | "L" | "R",
    modifier: "" | "'" | "2"
  ) {
    if (face === "U") {
      if (modifier === "") {
        rotate(cube.U);
        sideSwap(
          cube.F,
          cube.L,
          cube.B,
          cube.R,
          [0, 1, 2],
          [0, 1, 2],
          [6, 7, 8],
          [0, 1, 2]
        );
      } else if (modifier === "'") {
        rotateR(cube.U);
        sideSwapR(
          cube.F,
          cube.L,
          cube.B,
          cube.R,
          [0, 1, 2],
          [0, 1, 2],
          [6, 7, 8],
          [0, 1, 2]
        );
      } else {
        rotate(cube.U);
        rotate(cube.U);
        sideSwap(
          cube.F,
          cube.L,
          cube.B,
          cube.R,
          [0, 1, 2],
          [0, 1, 2],
          [6, 7, 8],
          [0, 1, 2]
        );
        sideSwap(
          cube.F,
          cube.L,
          cube.B,
          cube.R,
          [0, 1, 2],
          [0, 1, 2],
          [6, 7, 8],
          [0, 1, 2]
        );
      }
    } else if (face === "D") {
      if (modifier === "") {
        rotate(cube.D);
        sideSwapR(
          cube.F,
          cube.L,
          cube.B,
          cube.R,
          [6, 7, 8],
          [6, 7, 8],
          [0, 1, 2],
          [6, 7, 8]
        );
      } else if (modifier === "'") {
        rotateR(cube.D);
        sideSwap(
          cube.F,
          cube.L,
          cube.B,
          cube.R,
          [6, 7, 8],
          [6, 7, 8],
          [0, 1, 2],
          [6, 7, 8]
        );
      } else {
        rotate(cube.D);
        rotate(cube.D);
        sideSwap(
          cube.F,
          cube.L,
          cube.B,
          cube.R,
          [6, 7, 8],
          [6, 7, 8],
          [0, 1, 2],
          [6, 7, 8]
        );
        sideSwap(
          cube.F,
          cube.L,
          cube.B,
          cube.R,
          [6, 7, 8],
          [6, 7, 8],
          [0, 1, 2],
          [6, 7, 8]
        );
      }
    } else if (face === "F") {
      if (modifier === "") {
        rotate(cube.F);
        sideSwap(
          cube.U,
          cube.R,
          cube.D,
          cube.L,
          [6, 7, 8],
          [0, 3, 6],
          [2, 1, 0],
          [8, 5, 2]
        );
      } else if (modifier === "'") {
        rotateR(cube.F);
        sideSwapR(
          cube.U,
          cube.R,
          cube.D,
          cube.L,
          [6, 7, 8],
          [0, 3, 6],
          [2, 1, 0],
          [8, 5, 2]
        );
      } else {
        rotate(cube.F);
        rotate(cube.F);
        sideSwap(
          cube.U,
          cube.R,
          cube.D,
          cube.L,
          [6, 7, 8],
          [0, 3, 6],
          [2, 1, 0],
          [8, 5, 2]
        );
        sideSwap(
          cube.U,
          cube.R,
          cube.D,
          cube.L,
          [6, 7, 8],
          [0, 3, 6],
          [2, 1, 0],
          [8, 5, 2]
        );
      }
    } else if (face === "B") {
      if (modifier === "") {
        rotateR(cube.B);
        sideSwapR(
          cube.U,
          cube.R,
          cube.D,
          cube.L,
          [0, 1, 2],
          [2, 5, 8],
          [8, 7, 6],
          [6, 3, 0]
        );
      } else if (modifier === "'") {
        rotate(cube.B);
        sideSwap(
          cube.U,
          cube.R,
          cube.D,
          cube.L,
          [0, 1, 2],
          [2, 5, 8],
          [8, 7, 6],
          [6, 3, 0]
        );
      } else {
        rotate(cube.B);
        rotate(cube.B);
        sideSwap(
          cube.U,
          cube.R,
          cube.D,
          cube.L,
          [0, 1, 2],
          [2, 5, 8],
          [8, 7, 6],
          [6, 3, 0]
        );
        sideSwap(
          cube.U,
          cube.R,
          cube.D,
          cube.L,
          [0, 1, 2],
          [2, 5, 8],
          [8, 7, 6],
          [6, 3, 0]
        );
      }
    } else if (face === "R") {
      if (modifier === "") {
        rotate(cube.R);
        sideSwap(
          cube.U,
          cube.B,
          cube.D,
          cube.F,
          [2, 5, 8],
          [0, 3, 6],
          [2, 5, 8],
          [2, 5, 8]
        );
      } else if (modifier === "'") {
        rotateR(cube.R);
        sideSwapR(
          cube.U,
          cube.B,
          cube.D,
          cube.F,
          [2, 5, 8],
          [0, 3, 6],
          [2, 5, 8],
          [2, 5, 8]
        );
      } else {
        rotate(cube.R);
        rotate(cube.R);
        sideSwap(
          cube.U,
          cube.B,
          cube.D,
          cube.F,
          [2, 5, 8],
          [0, 3, 6],
          [2, 5, 8],
          [2, 5, 8]
        );
        sideSwap(
          cube.U,
          cube.B,
          cube.D,
          cube.F,
          [2, 5, 8],
          [0, 3, 6],
          [2, 5, 8],
          [2, 5, 8]
        );
      }
    } else if (face === "L") {
      if (modifier === "") {
        rotate(cube.L);
        sideSwapR(
          cube.U,
          cube.B,
          cube.D,
          cube.F,
          [0, 3, 6],
          [2, 5, 8],
          [0, 3, 6],
          [0, 3, 6]
        );
      } else if (modifier === "'") {
        rotateR(cube.L);
        sideSwap(
          cube.U,
          cube.B,
          cube.D,
          cube.F,
          [0, 3, 6],
          [2, 5, 8],
          [0, 3, 6],
          [0, 3, 6]
        );
      } else {
        rotate(cube.L);
        rotate(cube.L);
        sideSwap(
          cube.U,
          cube.B,
          cube.D,
          cube.F,
          [0, 3, 6],
          [2, 5, 8],
          [0, 3, 6],
          [0, 3, 6]
        );
        sideSwap(
          cube.U,
          cube.B,
          cube.D,
          cube.F,
          [0, 3, 6],
          [2, 5, 8],
          [0, 3, 6],
          [0, 3, 6]
        );
      }
    }
  }

  scramble.split(" ").forEach((element) => {
    rotateFace(
      element[0] as "U" | "D" | "F" | "B" | "L" | "R",
      element.length == 1 ? "" : (element[1] as "" | "'" | "2")
    );
  });

  [
    cube.B[0],
    cube.B[1],
    cube.B[2],
    cube.B[3],
    cube.B[4],
    cube.B[5],
    cube.B[6],
    cube.B[7],
    cube.B[8],
  ] = [
    cube.B[6],
    cube.B[7],
    cube.B[8],
    cube.B[3],
    cube.B[4],
    cube.B[5],
    cube.B[0],
    cube.B[1],
    cube.B[2],
  ];

  return cube;
}

export { scrambleProcessing };
