import useInitModel from '@/hooks/useInitModel';
import { QuanLyThongTinVaDichVu } from '@/services/QuanLyThongTinVaDichVu/typing';

export default () => {
  const objInit = useInitModel<QuanLyThongTinVaDichVu.IRecord>('dang-ky-su-dung-dich-vu');

  return {
    ...objInit,
  };
};
