import StatsViewer from "../statsViewer/StatsViewer";
import { useViewersHandlingStore } from "../../store/useViewersHandleStore";
import { useLoginInfo } from "../../store/useLoginStore";
import supabase from "../../supabase";
import { SolvedRecord } from "../../util/record.util";

function TempFunctions(props: { recordList: SolvedRecord[] }) {
  const { recordList } = props;
  const email = useLoginInfo((state) => state.email);
  const isLogged = useLoginInfo((state) => state.isLogged);
  const updateLoginInfo = useLoginInfo((state) => state.updateLoginInfo);
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
  return (
    <>
      <StatsViewer recordList={recordList} />
      <div onClick={login}>{isLogged ? "logout" : "login"}</div>
      <div>{isLogged ? `logged with ${email}` : ""}</div>
      <div onClick={() => changeRecordListOpenStatus(!isOpenedRecordList)}>
        {isOpenedRecordList ? "close" : "open"} record list
      </div>
      <div
        onClick={() => changeScrambleViewerOpenStatus(!isOpenedScrambleViewer)}
      >
        {isOpenedScrambleViewer ? "close" : "open"} scramble viewer
      </div>
      <div onClick={resetViewers}>reset position and size</div>
    </>
  );
}

export default TempFunctions;
