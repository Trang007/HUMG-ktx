import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<DichVuKTX.IRecord>('dich-vu');

  return {
    ...objInit,
  };
};
