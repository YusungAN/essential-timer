import { useEffect, useRef, useState } from "react";
import { useScramble } from "./hooks/useScramble";
import { useTimer } from "./hooks/useTimer";
import { useRecords } from "./hooks/useRecords";
import RecordList from "./components/recordList/recordList";
import StatsViewer from "./components/statsViewer/StatsViewer";
import ScrambleViewer from "./components/scrambleViewer/scrambleViewer";

function App() {
    const lastStopTimeRef = useRef(0);

    const {scramble, setNewScramble} = useScramble();
    const {timeStr, record, startTimer, stopTiemr, isRunning} = useTimer();
    const {recordList, addRecord, deleteRecord, changePenalty} = useRecords();

    const [isSpaceDowned, setIsSpaceDowned] = useState(false);


    function handleStartTimer(e: KeyboardEvent) {
        if (e.key === ' ') {
            setIsSpaceDowned(false);
            if (performance.now() - lastStopTimeRef.current >= 300) startTimer();
        }
    }

    function handleStopTimer(e: KeyboardEvent) {
        if (e.key === ' ') {
            setIsSpaceDowned(true);
            stopTiemr();
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleStartTimer, false);
        document.addEventListener('keydown', handleStopTimer, false);
    }, []);

    useEffect(() => {
        lastStopTimeRef.current = performance.now();
        if (!isRunning) {
            if (record !== 0) addRecord(scramble, record, '');
            setNewScramble('3x3x3');
        }
    }, [isRunning]);

    return (
        <>
            <div className="flex flex-col w-full items-center">
                <div className='w-full text-center pl-[5vw] pr-[5vw] pt-[2vh] pb-[2vh] text-3xl'>{scramble}</div>
                <div className={`w-full text-center pt-[20vh] pb-[5vh] text-9xl tabular-nums ${isSpaceDowned ? 'text-[#F58432]' : 'text-black'}`}>{timeStr}</div>
                <StatsViewer recordList={recordList} />
                <div className="grid grid-cols-[30vw_auto] grid-rows-1">
                    <RecordList recordList={recordList} deleteRecord={deleteRecord} changePenalty={changePenalty} />
                </div>
            </div>
            <ScrambleViewer scramble={scramble} />
        </>
    )
}

export default App;
