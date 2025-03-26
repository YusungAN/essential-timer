import { SquarePiece } from "../genSquare1ScrambleState";
import "../css/square.css";
import { CubeColorSticker } from "../../../util/cubeColor";

function Square1Sticker(props: { piece: SquarePiece; rotateDeg: number, colorReverse: Boolean }) {
  const { piece, rotateDeg, colorReverse } = props;

  return (
    <div
      style={{
        transform: `rotate(${rotateDeg}deg)`,
        transformOrigin: piece.deg === 2 ? "100% 100%" : "bottom",
      }}
      className={`absolute top-[100px] ${piece.deg === 1 ? 'left-[100px]' : 'left-[51px]'}`}
    >
      <div
        style={{
          backgroundColor: CubeColorSticker.getSq1Color(piece.deg === 2 && colorReverse ? piece.sideColor[1] : piece.sideColor[0]),
        }}
        className={`h-[7px] mb-[2px] rounded-sm ${
          piece.deg === 2 ? "w-[35px] ml-[8px]" : "w-[21.132px]"
        }`}
      ></div>
      <div className="flex">
        {piece.deg === 2 ? (
          <div
            style={{
              backgroundColor: CubeColorSticker.getSq1Color(colorReverse ? piece.sideColor[0] : piece.sideColor[1]),
            }}
            className={`w-[7px] mr-[2px] mb-[2px] rounded-sm ${
              piece.deg === 2 ? "h-[35px]" : "h-[21.132px]"
            }`}
          ></div>
        ) : (
          <></>
        )}
        <div
          style={{ backgroundColor: CubeColorSticker.getSq1Color(piece.base) }}
          className={`h-[50px] ${
            piece.deg === 2
              ? "w-[50px] deg60-shape"
              : "w-[21.132px] deg30-shape"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default Square1Sticker;
