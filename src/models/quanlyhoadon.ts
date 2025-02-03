import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<QuanLyHoaDon.IRecord>('hoa-don');

  return {
    ...objInit,
  };
};
