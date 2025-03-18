import { useState, useRef } from "react";

export function useTimer() {
  const timerRef = useRef(0);
  const startTimeRef = useRef(0);

  const [timeStr, setTimeStr] = useState("0.000");
  const [record, setRecord] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  // const [isStopped, setIsStopped] = useState(false);
  const isRunningRef = useRef(false);
  const isStoppedRef = useRef(false);

  function update() {
    const currentTime = performance.now() - startTimeRef.current;
    setTimeStr(time2Str(currentTime));
    setRecord(currentTime);
    timerRef.current = requestAnimationFrame(update);
  }

  function time2Str(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    return `${minutes > 0 ? minutes : ""}${minutes > 0 ? ":" : ""}${
      minutes > 0 ? String(seconds).padStart(2, "0") : seconds
    }.${String(milliseconds).padStart(3, "0")}`;
  }

  function startTimer() {
    // console.log(isRunning, isStopped);
    if (!isRunningRef.current && !isStoppedRef.current) {
      startTimeRef.current = performance.now();
      update();
      setIsRunning(true);
      isRunningRef.current = true;
    }
    isStoppedRef.current = false;
  }

  function stopTiemr() {
    if (isRunningRef.current) {
      cancelAnimationFrame(timerRef.current);
      setIsRunning(false);
      isRunningRef.current = false;
      isStoppedRef.current = true;
    }
  }

  return { timeStr, record, startTimer, stopTiemr, isRunning };
}
