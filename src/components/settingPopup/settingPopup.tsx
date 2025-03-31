import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import Toggle from "react-toggle";
import { useLocalStorage } from "usehooks-ts";
import { ChangeEvent, MouseEvent } from "react";
import "react-toggle/style.css";

function SettingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInspectionActive, setIsInspectionAcive] = useLocalStorage(
    "isInspectionActive",
    false
  );
  const [isRecordListOpen, setIsRecordListOpen] = useLocalStorage(
    "isRecordListOpen",
    true
  );
  const [isScrambleViewOpen, setIsScrambleViewerOpen] = useLocalStorage(
    "isScrambleViewOpen",
    true
  );
  const [isBLDPartTimeActive, setIsBLDPartTimeActive] = useLocalStorage("isBLDPartTimeActive", false);

  return (
    <>
      <IoMdSettings
        className="absolute top-[10px] left-[10px] cursor-pointer"
        color="#101010"
        size={30}
        onClick={() => setIsOpen(true)}
      />
      <div
        className={`fixed z-100 top-0 left-0 w-[100dvw] h-[100dvh] bg-[rgba(0,0,0,0.4)] ${
          isOpen ? "flex" : "hidden"
        } justify-center items-center`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="w-[30vw] h-[80vh] rounded-md bg-white p-[15px] text-(--black)"
          onClick={(e: MouseEvent) => e.stopPropagation()}
        >
          <div className="text-xl font-bold mb-[20px]">도구 관리</div>
          <div className="flex justify-between">
            <div>기록 목록 열기</div>
            <div className="scale-75">
              <Toggle
                icons={false}
                defaultChecked={isRecordListOpen}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setIsRecordListOpen(e.target.checked)
                }
              />
            </div>
          </div>
          <div className="flex justify-between mb-[5px]">
            <div>스크램블 뷰어 열기</div>
            <Toggle
              className="scale-75"
              icons={false}
              defaultChecked={isScrambleViewOpen}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsScrambleViewerOpen(e.target.checked)
              }
            />
          </div>
          <div className="text-xl mt-[20px] font-bold mb-[20px]">타이머 설정</div>
          <div className="flex justify-between mb-[5px]">
            <div>15초 미리보기 켜기</div>
            <Toggle
              className="scale-75"
              icons={false}
              defaultChecked={isInspectionActive}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsInspectionAcive(e.target.checked)
              }
            />
          </div>
          <div className="flex justify-between mb-[5px]">
            <div>구간 기록 활성화(블라인드 암기 시간 측정)</div>
            <Toggle
              className="scale-75"
              icons={false}
              defaultChecked={isBLDPartTimeActive}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsBLDPartTimeActive(e.target.checked)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingPopup;
