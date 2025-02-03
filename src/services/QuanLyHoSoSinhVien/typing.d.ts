import type {
  ESourceTypeNotification,
  EReceiverType,
  ENotificationSource,
} from "./constant";

declare module HoSoSinhVien {
  export interface IRecord {
    _id: string;
    username: string;
    hoDem: string;
    ten: string;
    cmtCccd: string;
    ngaySinh: string;
    lop: string;
    queQuan: string;
    systemRole: string;

    [k: string]: any;
  }

  export type TNotificationSource = {
    entityId?: string;
    entitySource?: ENotificationSource;
    pathWeb?: string;
    phanHe?: ESourceTypeNotification;
  } & Record<string, any>;
}
