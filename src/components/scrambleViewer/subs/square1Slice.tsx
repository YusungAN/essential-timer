import { CubeColorSticker } from "../../../util/cubeColor";

function Square1Slice(props: { isSliced: boolean, sizeRate: number }) {
  const { isSliced, sizeRate } = props;
  return (
    <div className="absolute top-[250px] left-[60px] flex" style={{ transform: `scale(${sizeRate})` }}>
      <div
        className="w-[38px] h-[15px] rounded-sm"
        style={{ backgroundColor: CubeColorSticker.getSq1Color("F") }}
      ></div>
      <div
        className={`${isSliced ? "w-[38px]" : "w-[76px]"} h-[15px] rounded-sm`}
        style={{
          backgroundColor: isSliced
            ? CubeColorSticker.getSq1Color("B")
            : CubeColorSticker.getSq1Color("F"),
        }}
      ></div>
    </div>
  );
}

export default Square1Slice;
