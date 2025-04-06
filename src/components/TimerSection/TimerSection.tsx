import { useMemo } from "react";
import { time2Str } from "../../util/record.util";

interface TimerSectionProps {
  timeStr: string;
  firstStopeedRecord: number;
  isSpaceDowned: boolean;
}

const TimerSection = ({
  timeStr,
  firstStopeedRecord,
  isSpaceDowned,
}: TimerSectionProps) => {
  const timerColorClass = useMemo(
    () => (isSpaceDowned ? "text-[#F58432]" : "text-black"),
    [isSpaceDowned]
  );

  const firstStoppedTimeStr = useMemo(
    () => (firstStopeedRecord !== 0 ? time2Str(firstStopeedRecord) : ""),
    [firstStopeedRecord]
  );

  return (
    <div>
      <div
        className={`w-full text-center pt-[1vh] sm:pt-[10vh] pb-[5vh] text-7xl sm:text-8xl md:text-9xl tabular-nums ${timerColorClass}`}
      >
        {timeStr}
      </div>
      <div className="w-full text-center text-2xl md:text-4xl">{firstStoppedTimeStr}</div>
    </div>
  );
};

export default TimerSection;
