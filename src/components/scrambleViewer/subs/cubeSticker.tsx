import { CubeColorSticker } from "../../../util/cubeColor";

function CubeSticker(props: { color: "U" | "D" | "F" | "B" | "L" | "R" }) {
  const { color } = props;

  return (
    <div
      className={`w-full aspect-square rounded-[20%]`}
      style={{ backgroundColor: CubeColorSticker.getColor(color) }}
    ></div>
  );
}

export default CubeSticker;
