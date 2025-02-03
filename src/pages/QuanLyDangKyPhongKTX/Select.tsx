import { Select } from "antd";
import { useEffect } from "react";
import { useModel } from "umi";

/**
 * Secect Chức vụ để cho vào FormItem
 */
const SelectPhongDangKy = (props: {
  value?: string | null;
  onChange?: (val: string | null, option?: any) => void;
  multiple?: boolean;
  disabled?: boolean;
}) => {
  const { value, onChange, multiple, disabled } = props;
  const { danhSach, getAllModel, visibleForm } = useModel(
    "quanlydangkyphongktx"
  );

  useEffect(() => {
    if (!visibleForm) getAllModel();
  }, [visibleForm]);

  return (
    <Select
      mode={multiple ? "multiple" : undefined}
      value={value}
      onChange={onChange}
      options={danhSach.map((item) => ({
        key: item._id,
        value: item.idSinhVien?._id,
        label: `${item?.idSinhVien?.hoDem} ${item?.idSinhVien?.ten} (${item?.idPhong?.soPhong})`,
        rawData: item,
      }))}
      showSearch
      disabled={disabled}
      optionFilterProp="label"
      placeholder="Chọn sinh viên"
    />
  );
};

export default SelectPhongDangKy;
