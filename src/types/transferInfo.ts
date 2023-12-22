export interface TransferInfo {
  historyId: number;
  transferId: number;
  senderId: number;
  senderName: string;
  senderNickName: string;
  senderProfile: string;
  receiverId: number;
  receiverName: string;
  receiverNickName: string;
  receiverProfile: string;
  videoUrl: string;
  isReply: boolean;
  createdAt: string;
  amount: number;
}
