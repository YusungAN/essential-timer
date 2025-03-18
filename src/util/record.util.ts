export interface SolvedRecord {
  record: number;
  scramble: string;
  penalty: "" | "+2" | "DNF";
  timestamp: number;
}
