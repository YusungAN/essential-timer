import { useRef, useEffect } from "react";
import RecordItem from "./subs/recordItem";
import { SolvedRecord } from "../../util/record.util";
import { useElementMover } from "../../hooks/useElementMover";
import { ResizingPart } from "../../hooks/useElementMover";
import {
  subscribeCustomEvent,
  unsubscribeCustomEvent,
} from "../../util/customEvent";
import { useViewersHandlingStore } from "../../store/useViewersHandleStore";

interface RecordListProps {
  recordList: SolvedRecord[];
  deleteRecord: (target: SolvedRecord) => void;
  changePenalty: (target: SolvedRecord, penalty: "" | "+2" | "DNF") => void;
}

function RecordList(props: RecordListProps) {
  const { recordList, deleteRecord, changePenalty } = props;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    isCliking,
    isResizing,
    isReSizable,
    elementPos,
    elementSize,
    initMove,
    moveElement,
    endMove,
    resetSizeandPos,
  } = useElementMover(
    { x: 50, y: window.innerHeight / 2 - 250 },
    { width: 300, height: 500 },
    "record-list"
  );
  const isOpenedRecordList = useViewersHandlingStore(
    (state) => state.isOpenedRecordList
  );

  function showResizecursor(resizeType: ResizingPart) {
    if (resizeType === ResizingPart.BOT_RIGHT) return "cursor-nwse-resize";
    // else if (resizeType === ResizingPart.RIGHT) return 'cursor-ew-resize'
    // else if (resizeType === ResizingPart.BOTTOM) return 'cursor-ns-resize'
    return "";
  }

  useEffect(() => {
    if (scrollRef.current instanceof HTMLDivElement) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [recordList.length]);

  useEffect(() => {
    subscribeCustomEvent("reset-display", resetSizeandPos);
    return () => unsubscribeCustomEvent("reset-display", resetSizeandPos);
  }, []);

  return (
    <>
      <div
        style={{
          top: `${elementPos.y}px`,
          left: `${elementPos.x}px`,
          width: `${elementSize.width}px`,
          height: `${elementSize.height}px`,
        }}
        className={`absolute container min-w-[220px] bg-[#F4F4F7] rounded-md p-[15px] ${
          isCliking || isResizing ? "opacity-75" : "opacity-100"
        } ${showResizecursor(isReSizable)} ${
          isOpenedRecordList ? "block" : "hidden"
        }`}
        onMouseDown={initMove}
        onMouseMove={moveElement}
        onMouseUp={endMove}
        onMouseLeave={endMove}
      >
        <div ref={scrollRef} className="overflow-auto h-full">
          {recordList.map((item, idx) => {
            return (
              <RecordItem
                key={item.timestamp}
                index={idx}
                record={item}
                onDelete={() => deleteRecord(item)}
                changePenalty={(penalty: "" | "+2" | "DNF") =>
                  changePenalty(item, penalty)
                }
              />
            );
          })}
        </div>
        <div className="w-[10px] aspect-square border-b-1 border-r-1 absolute top-[calc(100%-10px)] left-[calc(100%-10px)]"></div>
      </div>
    </>
  );
}

export default RecordList;
