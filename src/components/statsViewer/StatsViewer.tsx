import { SolvedRecord } from "../../util/record.util";
import { useEffect, useState } from "react";

function StatsViewer(props: { recordList: SolvedRecord[] }) {
  const { recordList } = props;

  const [nowAo5, setNowAo5] = useState<number | null>(null);
  const [nowAo12, setNowAo12] = useState<number | null>(null);
  const [bestAo5, setBestAo5] = useState<number | null>(null);
  const [bestAo12, setBestAo12] = useState<number | null>(null);

  function time2Str(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    return `${minutes > 0 ? minutes : ""}${minutes > 0 ? ":" : ""}${
      minutes > 0 ? String(seconds).padStart(2, "0") : seconds
    }.${String(milliseconds).padStart(3, "0")}`;
  }

  function calcBasicStats() {
    let _nowAo5 = 0;
    let _nowAo12 = 0;
    let _bestAo5 = Infinity;
    let _bestAo12 = Infinity;
    if (recordList.length >= 5) {
      for (let i = 0; i < recordList.length - 4; i++) {
        const tempArr = recordList
          .slice(i, i + 5)
          .map((item) =>
            item.penalty === "+2"
              ? item.record + 2
              : item.penalty === "DNF"
              ? Infinity
              : item.record
          );
        tempArr.sort((a, b) => a - b);
        _nowAo5 = (tempArr[1] + tempArr[2] + tempArr[3]) / 3;
        _bestAo5 = Math.min(_nowAo5, _bestAo5);
      }
      setNowAo5(_nowAo5);
      setBestAo5(_bestAo5);
    } else {
      setNowAo5(null);
      setBestAo5(null);
    }

    if (recordList.length >= 12) {
      for (let i = 0; i < recordList.length - 11; i++) {
        const tempArr = recordList
          .slice(i, i + 12)
          .map((item) =>
            item.penalty === "+2"
              ? item.record + 2
              : item.penalty === "DNF"
              ? Infinity
              : item.record
          );
        tempArr.sort();
        _nowAo12 = tempArr.slice(2, 12).reduce((acc, cur) => acc + cur) / 10;
        _bestAo12 = Math.min(_nowAo12, _bestAo12);
      }
      setNowAo12(_nowAo12);
      setBestAo12(_bestAo12);
    } else {
      setNowAo12(null);
      setBestAo12(null);
    }
  }

  useEffect(() => {
    calcBasicStats();
  }, [recordList.length]);

  return (
    <>
      <div>
        now/best Ao5: {nowAo5 !== null ? time2Str(nowAo5) : "---"}/
        {bestAo5 !== null ? time2Str(bestAo5) : "---"}
      </div>
      <div>
        now/best Ao12: {nowAo12 !== null ? time2Str(nowAo12) : "---"}/
        {bestAo12 !== null ? time2Str(bestAo12) : "---"}
      </div>
    </>
  );
}

export default StatsViewer;
