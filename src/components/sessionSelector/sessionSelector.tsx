import { useState, useMemo } from "react";
import { nanoid } from "nanoid";
import { FaAngleDown } from "react-icons/fa";
import SessionItem from "./subs/sessionItem";
import { usePopupStore } from "../../store/usePopupStore";

interface SessionSelectorProps {
  nowSession: string;
  sessionIDList: string[];
  onSelect: (sessionID: string) => void;
  addSession: (newSessionID: string) => void;
  deleteSession: (targetID: string) => void;
}

function SessionSelector(props: SessionSelectorProps) {
  const { nowSession, sessionIDList, onSelect, addSession, deleteSession } =
    props;

  const openPopUp = usePopupStore((state) => state.openPopUp);
  const [isOoen, setIsOpen] = useState(false);
  const sessionKeys = useMemo(
    () => sessionIDList.map(() => nanoid()),
    [sessionIDList]
  );

  function handleAddSession() {
    openPopUp({
      description: "새로운 세션의 이름을 적어주세요.",
      popupType: "prompt",
      yesButtonText: "Create",
      actionOnYes: (prompt: string) => {
        addSession(prompt);
      },
    });
  }

  function handleChangeSession(newSessionID: string) {
    onSelect(newSessionID);
    setIsOpen(false);
  }

  function handleDeleteSession(targetID: string) {
    openPopUp({
      description:
        "정말 세션을 삭제하시겠습니끼? 삭제된 기록은 복구할 수 없습니다.",
      popupType: "confirm",
      yesButtonText: "Delete",
      noButtonText: "Cancel",
      actionOnYes: () => deleteSession(targetID),
    });
  }

  return (
    <>
      <div
        className="bg-[#CFCFD8] rounded-md pb-[5px] pt-[5px] pl-[10px] pr-[10px] flex justify-between items-center"
        onClick={() => setIsOpen(!isOoen)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {nowSession}
        <FaAngleDown />
      </div>
      {isOoen ? (
        <>
          <div className="absolute bg-[#E5E5EB] shadow-sm rounded-md w-[calc(100%-30px)]">
            {sessionIDList.map((item, idx) => {
              return (
                <SessionItem
                  key={sessionKeys[idx]}
                  sessionName={item}
                  onSessionChange={handleChangeSession}
                  onDelete={handleDeleteSession}
                />
              );
            })}
            <div
              className="w-full pb-[5px] pt-[5px] pl-[10px] pr-[10px] hover:bg-[#CFCFD8]"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={handleAddSession}
            >
              Add new Session
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SessionSelector;
