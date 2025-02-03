import { Select } from "antd";
import { useEffect } from "react";
import { useModel } from "umi";

/**
 * Secect Chức vụ để cho vào FormItem
 */
const SelectDichVuKTX = (props: {
  value?: string | null;
  onChange?: (val: string | null, option?: any) => void;
  multiple?: boolean;
  disabled?:boolean
}) => {
  const { value, onChange, multiple,disabled } = props;
  const { danhSach, getAllModel, visibleForm } = useModel("danhmuc.dichvu");

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
        value: item._id,
        label: `${item.tenDichVu} (${item.maDichVu})`,
        rawData: item,
      }))}
      disabled={disabled}
      showSearch
      optionFilterProp="label"
      placeholder="Chọn dịch vụ"
    />
  );
};

export default SelectDichVuKTX;
