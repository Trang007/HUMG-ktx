export enum ETrangThaiThanhToan{
  THANH_TOAN_DU='Đã thanh toán đủ',
  CHUA_THANH_TOAN='Chưa thanh toán',
  CHUA_THANH_TOAN_DU=', Chưa thanh toán đủ',
  HUY='Đã hủy',
}
export const MapColorETrangThaiThanhToan={
  [ETrangThaiThanhToan.THANH_TOAN_DU]:'green',
  [ETrangThaiThanhToan.CHUA_THANH_TOAN]:'blue',
  [ETrangThaiThanhToan.CHUA_THANH_TOAN_DU]:'orange',
  [ETrangThaiThanhToan.HUY]:'red',
}
