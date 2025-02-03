import useInitModel from '@/hooks/useInitModel';
import {DangKyPhongKTX} from "@/services/DangKyPhongKTX/typing";

export default () => {
  const objInit = useInitModel<DangKyPhongKTX.IRecord>('dang-ky-phong');

  return {
    ...objInit,
  };
};
