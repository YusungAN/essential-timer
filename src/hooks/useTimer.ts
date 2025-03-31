import { useState, useRef } from "react";

export function useTimer() {
  const timerRef = useRef(0);
  const startTimeRef = useRef(0);

  const [timeStr, setTimeStr] = useState("0.000");
  const [record, setRecord] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [penaltyWithInspection, setPenaltyWithInspection] = useState<
    "" | "+2" | "DNF"
  >("");
  // const [isStopped, setIsStopped] = useState(false);
  const isRunningRef = useRef(false);
  const isStoppedRef = useRef(false);
  const isInspectionMode = useRef(false);
  const shouldRecordFirstStop = useRef(false);
  const inspectionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [firstStopeedRecord, setFirstStoppedRecord] = useState(0);

  function update() {
    const currentTime = performance.now() - startTimeRef.current;
    setTimeStr(time2Str(currentTime));
    setRecord(currentTime);
    timerRef.current = requestAnimationFrame(update);
  }

  function updateInspection() {
    let inspectionTime = 0;
    setTimeStr(inspectionTime.toString());
    inspectionTimerRef.current = setInterval(() => {
      inspectionTime += 1;
      setTimeStr(inspectionTime.toString());
      if (inspectionTime >= 17) {
        setPenaltyWithInspection("DNF");
        setTimeStr("DNF");
        clearInterval(inspectionTimerRef.current!);
      } else if (inspectionTime >= 15) {
        setPenaltyWithInspection("+2");
        setTimeStr("+2");
      }
    }, 1000);
  }

  function time2Str(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    return `${minutes > 0 ? minutes : ""}${minutes > 0 ? ":" : ""}${
      minutes > 0 ? String(seconds).padStart(2, "0") : seconds
    }.${String(milliseconds).padStart(3, "0")}`;
  }

  function startTimer(
    isInspectionActive: boolean,
    isBLDPartTimeActive: boolean
  ) {
    // console.log(isRunning, isStopped);
    if (!isRunningRef.current && !isStoppedRef.current) {
      // console.log(isInspectionActive, isInspectionMode.current);
      setFirstStoppedRecord(0);
      if (isInspectionActive && !isInspectionMode.current) {
        startInspection();
      } else {
        endInspection();
        if (isBLDPartTimeActive) shouldRecordFirstStop.current = true;
        startTimeRef.current = performance.now();
        update();
        setIsRunning(true);
        isRunningRef.current = true;
      }
    }
    isStoppedRef.current = false;
  }

  function startInspection() {
    isInspectionMode.current = true;
    updateInspection();
  }

  function endInspection() {
    if (inspectionTimerRef.current) clearInterval(inspectionTimerRef.current!);
    isInspectionMode.current = false;
  }

  function stopTiemr() {
    if (isRunningRef.current) {
      if (shouldRecordFirstStop.current) {
        setFirstStoppedRecord(performance.now() - startTimeRef.current);
        shouldRecordFirstStop.current = false;
      } else {
        cancelAnimationFrame(timerRef.current);
        setIsRunning(false);
        isRunningRef.current = false;
        isStoppedRef.current = true;
      }
    }
  }

  return {
    timeStr,
    record,
    firstStopeedRecord,
    startTimer,
    stopTiemr,
    isRunning,
    penaltyWithInspection,
  };
}
