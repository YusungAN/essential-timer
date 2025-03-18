import CubeSticker from "./cubeSticker";

function CubeFace(props: {
  faceColors: ("U" | "D" | "F" | "B" | "L" | "R")[];
}) {
  const { faceColors } = props;

  return (
    <div className="w-full aspect-square grid grid-rows-3 grid-cols-3 xl:gap-1 lg:gap-1 md:gap-0.5">
      {faceColors.map((item, idx) => (
        <CubeSticker color={item} key={idx} />
      ))}
    </div>
  );
}

export default CubeFace;
