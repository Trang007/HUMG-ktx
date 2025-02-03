import { Select } from "antd";
import { useEffect } from "react";
import { useModel } from "umi";

/**
 * Secect Chức vụ để cho vào FormItem
 */
const SelectXeKTX = (props: {
  value?: string | null;
  onChange?: (val: string | null, option?: any) => void;
  multiple?: boolean;
  disabled?: boolean;
  idSinhVien?: string;
}) => {
  const { value, onChange, multiple, disabled, idSinhVien } = props;
  const { danhSach, getAllModel, visibleForm } = useModel("danhmuc.xe");

  useEffect(() => {
    if (!visibleForm)
      getAllModel(undefined, undefined, { idSinhVien: idSinhVien });
  }, [visibleForm, idSinhVien]);

  return (
    <Select
      mode={multiple ? "multiple" : undefined}
      value={value}
      onChange={onChange}
      options={danhSach.map((item) => ({
        key: item._id,
        value: item._id,
        label: `${item.bienSo}`,
        rawData: item,
      }))}
      disabled={disabled}
      showSearch
      optionFilterProp="label"
      placeholder="Chọn xe"
    />
  );
};

export default SelectXeKTX;
