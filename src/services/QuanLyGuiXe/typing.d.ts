declare module QuanLyGuiXe {
  export interface IRecord {
    _id: string;
    idSinhVien: {
      _id: string;
      username: string;
      password: string;
      hoDem: string;
      ten: string;
      cmtCccd: string;
      ngaySinh: string;
      lop: string;
      queQuan: string;
      systemRole: string;
      authorizationVersion: {
        props: [];
        version: 0;
        _id: string;
      };
    };
    idXe: {
      _id: string;
      idPhong: string;
      idSinhVien: string;
      bienSo: string;
      createdAt: string;
      updatedAt: string;
      __v: 0;
    };
    thang: number;
    nam: number;
    thoiGianGuiXe: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }
}
