import { useState, useMemo, useEffect, MouseEvent } from "react";
import { nanoid } from "nanoid";
import { FaAngleDown } from "react-icons/fa";
import CubeItem from "./subs/cubeListItem";
import { ScrambleType } from "../../hooks/useScramble";

interface CubeSelectorProps {
  nowCubeType: ScrambleType;
  cubeList: ScrambleType[];
  onSelect: (newCubeType: ScrambleType) => void;
}

function CubeSelector(props: CubeSelectorProps) {
  const { nowCubeType, cubeList, onSelect } = props;

  const [isOpen, setIsOpen] = useState(false);
  const listKeys = useMemo(() => cubeList.map(() => nanoid()), [cubeList]);

  function handleChangeType(newCubeType: ScrambleType) {
    onSelect(newCubeType);
    setIsOpen(false);
  }

  function handleDropdownOpen(e: MouseEvent) {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsOpen(false);
    });
  }, []);

  return (
    <>
      <div
        className="bg-[#CFCFD8] w-[120px] rounded-md mt-[10vh] pb-[5px] pt-[5px] pl-[10px] pr-[10px] flex justify-between items-center cursor-pointer"
        onClick={handleDropdownOpen}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {nowCubeType}
        <FaAngleDown />
      </div>
      {isOpen ? (
        <>
          <div className="absolute top-[10vh] bg-[#E5E5EB] shadow-sm rounded-md w-[120px] cursor-pointer">
            {cubeList.map((item, idx) => {
              return (
                <CubeItem
                  key={listKeys[idx]}
                  cubeType={item}
                  onCubeChange={handleChangeType}
                />
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CubeSelector;
