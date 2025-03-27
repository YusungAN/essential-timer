import { FaDeleteLeft } from "react-icons/fa6";
import { SolvedRecord } from "../../../util/record.util";
import { MouseEvent, useMemo, useState } from "react";
import { usePopupStore } from "../../../store/usePopupStore";

interface RecordItemProps {
  index: number;
  record: SolvedRecord;
  lastRecords: SolvedRecord[];
  isLast: Boolean;
  allAvg: number | "DNF";
  onDelete: () => void;
  changePenalty: (penalty: "" | "+2" | "DNF") => void;
}

function RecordItem(props: RecordItemProps) {
  // rerender 체크
  const {
    index,
    record,
    lastRecords,
    isLast,
    allAvg,
    onDelete,
    changePenalty,
  } = props;
  const [isModifableMode, setIsModifiable] = useState(false);

  const ao5 = useMemo(() => {
    return calculateAvg5(lastRecords.slice(-5));
  }, [index, record.record]);
  const ao12 = useMemo(() => {
    return calculateAvg12(lastRecords);
  }, [index, record.record]);

  const openPopUp = usePopupStore((state) => state.openPopUp);

  function time2Str(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    return `${minutes > 0 ? minutes : ""}${minutes > 0 ? ":" : ""}${
      minutes > 0 ? String(seconds).padStart(2, "0") : seconds
    }.${String(milliseconds).padStart(3, "0")}${
      record.penalty === "+2" ? "+" : ""
    }`;
  }

  function calculateAvg5(recordList: SolvedRecord[]) {
    // 이 함수를 상위 컴포넌트로 옮길까
    console.log("fuck");
    if (recordList.length !== 5) return 0;
    const tempArr = recordList
      .slice()
      .map((item) =>
        item.penalty === "+2"
          ? item.record + 2
          : item.penalty === "DNF"
          ? Infinity
          : item.record
      );
    tempArr.sort((a, b) => a - b);

    const result = (tempArr[1] + tempArr[2] + tempArr[3]) / 3;

    return result === Infinity ? "DNF" : result;
  }

  function calculateAvg12(recordList: SolvedRecord[]) { // statViewer에 있는게 틀림. 여기가 맞음
    if (recordList.length !== 12) return 0;
    const tempArr = recordList
      .slice()
      .map((item) =>
        item.penalty === "+2"
          ? item.record + 2
          : item.penalty === "DNF"
          ? Infinity
          : item.record
      );
    tempArr.sort((a, b) => a - b);

    const result = tempArr.slice(1, 11).reduce((acc, cur) => acc + cur) / 10;

    return result === Infinity ? "DNF" : result;
  }

  function handleChangePenalty(
    e: MouseEvent<HTMLDivElement>,
    penaltyType: "+2" | "DNF"
  ) {
    e.stopPropagation();
    changePenalty(penaltyType);
  }

  function deleteRecord() {
    openPopUp({
      description: "정말 기록을 삭제하시겠습니까?",
      popupType: "confirm",
      yesButtonText: "Delete",
      noButtonText: "Cancel",
      actionOnYes: onDelete,
    });
  }

  return (
    <div className="flex w-full rounded-md p-[5px] mb-[3px] mt-[3px] justify-between items-center">
      <div className="flex items-center">
        <div className="text-gray-400 mr-[5px] text-sm">{index + 1}</div>
        <div
          className={`text-lg ${isLast ? "text-(--black)" : "text-gray-500"}`}
          onClick={() => setIsModifiable(!isModifableMode)}
        >
          {record.penalty === "DNF"
            ? "DNF"
            : time2Str(
                record.penalty === "+2" ? record.record + 2000 : record.record
              )}
        </div>
      </div>
      {!isModifableMode ? (
        <div
          className={`flex w-[70%] max-w-[200px] justify-between items-center text-base min-w-[100px] ${
            isLast ? "text-(--black)" : "text-gray-500"
          }`}
        >
          <div className="w-[33%] text-center">
            {ao5 !== 0 ? (ao5 !== "DNF" ? time2Str(ao5) : "DNF") : ""}
          </div>
          <div className="w-[33%] text-center">
            {ao12 !== 0 ? (ao12 !== "DNF" ? time2Str(ao12) : "DNF") : ""}
          </div>
          <div className="w-[33%] text-center">
            {allAvg !== 0 ? (allAvg !== "DNF" ? time2Str(allAvg) : "DNF") : ""}
          </div>
        </div>
      ) : (
        <div className="flex w-[30%] max-w-[100px] justify-between items-center text-sm min-w-[100px]">
          <div
            onClick={(e) => handleChangePenalty(e, "+2")}
            onMouseDown={(e) => e.stopPropagation()}
          >
            +2
          </div>
          <div
            onClick={(e) => handleChangePenalty(e, "DNF")}
            onMouseDown={(e) => e.stopPropagation()}
          >
            DNF
          </div>
          <FaDeleteLeft
            className="w-4 h-4"
            onClick={deleteRecord}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
export default RecordItem;
