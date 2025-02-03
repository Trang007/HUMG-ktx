import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<VaoRaKTX.IRecord>('khach-vao-ra-ktx');

  return {
    ...objInit,
  };
};
