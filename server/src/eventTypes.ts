export interface JoinRoomData {
  roomId: string;
}

export interface EnterRoomData {
  roomId: string;
  name: string;
}

export interface ChangeSettings {
  setting: string;
  value: boolean | number;
}
