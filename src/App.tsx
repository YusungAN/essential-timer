import { useEffect, useState } from "react";
import { useScramble } from "./hooks/useScramble";
import { useTimer } from "./hooks/useTimer";
import { useRecords } from "./hooks/useRecords";
import RecordList from "./components/recordList/recordList";
import StatsViewer from "./components/statsViewer/StatsViewer";
import ScrambleViewer from "./components/scrambleViewer/scrambleViewer";
import { useViewersHandlingStore } from "./store/useViewersHandleStore";
import Popup from "./components/popup/popup";
import supabase from "./supabase";
import { useLoginInfo } from "./store/useLoginStore";

function App() {
  const { scramble, setNewScramble } = useScramble();
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

  const isOpenedRecordList = useViewersHandlingStore(
    (state) => state.isOpenedRecordList
  );
  const isOpenedScrambleViewer = useViewersHandlingStore(
    (state) => state.isOpenedScrambleViewer
  );
  const changeRecordListOpenStatus = useViewersHandlingStore(
    (state) => state.changeRecordListOpenStatus
  );
  const changeScrambleViewerOpenStatus = useViewersHandlingStore(
    (state) => state.changeScrambleViewerOpenStatus
  );
  const resetViewers = useViewersHandlingStore((state) => state.resetSetting);
  const updateLoginInfo = useLoginInfo((state) => state.updateLoginInfo);
  const isLogged = useLoginInfo((state) => state.isLogged);
  const email = useLoginInfo((state) => state.email);

  function handleStartTimer(e: KeyboardEvent) {
    if (e.key === " ") {
      setIsSpaceDowned(false);
      startTimer();
    }
  }

  function handleStopTimer(e: KeyboardEvent) {
    if (e.key === " ") {
      setIsSpaceDowned(true);
      stopTiemr();
    }
  }

  async function login() {
    if (!isLogged) {
      supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } else {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
        return;
      }
      updateLoginInfo(false, "", "");
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", handleStartTimer, false);
    document.addEventListener("keydown", handleStopTimer, false);

    supabase.auth.getUser().then((user) => {
      console.log(user);
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
      setNewScramble("3x3x3");
    }
  }, [isRunning]);

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <button onClick={login}>{isLogged ? "logout" : "login"}</button>
        <div>{isLogged ? `logged with ${email}` : ""}</div>
        <button onClick={() => changeRecordListOpenStatus(!isOpenedRecordList)}>
          {isOpenedRecordList ? "close" : "open"} record list
        </button>
        <button
          onClick={() =>
            changeScrambleViewerOpenStatus(!isOpenedScrambleViewer)
          }
        >
          {isOpenedScrambleViewer ? "close" : "open"} scramble viewer
        </button>
        <button onClick={resetViewers}>reset position and size</button>
        <div className="w-full text-center pl-[5vw] pr-[5vw] pt-[2vh] pb-[2vh] text-3xl">
          {scramble}
        </div>
        <div
          className={`w-full text-center pt-[20vh] pb-[5vh] text-9xl tabular-nums ${
            isSpaceDowned ? "text-[#F58432]" : "text-black"
          }`}
        >
          {timeStr}
        </div>
        <StatsViewer recordList={recordList} />
        <div className="grid grid-cols-[30vw_auto] grid-rows-1">
          <RecordList
            recordList={recordList}
            deleteRecord={deleteRecord}
            changePenalty={changePenalty}
            nowSession={sessionID}
            sessionIDList={sessionIDLIst}
            onSessionChange={changeSession}
            addSession={addSession}
            deleteSession={deleteSession}
          />
        </div>
      </div>
      <ScrambleViewer scramble={scramble} />
      <Popup />
    </>
  );
}

export default App;
