import { useEffect, useState, useRef } from "react";
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
import { useLoading } from "./hooks/useLoading";
import LoginButton from "./components/LoginButton/loginButton";
import SettingPopup from "./components/settingPopup/settingPopup";
import { useLocalStorage } from "usehooks-ts";
import "pretendard/dist/web/static/pretendard.css";

function App() {
  const { scramble, setNewScramble, nowCubeType, changeCubeType, cubeList } =
    useScramble();
  const {
    timeStr,
    record,
    startTimer,
    stopTiemr,
    isRunning,
    penaltyWithInspection,
  } = useTimer();
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
  const [isScrambleLoading, handleSetNewScr] = useLoading(setNewScramble);
  const [isInspectionActive] = useLocalStorage("isInspectionActive", false);
  const isInspectionActiveRef = useRef(false);

  const updateLoginInfo = useLoginInfo((state) => state.updateLoginInfo);

  function handleStartTimer(e: KeyboardEvent) {
    if (e.key === " " && !usePopupStore.getState().isOpen) {
      setIsSpaceDowned(false);
      startTimer(isInspectionActiveRef.current);
    }
  }

  function handleStopTimer(e: KeyboardEvent) {
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
    isInspectionActiveRef.current = isInspectionActive;
  }, [isInspectionActive]);

  useEffect(() => {
    if (!isRunning) {
      if (record !== 0) addRecord(scramble, record, penaltyWithInspection);
      handleSetNewScr(nowCubeType);
    }
  }, [isRunning, nowCubeType]);

  return (
    <>
      <LoginButton />
      <div className="flex flex-col w-full items-center font-[Pretendard]">
        <CubeSelector
          nowCubeType={nowCubeType}
          cubeList={cubeList}
          onSelect={changeCubeType}
        />
        <div
          className={`w-full text-center pl-[5vw] pr-[5vw] pt-[2vh] pb-[2vh] text-gray-500 ${
            nowCubeType === "6x6x6" || nowCubeType === "7x7x7"
              ? "lg:text-2xl md:text-xl sm:text-lg"
              : "lg:text-4xl md:text-2xl sm:text-xl"
          }`}
        >
          {isScrambleLoading ? "Loading..." : scramble}
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
            className={`w-full text-center pt-[10vh] pb-[5vh] text-9xl tabular-nums ${
              isSpaceDowned ? "text-[#F58432]" : "text-black"
            }`}
          >
            {timeStr}
          </div>
          {/* <TempFunctions recordList={recordList} /> */}
        </div>
        <ScrambleViewer
          scramble={scramble}
          cubeType={nowCubeType}
          isLoading={isScrambleLoading}
        />
      </div>
      <Popup />
      <SettingPopup />
    </>
  );
}

export default App;
