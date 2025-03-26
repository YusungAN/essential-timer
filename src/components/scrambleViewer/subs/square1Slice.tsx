import { CubeColorSticker } from "../../../util/cubeColor";

function Square1Slice(props: { isSliced: boolean }) {
  const {isSliced} = props;
  return (
    <div className="absolute top-[250px] left-[60px] flex">
      <div
        className="w-[38px] h-[15px] rounded-sm"
        style={{ backgroundColor: CubeColorSticker.getSq1Color("F") }}
      ></div>
      <div
        className={`${isSliced ? 'w-[38px]' : 'w-[76px]'} h-[15px] rounded-sm`}
        style={{ backgroundColor: CubeColorSticker.getSq1Color("B") }}
      ></div>
    </div>
  );
}

export default Square1Slice;