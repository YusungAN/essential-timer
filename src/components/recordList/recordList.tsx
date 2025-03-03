import { useRef, useEffect } from "react";
import RecordItem from "./subs/recordItem";
import { SolvedRecord } from "../../util/record.util";

interface RecordListProps {
    recordList: SolvedRecord[];
    deleteRecord: (target: SolvedRecord) => void;
    changePenalty: (target: SolvedRecord, penalty: '' | '+2' | 'DNF') => void;
}

function RecordList(props: RecordListProps) {
    const {recordList, deleteRecord, changePenalty} = props;
    const scrollRef = useRef<HTMLDivElement | null>(null);
    

    useEffect(() => {
        if (scrollRef.current instanceof HTMLDivElement) {
            scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
        }
    }, [recordList.length]);

    return (
        <>
            <div ref={scrollRef} className="container w-[30vw] h-[30vh] bg-[#F4F4F7] rounded-md p-[15px] overflow-auto">
                {
                    recordList.map((item, idx) => {
                        return <RecordItem key={item.timestamp} index={idx} record={item} onDelete={() => deleteRecord(item)} changePenalty={(penalty: '' | '+2' | 'DNF') => changePenalty(item, penalty)} />
                    })
                }
            </div>
        </>
    )
}

export default RecordList;
