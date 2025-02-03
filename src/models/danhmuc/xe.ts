import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<XeKTX.IRecord>('quan-ly-xe');

  return {
    ...objInit,
  };
};
