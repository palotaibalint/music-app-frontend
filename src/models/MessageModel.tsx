// MessageModel.ts
import UserModel from "./UserModel";

export default interface MessageModel {
  id: number;
  content: string;
  sender: UserModel;
  receiver: UserModel;
  sentAt: string;
}
