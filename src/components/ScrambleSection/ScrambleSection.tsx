import ScrambleViewer from "../scrambleViewer/scrambleViewer";
import { LARGE_CUBES, CubeType } from "../../constants/cubeTypes";

interface ScrambleSectionProps {
  scramble: string;
  nowCubeType: CubeType;
  isScrambleLoading: boolean;
}

const ScrambleSection = ({
  scramble,
  nowCubeType,
  isScrambleLoading,
}: ScrambleSectionProps) => {
  const isLargeCube = LARGE_CUBES.includes(
    nowCubeType as (typeof LARGE_CUBES)[number]
  );

  return (
    <>
      <div
        className={`w-full text-center pl-[5vw] pr-[5vw] pt-[2vh] pb-[2vh] text-gray-500 ${
          isLargeCube
            ? "text-sm lg:text-2xl md:text-xl sm:text-lg"
            : "text-2xl"
        }`}
      >
        {isScrambleLoading ? "Loading..." : scramble}
      </div>
      <ScrambleViewer
        scramble={scramble}
        cubeType={nowCubeType}
        isLoading={isScrambleLoading}
      />
    </>
  );
};

export default ScrambleSection;
