import { useRef, useEffect, useState } from "react";
import RecordItem from "./subs/recordItem";
import { SolvedRecord } from "../../util/record.util";
// import { useElementMover } from "../../hooks/useElementMover";
// import { ResizingPart } from "../../hooks/useElementMover";
// import {
//   subscribeCustomEvent,
//   unsubscribeCustomEvent,
// } from "../../util/customEvent";
import { useViewersHandlingStore } from "../../store/useViewersHandleStore";
import SessionSelector from "../sessionSelector/sessionSelector";

interface RecordListProps {
  recordList: SolvedRecord[];
  deleteRecord: (target: SolvedRecord) => void;
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
    changePenalty,
    nowSession,
    sessionIDList,
    onSessionChange,
    addSession,
    deleteSession,
  } = props;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [hasScroll, setHasScroll] = useState(false);

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
  const isOpenedRecordList = useViewersHandlingStore(
    (state) => state.isOpenedRecordList
  );

  function calcAllRecordAvg() {
    let dnfCnt = 0;
    const sum = recordList
      .map((item) => {
        if (item.penalty === "+2") return item.record + 2;
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

  // function showResizecursor(resizeType: ResizingPart) {
  //   if (resizeType === ResizingPart.BOT_RIGHT) return "cursor-nwse-resize";
  //   // else if (resizeType === ResizingPart.RIGHT) return 'cursor-ew-resize'
  //   // else if (resizeType === ResizingPart.BOTTOM) return 'cursor-ns-resize'
  //   return "";
  // }

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
        className={`container w-[300px] h-[450px] bg-[#F4F4F7] rounded-md p-[15px] absolute top-[calc(100vh-500px)] left-[0] ${
          isOpenedRecordList ? "block" : "hidden"
        }`}
      >
        <SessionSelector
          nowSession={nowSession}
          sessionIDList={sessionIDList}
          onSelect={onSessionChange}
          addSession={addSession}
          deleteSession={deleteSession}
        />
        <div
          className={`absolute w-full h-[50px] ${hasScroll ? 'block' : 'hidden'} z-[1]`}
          style={{
            background:
              "linear-gradient(to bottom, rgba(244,244,247,1), rgba(244,244,247,0))",
          }}
        ></div>
        <div ref={scrollRef} onScroll={checkHasScroll} className="overflow-auto h-[95%]">
          {recordList.map((item, idx) => {
            return (
              <RecordItem
                key={item.timestamp}
                index={idx}
                record={item}
                isLast={idx === recordList.length - 1}
                allAvg={idx === recordList.length - 1 ? calcAllRecordAvg() : 0}
                lastRecords={recordList.slice(Math.max(0, idx - 11), idx + 1)}
                onDelete={() => deleteRecord(item)}
                changePenalty={(penalty: "" | "+2" | "DNF") =>
                  changePenalty(item, penalty)
                }
              />
            );
          })}
        </div>
        <div className="flex w-full rounded-md p-[10px] mb-[5px] mt-[5px] justify-between items-center">
          <div></div>
          <div className="flex w-[70%] max-w-[200px] justify-between items-center text-base min-w-[100px] text-gray-500">
            <div className="w-[33%] text-center">ao5</div>
            <div className="w-[33%] text-center">ao12</div>
            <div className="w-[33%] text-center">avg</div>
          </div>
        </div>
        {/* <div className="w-[10px] aspect-square border-b-1 border-r-1 absolute top-[calc(100%-10px)] left-[calc(100%-10px)]"></div> */}
      </div>
    </>
  );
}

export default RecordList;
