declare module XeKTX {
  export interface IRecord {
    _id: string;
    idPhong: {
      _id: string;
      soPhong: string;
      loaiPhong: string;
      soNguoiToiDa: number;
      donGia: number;
    };
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
        version: number;
        _id: string;
      };
    }|string;
    bienSo: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }
}
