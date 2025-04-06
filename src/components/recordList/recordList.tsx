import { useRef, useEffect, useState } from "react";
import RecordItem from "./subs/recordItem";
import { SolvedRecord } from "../../util/record.util";
import { useLocalStorage } from "usehooks-ts";
// import { useElementMover } from "../../hooks/useElementMover";
// import { ResizingPart } from "../../hooks/useElementMover";
// import {
//   subscribeCustomEvent,
//   unsubscribeCustomEvent,
// } from "../../util/customEvent";
import SessionSelector from "../sessionSelector/sessionSelector";
import Button from "../popup/subs/button";
import { usePopupStore } from "../../store/usePopupStore";
import { useHotKey } from "../../hooks/useHotKey";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface RecordListProps {
  recordList: SolvedRecord[];
  deleteRecord: (target: SolvedRecord) => void;
  deleteAllRecords: (targetSession: string) => void;
  changePenalty: (target: SolvedRecord, penalty: "" | "+2" | "DNF") => void;
  nowSession: string;
  sessionIDList: string[];
  onSessionChange: (sessionID: string) => void;
  addSession: (newSessionID: string) => void;
  deleteSession: (targetID: string) => void;
}

function RecordList(props: RecordListProps) {
  const {
    recordList,
    deleteRecord,
    deleteAllRecords,
    changePenalty,
    nowSession,
    sessionIDList,
    onSessionChange,
    addSession,
    deleteSession,
  } = props;

  const [isRecordListOpen, setIsRecordListOpen] = useLocalStorage(
    "isRecordListOpen",
    true
  );
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [hasScroll, setHasScroll] = useState(false);
  const openPopUp = usePopupStore((state) => state.openPopUp);
  useHotKey("Alt", ["∂", "d"], openDeleteAllPopUp);

  // const {
  //   isCliking,
  //   isResizing,
  //   isReSizable,
  //   elementPos,
  //   elementSize,
  //   initMove,
  //   moveElement,
  //   endMove,
  //   resetSizeandPos,
  // } = useElementMover(
  //   { x: 50, y: window.innerHeight / 2 - 250 },
  //   { width: 300, height: 500 },
  //   "record-list"
  // );

  // const isOpenedRecordList = useViewersHandlingStore(
  //   (state) => state.isOpenedRecordList
  // );

  function calcAllRecordAvg() {
    let dnfCnt = 0;
    const sum = recordList
      .map((item) => {
        if (item.penalty === "+2") return item.record + 2000;
        else if (item.penalty === "DNF") {
          dnfCnt += 1;
          return 0;
        } else return item.record;
      })
      .reduce((acc, cur) => acc + cur);

    return recordList.length - dnfCnt > 0
      ? sum / (recordList.length - dnfCnt)
      : "DNF";
  }

  function checkHasScroll() {
    if (scrollRef.current) {
      setHasScroll(scrollRef.current.scrollTop !== 0);
    }
  }

  function openDeleteAllPopUp() {
    openPopUp({
      description: "정말 세션의 모든 기록을 삭제하시겠습니까?",
      popupType: "confirm",
      yesButtonText: "Yes",
      noButtonText: "No",
      actionOnYes: () => deleteAllRecords(nowSession),
    });
  }

  // function showResizecursor(resizeType: ResizingPart) {
  //   if (resizeType === ResizingPart.BOT_RIGHT) return "cursor-nwse-resize";
  //   // else if (resizeType === ResizingPart.RIGHT) return 'cursor-ew-resize'
  //   // else if (resizeType === ResizingPart.BOTTOM) return 'cursor-ns-resize'
  //   return "";
  // }

  function toggleRecordList() {
    setIsRecordListOpen(!isRecordListOpen);
  }

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current instanceof HTMLDivElement) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [recordList.length]);

  // useEffect(() => {
  //   subscribeCustomEvent("reset-display", resetSizeandPos);
  //   return () => unsubscribeCustomEvent("reset-display", resetSizeandPos);
  // }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      {/* <div
        className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F4F4F7] p-3 flex justify-center items-center z-10 border-t border-gray-300"
        onClick={toggleRecordList}
      >
        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium">기록 리스트</span>
          {isRecordListOpen ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div> */}

      <div
        // style={{
        //   top: `${elementPos.y}px`,
        //   left: `${elementPos.x}px`,
        //   width: `${elementSize.width}px`,
        //   height: `${elementSize.height}px`,
        // }}
        // className={`absolute container min-w-[220px] bg-[#F4F4F7] rounded-md p-[15px] ${
        //   isCliking || isResizing ? "opacity-75" : "opacity-100"
        // } ${showResizecursor(isReSizable)} ${
        //   isOpenedRecordList ? "block" : "hidden"
        // }`}
        // onMouseDown={initMove}
        // onMouseMove={moveElement}
        // onMouseUp={endMove}
        // onMouseLeave={endMove}
        className={`container bg-[#F4F4F7] rounded-md p-[15px] ${
          isMobile
            ? `fixed w-full h-[60vh] bottom-[50px] left-0 right-0 z-20 transition-transform duration-300 ${
                isRecordListOpen
                  ? "translate-y-0"
                  : "translate-y-full bottom-[-60vh]"
              }`
            : "absolute w-[300px] h-[450px] top-[calc(100vh-500px)] left-[0]"
        }`}
      >
        <div className="w-full md:hidden bg-[#F4F4F7] mb-3 flex justify-center items-center" onClick={toggleRecordList}>
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">기록 목록</span>
            {isRecordListOpen ? <FaChevronDown /> : <FaChevronUp />}
          </div>
        </div>
        <SessionSelector
          nowSession={nowSession}
          sessionIDList={sessionIDList}
          onSelect={onSessionChange}
          addSession={addSession}
          deleteSession={deleteSession}
        />
        <div
          className={`absolute w-full h-[50px] ${
            hasScroll ? "block" : "hidden"
          } z-[1]`}
          style={{
            background:
              "linear-gradient(to bottom, rgba(244,244,247,1), rgba(244,244,247,0))",
          }}
        ></div>
        <div
          ref={scrollRef}
          onScroll={checkHasScroll}
          className="overflow-auto h-[calc(60vh-85px)] md:h-[95%]"
        >
          {recordList.map((item, idx) => {
            return (
              <RecordItem
                key={item.timestamp}
                index={idx}
                record={item}
                isLast={idx === recordList.length - 1}
                allAvg={idx === recordList.length - 1 ? calcAllRecordAvg() : 0}
                allRecords={idx === recordList.length - 1 ? recordList : []}
                lastRecords={recordList.slice(Math.max(0, idx - 11), idx + 1)}
                onDelete={() => deleteRecord(item)}
                changePenalty={(penalty: "" | "+2" | "DNF") =>
                  changePenalty(item, penalty)
                }
              />
            );
          })}
        </div>
        <div className="flex bg-[#F4F4F7] w-full rounded-md p-[10px] mb-[5px] justify-between items-center">
          <div></div>
          <Button
            width="33%"
            height="30px"
            text="전체 삭제"
            fontSize="13px"
            onClick={openDeleteAllPopUp}
          />
          <div className="flex w-[70%] max-w-[200px] justify-between items-center text-base min-w-[100px] text-gray-500">
            <div className="w-[33%] text-center">ao5</div>
            <div className="w-[33%] text-center">ao12</div>
            <div className="w-[33%] text-center">avg</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordList;
