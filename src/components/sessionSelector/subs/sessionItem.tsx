import { MdDelete } from "react-icons/md";
import { MouseEvent } from "react";

interface SessionItemProps {
  sessionName: string;
  onSessionChange: (sessionID: string) => void;
  onDelete: (targetID: string) => void;
}

function SessionItem(props: SessionItemProps) {
    // console.log('rendered');
  const { sessionName, onSessionChange, onDelete } = props;

  function handleDelete(e: MouseEvent) {
    e.stopPropagation();
    onDelete(sessionName);
  }

  return (
    <div
      className="group w-full pb-[5px] pt-[5px] pl-[10px] pr-[10px] hover:bg-[#CFCFD8] flex justify-between items-center cursor-pointer"
      onClick={() => onSessionChange(sessionName)}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {sessionName}
      <MdDelete className="hidden group-hover:block text-[#ADADBA]" onClick={handleDelete} />
    </div>
  );
}

export default SessionItem;
