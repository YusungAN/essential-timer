import { useEffect, useState } from "react";
import { useScramble } from "./hooks/useScramble";
import { useTimer } from "./hooks/useTimer";
import { useRecords } from "./hooks/useRecords";
import RecordList from "./components/recordList/recordList";
import ScrambleViewer from "./components/scrambleViewer/scrambleViewer";
import Popup from "./components/popup/popup";
import supabase from "./supabase";
import { useLoginInfo } from "./store/useLoginStore";
import { usePopupStore } from "./store/usePopupStore";
import CubeSelector from "./components/cubeSelector/cubeSelector";
import TempFunctions from "./components/tempFunctions/tempFunctions";

function App() {
  const { scramble, setNewScramble, nowCubeType, changeCubeType, cubeList } =
    useScramble();
  const { timeStr, record, startTimer, stopTiemr, isRunning } = useTimer();
  const {
    recordList,
    addRecord,
    deleteRecord,
    changePenalty,
    sessionID,
    sessionIDLIst,
    changeSession,
    addSession,
    deleteSession,
  } = useRecords();

  const [isSpaceDowned, setIsSpaceDowned] = useState(false);

  const updateLoginInfo = useLoginInfo((state) => state.updateLoginInfo);

  function handleStartTimer(e: KeyboardEvent) {
    if (e.key === " " && !usePopupStore.getState().isOpen) {
      setIsSpaceDowned(false);
      startTimer();
    }
  }

  function handleStopTimer(e: KeyboardEvent) {
    console.log(e.key);
    if (e.key === " " && !usePopupStore.getState().isOpen) {
      setIsSpaceDowned(true);
      stopTiemr();
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", handleStartTimer, false);
    document.addEventListener("keydown", handleStopTimer, false);

    supabase.auth.getUser().then((user) => {
      updateLoginInfo(
        user.data.user !== null,
        user.data.user?.id !== undefined ? user.data.user.id : "",
        user.data.user?.email !== undefined ? user.data.user.email : ""
      );
    });
    return () => {
      document.removeEventListener("keyup", handleStartTimer, false);
      document.removeEventListener("keydown", handleStopTimer, false);
    };
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (record !== 0) addRecord(scramble, record, "");
      setNewScramble(nowCubeType);
    }
  }, [isRunning, nowCubeType]);

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <CubeSelector
          nowCubeType={nowCubeType}
          cubeList={cubeList}
          onSelect={changeCubeType}
        />
        <div className="w-full text-center pl-[5vw] pr-[5vw] pt-[2vh] pb-[2vh] text-3xl">
          {scramble}
        </div>
        {/* <div className="flex justify-between w-full"> */}
          <RecordList // record list section
            recordList={recordList}
            deleteRecord={deleteRecord}
            changePenalty={changePenalty}
            nowSession={sessionID}
            sessionIDList={sessionIDLIst}
            onSessionChange={changeSession}
            addSession={addSession}
            deleteSession={deleteSession}
          />
          <div>
            {/* timer section */}
            <div
              className={`w-full text-center pt-[20vh] pb-[5vh] text-9xl tabular-nums ${
                isSpaceDowned ? "text-[#F58432]" : "text-black"
              }`}
            >
              {timeStr}
            </div>
            <TempFunctions recordList={recordList} />
          </div>
          <ScrambleViewer scramble={scramble} />
        </div>
      {/* </div> */}
      <Popup />
    </>
  );
}

export default App;
