import supabase from "../supabase";
import { SolvedRecord } from "./record.util";

export const SupabaseAPI = {
  getSessionRecords: getSessionRecords,
  addRecord: addRecord,
  deleteRecord: deleteRecord,
  deleteAllRecords: deleteAllRecords,
  changePenalty: changePenalty,
  getSessionIDList: getSessionIDList,
  addSession: addSession,
  deleteSession: deleteSession,
};

async function getSessionRecords(sessionID: string) {
  try {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      const { data, error } = await supabase
        .from("record")
        .select("record,scramble,penalty,timestamp")
        .eq("userid", user.data.user.id)
        .eq("sessionid", sessionID);
      if (error || data === null) throw Error();
      return data as SolvedRecord[];
    }
  } catch (e) {
    console.log(e);
    alert("세션 기록을 불러오는데 실패했습니다.");
  }
}

async function addRecord(sessionID: string, record: SolvedRecord) {
  try {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      const { status } = await supabase.from("record").insert({
        sessionid: sessionID,
        ...record,
      });
      if (status === 201) return;
      throw Error();
    }
  } catch (e) {
    console.log(e);
    alert("기록을 추가하는데 실패했습니다.");
  }
}

async function deleteRecord(sessionID: string, target: SolvedRecord) {
  try {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      const { status } = await supabase
        .from("record")
        .delete()
        .eq("userid", user.data.user.id)
        .eq("sessionid", sessionID)
        .eq("timestamp", target.timestamp);
      if (status === 204) return;
      throw Error();
    }
  } catch (e) {
    console.log(e);
    alert("기록을 삭제하는데 실패했습니다.");
  }
}

async function deleteAllRecords(sessionID: string) {
  try {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      const { status } = await supabase
        .from("record")
        .delete()
        .eq("userid", user.data.user.id)
        .eq("sessionid", sessionID)
      if (status === 204) return;
      throw Error();
    }
  } catch (e) {
    console.log(e);
    alert("기록을 삭제하는데 실패했습니다.");
  }
}

async function changePenalty(
  sessionID: string,
  target: SolvedRecord,
  penalty: "" | "+2" | "DNF"
) {
  try {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      const { status } = await supabase
        .from("record")
        .update({ penalty: penalty })
        .eq("userid", user.data.user.id)
        .eq("sessionid", sessionID)
        .eq("timestamp", target.timestamp);
      if (status === 204) return;
      throw Error();
    }
  } catch (e) {
    console.log(e);
    alert("페널티 여부를 변경하는데 실패했습니다.");
  }
}

async function getSessionIDList() {
  try {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      const { data, error } = await supabase
        .from("session")
        .select("session_name")
        .eq("user_id", user.data.user.id);
      if (error || data === null) throw Error();
      return data.map((item) => item.session_name);
    }
  } catch (e) {
    console.log(e);
    alert("세션 리스트를 불러오는데 실패했습니다.");
  }
}

async function addSession(newSesisonID: string) {
  try {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      const { status } = await supabase
        .from("session")
        .insert({ session_name: newSesisonID });
      if (status === 201) return;
      throw Error();
    }
  } catch (e) {
    console.log(e);
    alert("세션을 추가하는데 실패했습니다.");
  }
}

async function deleteSession(target: string) {
  try {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      const { status } = await supabase
        .from("session")
        .delete()
        .eq("user_id", user.data.user.id)
        .eq("session_name", target);

      await supabase
        .from("record")
        .delete()
        .eq("userid", user.data.user.id)
        .eq("sessionid", target);

      if (status === 204) return;
      throw Error();
    }
  } catch (e) {
    console.log(e);
    alert("세션을 삭제하는데 실패했습니다.");
  }
}
