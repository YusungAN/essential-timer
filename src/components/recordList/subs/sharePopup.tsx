import { SolvedRecord } from "../../../util/record.util";
import { useEffect, useState, MouseEvent, useRef } from "react";
import { time2Str } from "../../../util/record.util";
import { usePopupStore } from "../../../store/usePopupStore";
import Button from "../../popup/subs/button";
import { encodeCubeSequence } from "../../../util/encodeScramble";

function SharePopup() {
  // const { avg, recordList } = props;
  const [avg, setAvg] = useState("");
  const [recordList, setRecordList] = useState<SolvedRecord[]>([]);
  const [recordsText, setRecordText] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const isOpen = usePopupStore((state) => state.isShareTabOpen);
  const close = usePopupStore((state) => state.closeRecordSharePopUp);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  function initDataForOpenPopUp(
    e: CustomEvent<{ avg: string; recordList: SolvedRecord[] }>
  ) {
    setAvg(e.detail.avg);
    setRecordList(e.detail.recordList);
  }

  useEffect(() => {
    window.addEventListener("share-record", initDataForOpenPopUp);
    return () =>
      window.removeEventListener("share-record", initDataForOpenPopUp);
  }, []);

  useEffect(() => {
    const now = new Date();
    const basicInfoList = [
      `Generated on ${now.getFullYear()}. ${
        now.getMonth() + 1
      }. ${now.getDate()}.`,
      avg !== "0"
        ? `Average of ${recordList.length}: ${avg}\n`
        : `Single: ${time2Str(recordList[0].record)}\n`,
    ];
    const recordTextList = recordList.map((item, idx) => {
      // console.log(item.part_record);
      return `${idx + 1}. ${time2Str(item.record)}${
        item.part_record !== undefined && item.part_record !== 0
          ? " (" +
            time2Str(item.part_record) +
            "+" +
            time2Str(item.record - item.part_record) +
            ")"
          : ""
      }: ${item.scramble}`;
    });

    const recordInfoList = basicInfoList.concat(recordTextList);

    setRecordText(recordInfoList.join("\n"));
  }, [avg, recordList]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
    }
  }, [recordsText]);

  return (
    <>
      <div
        className={`fixed z-100 top-0 left-0 w-[100dvw] h-[100dvh] bg-[rgba(0,0,0,0.4)] ${
          isOpen ? "flex" : "hidden"
        } justify-center items-center`}
        onClick={close}
      >
        <div
          className="w-[60vw] rounded-md bg-white p-[15px] text-(--black) flex flex-col items-end"
          onClick={(e: MouseEvent) => e.stopPropagation()}
        >
          <textarea
            className="w-full h-[60vh] bg-gray-200 rounded-md p-[10px]"
            readOnly
            value={recordsText}
            ref={textAreaRef}
          />
          <div className="h-[15px]"></div>
          <div className="flex justify-end w-full">
            <Button
              width={"27%"}
              height={"40px"}
              text={"솔루션 공유하기(3x3x3 only)"}
              color={"#64646F"}
              onClick={() =>
                window.open(
                  `https://3d-cube-simulator.vercel.app/?setup=${encodeCubeSequence(
                    recordList[0].scramble
                  )}`,
                  "_blank"
                )
              }
            />
            <div className="w-[10px]"></div>
            <Button
              width={"20%"}
              height={"40px"}
              text={"클립보드에 복사"}
              color={"#64646F"}
              onClick={() => navigator.clipboard.writeText(recordsText)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SharePopup;
