import { TransferInfo } from "./transferInfo";

export interface TransferHistoryInfo {
  amount: number;
  historyId: number;
  nickname: string;
  targetId: number;
  targetName: string;
  transfer: TransferInfo;
  transferId: number;
  videoUrl: string;
}
