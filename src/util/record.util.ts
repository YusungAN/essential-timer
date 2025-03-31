export interface SolvedRecord {
  record: number;
  part_record: number;
  scramble: string;
  penalty: "" | "+2" | "DNF";
  timestamp: number;
}

export function time2Str(time: number) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor(time % 1000);

  return `${minutes > 0 ? minutes : ""}${minutes > 0 ? ":" : ""}${
    minutes > 0 ? String(seconds).padStart(2, "0") : seconds
  }.${String(milliseconds).padStart(3, "0")}`;
}