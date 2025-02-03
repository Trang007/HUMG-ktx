declare module VaoRaKTX {
  export interface IRecord {
    _id: string;
    cmtCccd: string;
    hoTen: string;
    ngaySinh: string;
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
    ngayDen: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }

  export interface IThongKe {
    thongTinSinhVien: {
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
    danhSachKhach: [
      {
        hoTen: string;
        cmtCccd: string;
        ngaySinh: string;
        soLanDen: 2;
      }
    ];
  }
}
