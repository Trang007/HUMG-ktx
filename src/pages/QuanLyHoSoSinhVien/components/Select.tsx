import { Select } from "antd";
import { useEffect } from "react";
import { useModel } from "umi";

/**
 * Secect Chức vụ để cho vào FormItem
 */
const SelectSinhVien = (props: {
  value?: string | null;
  onChange?: (val: string | null, option?: any) => void;
  multiple?: boolean;
  disabled?:boolean
}) => {
  const { value, onChange, multiple,disabled } = props;
  const { danhSach, getAllModel, visibleForm } = useModel("quanlyhososinhvien");

  useEffect(() => {
    if (!visibleForm)
      getAllModel(
       undefined,
        undefined,
        { systemRole: "SinhVien" },
        undefined,
        "all"
      );
  }, [visibleForm]);

  return (
    <Select
      mode={multiple ? "multiple" : undefined}
      value={value}
      onChange={onChange}
      options={danhSach.map((item) => ({
        key: item._id,
        value: item._id,
        label: `${item.hoDem} (${item.ten})`,
        rawData: item,
      }))}
      showSearch
      disabled={disabled}
      optionFilterProp="label"
      placeholder="Chọn sinh viên"
    />
  );
};

export default SelectSinhVien;
