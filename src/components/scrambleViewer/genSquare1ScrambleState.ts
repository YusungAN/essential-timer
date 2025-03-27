export interface Square1State {
  slice: boolean;
  top: SquarePiece[];
  down: SquarePiece[];
}

export class SquarePiece {
  base;
  deg;
  sideColor;

  constructor(
    base: "U" | "D",
    deg: 1 | 2,
    sideColor: ("U" | "D" | "F" | "B" | "L" | "R")[]
  ) {
    this.base = base;
    this.deg = deg;
    this.sideColor = sideColor;
  }
}

export function genSquare1ScrambleState(scramble: string) {
  const cube: Square1State = {
    slice: false,
    top: [
      // 앞면의 엣지부터 위에서 본 기준 반시계 방향 순
      new SquarePiece("U", 1, ["F"]),
      new SquarePiece("U", 2, ["F", "R"]),
      new SquarePiece("U", 1, ["R"]),
      new SquarePiece("U", 2, ["R", "B"]),
      new SquarePiece("U", 1, ["B"]),
      new SquarePiece("U", 2, ["B", "L"]),
      new SquarePiece("U", 1, ["L"]),
      new SquarePiece("U", 2, ["L", "F"]),
    ],
    down: [
      // 앞면의 엣지부터 "위"에서 본 기준 반시계 방향 순
      new SquarePiece("D", 1, ["F"]),
      new SquarePiece("D", 2, ["F", "R"]),
      new SquarePiece("D", 1, ["R"]),
      new SquarePiece("D", 2, ["R", "B"]),
      new SquarePiece("D", 1, ["B"]),
      new SquarePiece("D", 2, ["B", "L"]),
      new SquarePiece("D", 1, ["L"]),
      new SquarePiece("D", 2, ["L", "F"]),
    ],
  };

  function rotateTop(n: number) {
    // n*30도 만큼 돌림
    n = n % 12;
    if (n === 0) return;
    if (n < 0) n += 12; // 편의상 방향은 무조건 시계방향으로만 돌림
    let sliceIdx = 0;
    let degSum = 0;

    cube.top.some((piece, idx) => {
      degSum += piece.deg;
      if (degSum === n) {
        sliceIdx = idx + 1;
        return true; // break
      }
        if (degSum > n) throw Error("scramble is wrong");
      return false;
    });
    cube.top = [
      ...cube.top.slice(sliceIdx),
      ...cube.top.slice(0, sliceIdx),
    ];
  }

  function rotateBot(n: number) {
    n = (-1 * n) % 12;
    if (n === 0) return;
    if (n < 0) n += 12; // 편의상 방향은 무조건 "반"시계방향으로만 돌림

    let sliceIdx = 0;
    let degSum = 0;

    cube.down.some((piece, idx) => {
      degSum += piece.deg;
      if (degSum === n) {
        sliceIdx = idx + 1;
        return true; // break
      }
      if (degSum > n) throw Error("scramble is wrong");
      return false;
    });

    cube.down = [
      ...cube.down.slice(sliceIdx),
      ...cube.down.slice(0, sliceIdx),
    ];
  }

  function slice() {
    let topSliceIdx = 0;
    let downSliceIdx = 0;
    let degSum = 0;
    cube.top.some((piece, idx) => {
      degSum += piece.deg;
      if (degSum === 6) {
        // 180도
        topSliceIdx = idx + 1;
        return true; // break
      }
      if (degSum > 6) throw Error("scramble is wrong");
      return false;
    });

    degSum = 0;
    cube.down.some((piece, idx) => {
      degSum += piece.deg;
      if (degSum === 6) {
        // 180도
        downSliceIdx = idx + 1;
        return true; // break
      }
      if (degSum > 6) throw Error("scramble is wrong");
      return false;
    });

    cube.slice = !cube.slice;
    const temp = cube.top.slice();
    cube.top = [
      ...cube.down.slice(0, downSliceIdx).reverse(),
      ...cube.top.slice(topSliceIdx),
    ];
    cube.down = [
      ...temp.slice(0, topSliceIdx).reverse(),
      ...cube.down.slice(downSliceIdx),
    ];
  }

  const scrambleArr = scramble.split("/");
  console.log(scrambleArr);
  const scrLen = scrambleArr.length;
  scrambleArr.forEach((item) => {
    item = item.trim();
    if (item === "") return;
    item = item.slice(1, -1);
    const [topDeg, downDeg] = item.split(", ");
    rotateTop(Number(topDeg));
    rotateBot(Number(downDeg));
    slice();
  });

  if (scrambleArr[scrLen - 1] !== "") slice();

  return cube;
}
