// import { CubeState } from "./scrambleProcessing";

export interface CubeState {
  U: ("U" | "D" | "F" | "B" | "L" | "R")[][];
  D: ("U" | "D" | "F" | "B" | "L" | "R")[][];
  F: ("U" | "D" | "F" | "B" | "L" | "R")[][];
  B: ("U" | "D" | "F" | "B" | "L" | "R")[][];
  L: ("U" | "D" | "F" | "B" | "L" | "R")[][];
  R: ("U" | "D" | "F" | "B" | "L" | "R")[][];
}

export function genNxNxNScrambleState(scramble: string, n: number): CubeState {
  const cube: CubeState = {
    U: Array(n)
      .fill("U")
      .map(() => Array(n).fill("U")),
    D: Array(n)
      .fill("D")
      .map(() => Array(n).fill("D")),
    F: Array(n)
      .fill("F")
      .map(() => Array(n).fill("F")),
    B: Array(n)
      .fill("B")
      .map(() => Array(n).fill("B")),
    R: Array(n)
      .fill("R")
      .map(() => Array(n).fill("R")),
    L: Array(n)
      .fill("L")
      .map(() => Array(n).fill("L")),
  };

  function rotate(face: string[][]) {
    for (let layer = 0; layer < Math.floor(n / 2); layer++) {
      let first = layer;
      let last = n - 1 - layer;
      for (let i = first; i < last; i++) {
        let offset = i - first;
        let top = face[first][i];

        face[first][i] = face[last - offset][first];
        face[last - offset][first] = face[last][last - offset];
        face[last][last - offset] = face[i][last];
        face[i][last] = top;
      }
    }
  }

  function rotateR(face: string[][]) {
    for (let layer = 0; layer < Math.floor(n / 2); layer++) {
      let first = layer;
      let last = n - 1 - layer;
      for (let i = first; i < last; i++) {
        let offset = i - first;
        let top = face[first][i];

        face[first][i] = face[i][last];
        face[i][last] = face[last][last - offset];
        face[last][last - offset] = face[last - offset][first];
        face[last - offset][first] = top;
      }
    }
    return face;
  }

  function rotateAdj(
    face: "U" | "D" | "F" | "R" | "L" | "B",
    modifier: "" | "'" | "2",
    thickness: 1 | 2 | 3
  ) {
    const temp = Array(n);
    if (face === "U") {
      for (let t = 0; t < thickness; t++) {
        for (let i = 0; i < n; i++) {
          temp[i] = cube.F[t][i];
        }
        if (modifier === "'") {
          for (let i = 0; i < n; i++) {
            cube.F[t][i] = cube.L[t][i];
            cube.L[t][i] = cube.B[t][i];
            cube.B[t][i] = cube.R[t][i];
            cube.R[t][i] = temp[i];
          }
        } else {
          for (let i = 0; i < n; i++) {
            cube.F[t][i] = cube.R[t][i];
            cube.R[t][i] = cube.B[t][i];
            cube.B[t][i] = cube.L[t][i];
            cube.L[t][i] = temp[i];
          }
        }
        if (modifier === "2") {
          for (let i = 0; i < n; i++) {
            temp[i] = cube.F[t][i];
          }
          for (let i = 0; i < n; i++) {
            cube.F[t][i] = cube.R[t][i];
            cube.R[t][i] = cube.B[t][i];
            cube.B[t][i] = cube.L[t][i];
            cube.L[t][i] = temp[i];
          }
        }
      }
    } else if (face === "D") {
      for (let t = 0; t < thickness; t++) {
        for (let i = 0; i < n; i++) {
          temp[i] = cube.F[n - 1 - t][i];
        }
        if (modifier === "'") {
          for (let i = 0; i < n; i++) {
            cube.F[n - 1 - t][i] = cube.R[n - 1 - t][i];
            cube.R[n - 1 - t][i] = cube.B[n - 1 - t][i];
            cube.B[n - 1 - t][i] = cube.L[n - 1 - t][i];
            cube.L[n - 1 - t][i] = temp[i];
          }
        } else {
          for (let i = 0; i < n; i++) {
            cube.F[n - 1 - t][i] = cube.L[n - 1 - t][i];
            cube.L[n - 1 - t][i] = cube.B[n - 1 - t][i];
            cube.B[n - 1 - t][i] = cube.R[n - 1 - t][i];
            cube.R[n - 1 - t][i] = temp[i];
          }
        }
        if (modifier === "2") {
          for (let i = 0; i < n; i++) {
            temp[i] = cube.F[n - 1 - t][i];
          }
          for (let i = 0; i < n; i++) {
            cube.F[n - 1 - t][i] = cube.L[n - 1 - t][i];
            cube.L[n - 1 - t][i] = cube.B[n - 1 - t][i];
            cube.B[n - 1 - t][i] = cube.R[n - 1 - t][i];
            cube.R[n - 1 - t][i] = temp[i];
          }
        }
      }
    } else if (face === "R") {
      for (let t = 0; t < thickness; t++) {
        for (let i = 0; i < n; i++) {
          temp[i] = cube.U[i][n - 1 - t];
        }
        if (modifier === "'") {
          for (let i = 0; i < n; i++) {
            cube.U[i][n - 1 - t] = cube.B[n - 1 - i][t];
            cube.B[n - 1 - i][t] = cube.D[i][n - 1 - t];
            cube.D[i][n - 1 - t] = cube.F[i][n - 1 - t];
            cube.F[i][n - 1 - t] = temp[i];
          }
        } else {
          for (let i = 0; i < n; i++) {
            cube.U[i][n - 1 - t] = cube.F[i][n - 1 - t];
            cube.F[i][n - 1 - t] = cube.D[i][n - 1 - t];
            cube.D[i][n - 1 - t] = cube.B[n - 1 - i][t];
            cube.B[n - 1 - i][t] = temp[i];
          }
        }
        if (modifier === "2") {
          for (let i = 0; i < n; i++) {
            temp[i] = cube.U[i][n - 1 - t];
          }
          for (let i = 0; i < n; i++) {
            cube.U[i][n - 1 - t] = cube.F[i][n - 1 - t];
            cube.F[i][n - 1 - t] = cube.D[i][n - 1 - t];
            cube.D[i][n - 1 - t] = cube.B[n - 1 - i][t];
            cube.B[n - 1 - i][t] = temp[i];
          }
        }
      }
    } else if (face === "L") {
      for (let t = 0; t < thickness; t++) {
        for (let i = 0; i < n; i++) {
          temp[i] = cube.U[i][t];
        }
        if (modifier === "'") {
          for (let i = 0; i < n; i++) {
            cube.U[i][t] = cube.F[i][t];
            cube.F[i][t] = cube.D[i][t];
            cube.D[i][t] = cube.B[n - 1 - i][n - 1 - t];
            cube.B[n - 1 - i][n - 1 - t] = temp[i];
          }
        } else {
          for (let i = 0; i < n; i++) {
            cube.U[i][t] = cube.B[n - 1 - i][n - 1 - t];
            cube.B[n - 1 - i][n - 1 - t] = cube.D[i][t];
            cube.D[i][t] = cube.F[i][t];
            cube.F[i][t] = temp[i];
          }
        }
        if (modifier === "2") {
          for (let i = 0; i < n; i++) {
            temp[i] = cube.U[i][t];
          }
          for (let i = 0; i < n; i++) {
            cube.U[i][t] = cube.B[n - 1 - i][n - 1 - t];
            cube.B[n - 1 - i][n - 1 - t] = cube.D[i][t];
            cube.D[i][t] = cube.F[i][t];
            cube.F[i][t] = temp[i];
          }
        }
      }
    } else if (face === "F") {
      for (let t = 0; t < thickness; t++) {
        for (let i = 0; i < n; i++) {
          temp[i] = cube.U[n - 1 - t][i];
        }
        if (modifier === "'") {
          for (let i = 0; i < n; i++) {
            cube.U[n - 1 - t][i] = cube.R[i][t];
            cube.R[i][t] = cube.D[t][n - 1 - i];
            cube.D[t][n - 1 - i] = cube.L[n - 1 - i][n - 1 - t];
            cube.L[n - 1 - i][n - 1 - t] = temp[i];
          }
        } else {
          for (let i = 0; i < n; i++) {
            cube.U[n - 1 - t][i] = cube.L[n - 1 - i][n - 1 - t];
            cube.L[n - 1 - i][n - 1 - t] = cube.D[t][n - 1 - i];
            cube.D[t][n - 1 - i] = cube.R[i][t];
            cube.R[i][t] = temp[i];
            // cube.R[i][t] = temp[n - 1 - i];
            // cube.D[t][i] = cube.R[i][t];
            // cube.L[i][n - 1 - t] = cube.D[t][n - 1 - i];
            // cube.U[n - 1 - t][i] = cube.L[i][n - 1 - t];
          }
        }
        if (modifier === "2") {
          for (let i = 0; i < n; i++) {
            temp[i] = cube.U[n - 1 - t][i];
          }
          for (let i = 0; i < n; i++) {
            cube.U[n - 1 - t][i] = cube.L[n - 1 - i][n - 1 - t];
            cube.L[n - 1 - i][n - 1 - t] = cube.D[t][n - 1 - i];
            cube.D[t][n - 1 - i] = cube.R[i][t];
            cube.R[i][t] = temp[i];
          }
        }
      }
    } else if (face === "B") {
      for (let t = 0; t < thickness; t++) {
        for (let i = 0; i < n; i++) {
          temp[i] = cube.U[t][i];
        }
        if (modifier === "'") {
          for (let i = 0; i < n; i++) {
            cube.U[t][i] = cube.L[n-1-i][t];
            cube.L[n-1-i][t] = cube.D[n - 1 - t][n-1-i];
            cube.D[n - 1 - t][n-1-i] = cube.R[i][n - 1 - t];
            cube.R[i][n - 1 - t] = temp[i];
          }
        } else {
          for (let i = 0; i < n; i++) {
            cube.U[t][i] = cube.R[i][n - 1 - t];
            cube.R[i][n - 1 - t] = cube.D[n - 1 - t][n-1-i];
            cube.D[n - 1 - t][n-1-i] = cube.L[n-1-i][t];
            cube.L[n-1-i][t] = temp[i];
          }
        }
        if (modifier === "2") {
          for (let i = 0; i < n; i++) {
            temp[i] = cube.U[t][i];
          }
          for (let i = 0; i < n; i++) {
            cube.U[t][i] = cube.R[i][n - 1 - t];
            cube.R[i][n - 1 - t] = cube.D[n - 1 - t][n-1-i];
            cube.D[n - 1 - t][n-1-i] = cube.L[n-1-i][t];
            cube.L[n-1-i][t] = temp[i];
          }
        }
      }
    }
  }

  function executeRotate(
    face: "U" | "R" | "D" | "F" | "R" | "L",
    modifier: "" | "'" | "2",
    thickness: 1 | 2 | 3
  ) {
    if (face === "U") {
      if (modifier === "") rotate(cube.U);
      else if (modifier === "'") rotateR(cube.U);
      else {
        rotate(cube.U);
        rotate(cube.U);
      }
    } else if (face === "R") {
      if (modifier === "") rotate(cube.R);
      else if (modifier === "'") rotateR(cube.R);
      else {
        rotate(cube.R);
        rotate(cube.R);
      }
    } else if (face === "F") {
      if (modifier === "") rotate(cube.F);
      else if (modifier === "'") rotateR(cube.F);
      else {
        rotate(cube.F);
        rotate(cube.F);
      }
    } else if (face === "D") {
      if (modifier === "") rotate(cube.D);
      else if (modifier === "'") rotateR(cube.D);
      else {
        rotate(cube.D);
        rotate(cube.D);
      }
    } else if (face === "L") {
      if (modifier === "") rotate(cube.L);
      else if (modifier === "'") rotateR(cube.L);
      else {
        rotate(cube.L);
        rotate(cube.L);
      }
    } else if (face === "B") {
      if (modifier === "") rotate(cube.B);
      else if (modifier === "'") rotateR(cube.B);
      else {
        rotate(cube.B);
        rotate(cube.B);
      }
    }
    rotateAdj(face, modifier, thickness);
  }

  scramble.split(" ").forEach((element) => {
    const face = element[0] === "3" ? element[1] : element[0];
    let modifier = element.includes("'")
      ? "'"
      : element.includes("2")
      ? "2"
      : "";
    let thickness = element[0] === "3" ? 3 : element.includes("w") ? 2 : 1;
    executeRotate(
      face as "U" | "R" | "D" | "F" | "R" | "L",
      modifier as "" | "'" | "2",
      thickness as 1 | 2 | 3
    );
  });
  return cube;
}
