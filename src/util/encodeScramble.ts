export const ROTATION_TO_CHAR: Record<string, string> = {
  F: "A",
  "F'": "B",
  F2: "C",
  B: "D",
  "B'": "E",
  B2: "F",
  R: "G",
  "R'": "H",
  R2: "I",
  L: "J",
  "L'": "K",
  L2: "L",
  U: "M",
  "U'": "N",
  U2: "O",
  D: "P",
  "D'": "Q",
  D2: "R",
  M: "S",
  "M'": "T",
  M2: "U",
  E: "V",
  "E'": "W",
  E2: "X",
  S: "Y",
  "S'": "Z",
  S2: "a",
  Lw: "b",
  "Lw'": "c",
  Lw2: "d",
  Rw: "e",
  "Rw'": "f",
  Rw2: "g",
  Bw: "h",
  "Bw'": "i",
  Bw2: "j",
  Fw: "k",
  "Fw'": "l",
  Fw2: "m",
  Dw: "n",
  "Dw'": "o",
  Dw2: "p",
  Uw: "q",
  "Uw'": "r",
  Uw2: "s",
  x: "t",
  "x'": "u",
  x2: "v",
  y: "w",
  "y'": "x",
  y2: "y",
  z: "z",
  "z'": "0",
  z2: "1",
  "\n": "2",
};

export function encodeCubeSequence(sequence: string): string {
  try {
    const result: string[] = [];
    sequence = sequence.replace(/\n/g, " 0 ");
    console.log(sequence);
    sequence.split(" ").forEach((rotation) => {
    rotation = rotation.trim();
    console.log(rotation);
    if (rotation === "") return;
    if (rotation === "0") rotation = "\n";
    const char = ROTATION_TO_CHAR[rotation];
    if (char) {
      result.push(char);
    } else {
        throw new Error(`Invalid rotation "${rotation}" in sequence.`);
      }
    });
    return result.join("");
  } catch (error) {
    console.error(error);
    alert("3x3x3 스크램블이 아닌 것 같아요");
    throw error;
  }
}