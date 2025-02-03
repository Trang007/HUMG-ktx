import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<QuanLyVeXe.IRecord>('dang-ky-ve-xe');

  return {
    ...objInit,
  };
};
