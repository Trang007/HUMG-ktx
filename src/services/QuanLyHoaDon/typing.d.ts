declare module QuanLyHoaDon {
  export interface IRecord {
    soLuong: number;
    _id: string;
    donGia: number;
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
    idSource: string;
    loaiHoaDon: string;
    thanhTien: number;
    thang: number;
    nam: number;
    trangThaiThanhToan: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }

  export interface IThongKe {
    dichVu: number;
    thuePhong: number;
    veXe: number;
    guiXe: number;
    sinhVien: {
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
        version: 0;
      };
    };
  }
}
