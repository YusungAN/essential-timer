import { SquarePiece } from "../genSquare1ScrambleState";
import Square1Sticker from "./square1Sticker";

function Square1Face(props: { pieces: SquarePiece[]; base: "U" | "D", sizeRate: number }) {
  const { pieces, base, sizeRate } = props;
  let degSum = 0;

  return (
    <div
      className={`w-1/2 h-full relative ${base === "D" ? "scale-y-[-1]" : ""}`}
      style={{ transform: `scale(${sizeRate})` }}
    >
      {pieces.map((item, idx) => {
        const nowDeg = degSum;
        degSum += item.deg;

        return (
          <Square1Sticker
            key={idx}
            piece={item}
            // rotateDeg={180}
            rotateDeg={
              item.deg === 1 ? 180 - nowDeg * 30 : 180 - (nowDeg - 1) * 30
            }
            colorReverse={base !== item.base}
          />
        );
      })}
    </div>
  );
}

export default Square1Face;
