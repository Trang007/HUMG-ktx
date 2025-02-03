import axios from "@/utils/axios";
import { ip3 } from "@/utils/ip";

export async function xuatHoaDon(thang: number, nam: number) {
  return axios.get(`${ip3}/hoa-don/thang/${thang}/nam/${nam}/export`, {
    responseType: "arraybuffer",
  });
}

export async function thongKeHoaDon(thang: number, nam: number) {
  return axios.get(`${ip3}/hoa-don/thang/${thang}/nam/${nam}`);
}

export async function thongKeSuDungDichVu(fromDate: string, toDate: string) {
  return axios.get(`${ip3}/dang-ky-su-dung-dich-vu/thong-ke/from/${fromDate}/to/${toDate}`);
}

export async function thongKeSuDungDichVuNam(nam:any) {
  return axios.get(`${ip3}/dang-ky-su-dung-dich-vu/thong-ke/dich-vu/nam/${nam}`);
}

export async function thongKeVaoRaKTX(fromDate: string, toDate: string) {
  return axios.get(`${ip3}/khach-vao-ra-ktx/thong-ke/from/${fromDate}/to/${toDate}`);
}
