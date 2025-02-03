import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<QuanLyGuiXe.IRecord>('lay-gui-xe');

  return {
    ...objInit,
  };
};
