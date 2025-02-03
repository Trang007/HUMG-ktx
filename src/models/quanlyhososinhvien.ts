import useInitModel from '@/hooks/useInitModel';
import {HoSoSinhVien} from "@/services/QuanLyHoSoSinhVien/typing";

export default () => {
  const objInit = useInitModel<HoSoSinhVien.IRecord>('user');

  return {
    ...objInit,
  };
};
