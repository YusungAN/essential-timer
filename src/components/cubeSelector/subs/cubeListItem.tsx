import { ScrambleType } from "../../../hooks/useScramble";

interface CubeItemProps {
  cubeType: ScrambleType;
  onCubeChange: (newCubeType: ScrambleType) => void;
}

function CubeItem(props: CubeItemProps) {
  // console.log('rendered');
  const { cubeType, onCubeChange } = props;

  return (
    <div
      className="group w-full pb-[5px] pt-[5px] pl-[10px] pr-[10px] hover:bg-[#CFCFD8] flex justify-between items-center"
      onClick={() => onCubeChange(cubeType)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {cubeType}
    </div>
  );
}

export default CubeItem;
