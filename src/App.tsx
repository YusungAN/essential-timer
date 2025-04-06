import { useEffect, useState, useRef } from "react";
import { useScramble } from "./hooks/useScramble";
import { useTimer } from "./hooks/useTimer";
import { useRecords } from "./hooks/useRecords";
import RecordList from "./components/recordList/recordList";
import Popup from "./components/popup/popup";
import supabase from "./supabase";
import { useLoginInfo } from "./store/useLoginStore";
import { usePopupStore } from "./store/usePopupStore";
import CubeSelector from "./components/cubeSelector/cubeSelector";
import { useLoading } from "./hooks/useLoading";
import LoginButton from "./components/LoginButton/loginButton";
import SettingPopup from "./components/settingPopup/settingPopup";
import { useLocalStorage } from "usehooks-ts";
import SharePopup from "./components/recordList/subs/sharePopup";
import { useHotKey } from "./hooks/useHotKey";
import TimerSection from "./components/TimerSection/TimerSection";
import ScrambleSection from "./components/ScrambleSection/ScrambleSection";
import { CUBE_TYPE_HOTKEYS, CubeType } from "./constants/cubeTypes";

function App() {
  const { scramble, setNewScramble, nowCubeType, changeCubeType, cubeList } =
    useScramble();
  const {
    timeStr,
    record,
    firstStopeedRecord,
    startTimer,
    stopTiemr,
    isRunning,
    penaltyWithInspection,
  } = useTimer();
  const {
    recordList,
    addRecord,
    deleteRecord,
    deleteAllRecords,
    changePenalty,
    sessionID,
    sessionIDLIst,
    changeSession,
    addSession,
    deleteSession,
  } = useRecords();

  // Register hotkeys for cube type changes
  Object.entries(CUBE_TYPE_HOTKEYS).forEach(([cubeType, keys]) => {
    useHotKey("Alt", keys, () => changeCubeType(cubeType as CubeType));
  });

  const [isSpaceDowned, setIsSpaceDowned] = useState(false);
  const [isScrambleLoading, handleSetNewScr] = useLoading(setNewScramble);
  const [isInspectionActive] = useLocalStorage("isInspectionActive", false);
  const isInspectionActiveRef = useRef(false);
  const [isBLDPartTimeActive] = useLocalStorage("isBLDPartTimeActive", false);
  const isBLDPartTimeActiveRef = useRef(false);

  const updateLoginInfo = useLoginInfo((state) => state.updateLoginInfo);

  // Event handlers
  function handleStartTimer(e: KeyboardEvent) {
    if (e.key === " " && !usePopupStore.getState().isOpen) {
      setIsSpaceDowned(false);
      startTimer(isInspectionActiveRef.current, isBLDPartTimeActiveRef.current);
    }
  }

  function handleStopTimer(e: KeyboardEvent) {
    if (e.key === " " && !usePopupStore.getState().isOpen) {
      setIsSpaceDowned(true);
      stopTiemr();
    }
  }

  function handleStartTimerTouch(e: React.TouchEvent) {
    if (e.target === e.currentTarget && !usePopupStore.getState().isOpen) {
      setIsSpaceDowned(false);
      startTimer(isInspectionActiveRef.current, isBLDPartTimeActiveRef.current);
    }
  }

  function handleStopTimerTouch(e: React.TouchEvent) {
    if (e.target === e.currentTarget && !usePopupStore.getState().isOpen) {
      setIsSpaceDowned(true);
      stopTiemr();
    }
  }

  // Record addition logic
  function handleRecordAddition() {
    if (!isRunning && record !== 0) {
      addRecord(scramble, record, firstStopeedRecord, penaltyWithInspection);
    }
  }

  // Scramble update logic
  function handleScrambleUpdate() {
    if (!isRunning) {
      handleSetNewScr(nowCubeType);
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
  }, [updateLoginInfo]);

  useEffect(() => {
    isInspectionActiveRef.current = isInspectionActive;
  }, [isInspectionActive]);

  useEffect(() => {
    isBLDPartTimeActiveRef.current = isBLDPartTimeActive;
  }, [isBLDPartTimeActive]);

  useEffect(() => {
    handleRecordAddition();
  }, [isRunning]); // 여기 dependency array는 lint의 말을 믿지 말기

  useEffect(() => {
    handleScrambleUpdate();
  }, [isRunning, nowCubeType]);

  // Component props
  const timerSectionProps = {
    timeStr,
    firstStopeedRecord,
    isSpaceDowned,
  };

  const scrambleSectionProps = {
    scramble,
    nowCubeType,
    isScrambleLoading,
  };

  const cubeSelectorProps = {
    nowCubeType,
    cubeList,
    onSelect: changeCubeType,
  };

  const recordListProps = {
    recordList,
    deleteRecord,
    changePenalty,
    nowSession: sessionID,
    sessionIDList: sessionIDLIst,
    onSessionChange: changeSession,
    addSession,
    deleteSession,
    deleteAllRecords,
  };

  return (
    <>
      <LoginButton />
      <div
        className="h-[80vh] flex flex-col w-full items-center font-[Pretendard]"
        onTouchStart={handleStopTimerTouch}
        onTouchEnd={handleStartTimerTouch}
      >
        <CubeSelector {...cubeSelectorProps} />
        <ScrambleSection {...scrambleSectionProps} />
        <RecordList {...recordListProps} />
        <TimerSection {...timerSectionProps} />
      </div>
      <Popup />
      <SettingPopup />
      <SharePopup />
    </>
  );
}

export default App;
