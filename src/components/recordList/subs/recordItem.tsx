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
  allRecords: SolvedRecord[];
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
    allRecords,
    onDelete,
    changePenalty,
  } = props;
  const [isModifableMode, setIsModifiable] = useState(false);

  const ao5 = useMemo(() => {
    return calculateAvg5(lastRecords.slice(-5));
  }, [index, lastRecords, record.penalty]);
  const ao12 = useMemo(() => {
    return calculateAvg12(lastRecords);
  }, [index, lastRecords, record.penalty]);

  const openPopUp = usePopupStore((state) => state.openPopUp);
  const openRecordShareTap = usePopupStore(
    (state) => state.openRecordSharePopUp
  );

  function time2Str(time: number, dismissPenalty: boolean) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    return `${minutes > 0 ? minutes : ""}${minutes > 0 ? ":" : ""}${
      minutes > 0 ? String(seconds).padStart(2, "0") : seconds
    }.${String(milliseconds).padStart(3, "0")}${
      !dismissPenalty && record.penalty === "+2" ? "+" : ""
    }`;
  }

  function calculateAvg5(recordList: SolvedRecord[]) {
    // 이 함수를 상위 컴포넌트로 옮길까
    if (recordList.length !== 5) return 0;
    const tempArr = recordList
      .slice()
      .map((item) =>
        item.penalty === "+2"
          ? item.record + 2000
          : item.penalty === "DNF"
          ? Infinity
          : item.record
      );

    tempArr.sort((a, b) => a - b);
    // console.log(index, recordList, tempArr);

    const result = (tempArr[1] + tempArr[2] + tempArr[3]) / 3;

    return result === Infinity ? "DNF" : result;
  }

  function calculateAvg12(recordList: SolvedRecord[]) {
    // statViewer에 있는게 틀림. 여기가 맞음
    if (recordList.length !== 12) return 0;
    const tempArr = recordList
      .slice()
      .map((item) =>
        item.penalty === "+2"
          ? item.record + 2000
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

  function handleOpenRecordShareTap(
    avg: number | "DNF",
    recordList: SolvedRecord[]
  ) {
    if (avg === 0) return;
    openRecordShareTap(avg === "DNF" ? "DNF" : time2Str(avg, true), recordList);
  }

  return (
    <div className="flex w-full rounded-md p-[5px] mb-[3px] mt-[3px] justify-between items-center">
      <div className="flex items-center">
        <div className="text-gray-400 mr-[5px] text-sm">{index + 1}</div>
        <abbr
          title={!isModifableMode ? "기록에 패널티 추가하기" : "평균 보기"}
          className={`text-lg ${
            isLast ? "text-(--black)" : "text-gray-500"
          } cursor-pointer no-underline`}
          onClick={() => setIsModifiable(!isModifableMode)}
        >
          {record.penalty === "DNF"
            ? "DNF"
            : time2Str(
                record.penalty === "+2" ? record.record + 2000 : record.record,
                false
              )}
        </abbr>
      </div>
      {!isModifableMode ? (
        <div
          className={`flex w-[70%] max-w-[200px] justify-between items-center text-base min-w-[100px] ${
            isLast ? "text-(--black)" : "text-gray-500"
          }`}
        >
          <abbr
            title="기록 공유하기"
            className="w-[33%] text-center cursor-pointer no-underline"
            onClick={() => handleOpenRecordShareTap(ao5, lastRecords.slice(-5))}
          >
            {ao5 !== 0 ? (ao5 !== "DNF" ? time2Str(ao5, true) : "DNF") : "-"}
          </abbr>
          <abbr
            title="기록 공유하기"
            className="w-[33%] text-center cursor-pointer no-underline"
            onClick={() => handleOpenRecordShareTap(ao5, lastRecords)}
          >
            {ao12 !== 0 ? (ao12 !== "DNF" ? time2Str(ao12, true) : "DNF") : "-"}
          </abbr>
          <abbr
            title="기록 공유하기"
            className="w-[33%] text-center cursor-pointer no-underline"
            onClick={() => handleOpenRecordShareTap(allAvg, allRecords)}
          >
            {allAvg !== 0
              ? allAvg !== "DNF"
                ? time2Str(allAvg, true)
                : "DNF"
              : ""}
          </abbr>
        </div>
      ) : (
        <div className="flex w-[30%] max-w-[100px] justify-between items-center text-sm min-w-[100px] cursor-pointer">
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
