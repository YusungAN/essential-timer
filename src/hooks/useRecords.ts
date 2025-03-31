import { useState, useEffect } from "react";
import IndexedDBClient from "../util/clientDB";
import { useLocalStorage } from "usehooks-ts";
import { SolvedRecord } from "../util/record.util";
import { SupabaseAPI } from "../util/supaDB";
import { useLoginInfo } from "../store/useLoginStore";

export function useRecords() {
  const [sessionID, setSessionID] = useLocalStorage("lastSession", "session1");
  const [recordList, setRecordList] = useState<SolvedRecord[]>([]);
  const [sessionIDLIst, setSessionIDList] = useState<string[]>([]);

  const isLogged = useLoginInfo((state) => state.isLogged);

  async function getSessionRecords() {
    try {
      if (isLogged) {
        const data = await SupabaseAPI.getSessionRecords(sessionID);
        if (data !== undefined) setRecordList(data);
      } else {
        const data = await IndexedDBClient.getSessionRecords(sessionID);
        if (data !== undefined) setRecordList(data.records);
      }
    } catch (e) {
      alert("기록을 불러오는데 실패했습니다.");
      console.log(e);
    }
  }

  async function getSessionIDList() {
    try {
      if (isLogged) {
        const data = await SupabaseAPI.getSessionIDList();
        if (data !== undefined) {
          if (data.length === 0) {
            await addSession("session1");
            setSessionIDList(["session1"]);
          } else setSessionIDList(data);
        }
      } else {
        const data = await IndexedDBClient.getSessionIDList();
        if (data !== undefined) setSessionIDList(data);
      }
    } catch (e) {
      console.log(e);
      alert("셰션 목록을 불러오는데 실패했습니다.");
    }
  }

  async function addRecord(
    scramble: string,
    record: number,
    firstStopeedRecord: number,
    penalty: "" | "+2" | "DNF"
  ) {
    const newRecord = {
      record: record,
      part_record: firstStopeedRecord,
      scramble: scramble,
      penalty: penalty,
      timestamp: Date.now(),
    };
    try {
      setRecordList((prevList) => [...prevList, newRecord]);
      if (isLogged) {
        await SupabaseAPI.addRecord(sessionID, newRecord);
      } else {
        await IndexedDBClient.addRecord(sessionID, newRecord);
      }
    } catch (e) {
      console.log(e);
      alert("기록을 추가하는데 실패했습니다.");
    }
  }

  async function deleteRecord(target: SolvedRecord) {
    try {
      if (isLogged) {
        await SupabaseAPI.deleteRecord(sessionID, target);
      } else {
        await IndexedDBClient.deleteRecord(sessionID, target);
      }
      setRecordList(
        recordList.filter(
          (item: SolvedRecord) => item.timestamp !== target.timestamp
        )
      );
    } catch (e) {
      console.log(e);
      alert("기록을 삭제하는데 실패했습니다.");
    }
  }

  async function changePenalty(
    target: SolvedRecord,
    penalty: "" | "+2" | "DNF"
  ) {
    try {
      if (isLogged) {
        await SupabaseAPI.changePenalty(
          sessionID,
          target,
          target.penalty === penalty ? "" : penalty
        );
      } else {
        await IndexedDBClient.changePenalty(sessionID, target, penalty);
      }
      setRecordList(
        recordList.map((item) => {
          if (item.timestamp === target.timestamp) {
            if (item.penalty !== penalty) return { ...item, penalty: penalty };
            else return { ...item, penalty: "" };
          } else return item;
        })
      );
    } catch (e) {
      console.log(e);
      alert("페널티를 수정하는데 실패했습니다.");
    }
  }

  async function addSession(newSessionID: string) {
    try {
      if (isLogged) {
        await SupabaseAPI.addSession(newSessionID);
      } else {
        await IndexedDBClient.addSession(newSessionID);
      }
      setSessionIDList((prev) => [...prev, newSessionID]);
    } catch (e) {
      console.log(e);
      alert(
        "세션 추가에 실패했습니다. 같은 이름의 세션이 있는지 확인해주세요."
      );
    }
  }

  async function deleteSession(targetID: string) {
    try {
      if (sessionIDLIst.length <= 1) throw Error();

      if (isLogged) {
        await SupabaseAPI.deleteSession(targetID);
      } else {
        await IndexedDBClient.deleteSession(targetID);
      }
      const newSessionList = sessionIDLIst.filter(
        (item: string) => item !== targetID
      );
      setSessionIDList(newSessionList);
      if (targetID === sessionID) {
        setSessionID(newSessionList[0]);
      }
    } catch (e) {
      console.log(e);
      alert(
        "세션 삭제에 실패했습니다. 세션은 최소 한 개 이상 존재해야 합니다."
      );
    }
  }

  function changeSession(newSessionID: string) {
    setSessionID(newSessionID);
  }

  useEffect(() => {
    getSessionRecords();
  }, [sessionID, isLogged]);

  useEffect(() => {
    getSessionIDList();
  }, [isLogged]);

  return {
    sessionID,
    sessionIDLIst,
    recordList,
    changeSession,
    getSessionRecords,
    addRecord,
    deleteRecord,
    changePenalty,
    addSession,
    deleteSession,
  };
}
