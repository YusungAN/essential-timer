import { FaDeleteLeft } from "react-icons/fa6";
import { SolvedRecord } from "../../../util/record.util";
import { MouseEvent } from "react";


interface RecordItemProps {
    index: number;
    record: SolvedRecord;
    onDelete: () => void;
    changePenalty: (penalty: '' | '+2' | 'DNF') => void;
}

function RecordItem(props: RecordItemProps) {
    const {record, onDelete, changePenalty} = props;

    function time2Str(time: number) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000));

        return `${minutes > 0 ? minutes : ''}${minutes > 0 ? ':' : ''}${minutes > 0 ? String(seconds).padStart(2, '0'): seconds}.${String(milliseconds).padStart(3, '0')}${record.penalty === '+2' ? '+' : ''}`;
    }

    function handleChangePenalty(e: MouseEvent<HTMLDivElement>, penaltyType: '+2' | 'DNF') {
        e.stopPropagation();
        changePenalty(penaltyType);
    }

    return <div className="flex w-full bg-[#E5E5EB] rounded-md p-[10px] mb-[5px] mt-[5px] justify-between items-center">
        <div className="flex">
            {/* <div className="text-gray-400 mr-[5px]">{index+1}.</div> */}
            <div>{record.penalty === 'DNF' ? 'DNF' : time2Str(record.penalty === '+2' ? record.record + 2000 : record.record)}</div>
        </div>
        <div className="flex w-[30%] max-w-[100px] justify-between items-center text-sm min-w-[100px]">
            <div onClick={e => handleChangePenalty(e, '+2')} onMouseDown={(e) => e.stopPropagation()}>+2</div>
            <div onClick={e => handleChangePenalty(e, 'DNF')} onMouseDown={(e) => e.stopPropagation()}>DNF</div>
            <FaDeleteLeft className="w-4 h-4" onClick={onDelete} />
        </div>
    </div>
}
export default RecordItem;
