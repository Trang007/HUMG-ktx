import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<PhongKTX.IRecord>('phong-ktx');

  return {
    ...objInit,
  };
};
