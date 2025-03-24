import CubeSticker from "./cubeSticker";

function CubeFace(props: {
  faceColors: ("U" | "D" | "F" | "B" | "L" | "R")[][];
}) {
  const { faceColors } = props;
  const n = faceColors[0].length;
  const flatFace = faceColors.flat();

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${n}, minmax(0, 1fr))`,
        gap: `calc(var(--spacing) * ${n < 5 ? 1 : 0.5})`,
      }}
      className={`w-full aspect-square grid xl:gap-1 lg:gap-1 md:gap-0.5`}
    >
      {flatFace.map((item, idx) => (
        <CubeSticker color={item} key={idx} />
      ))}
    </div>
  );
}

export default CubeFace;
