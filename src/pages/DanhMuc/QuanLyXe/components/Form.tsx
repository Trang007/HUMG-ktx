import SelectSinhVien from "@/pages/QuanLyHoSoSinhVien/components/Select";
import { DangKyPhongKTX } from "@/services/DangKyPhongKTX/typing";
import rules from "@/utils/rules";
import { resetFieldsForm } from "@/utils/utils";
import { Button, Card, Form, Input } from "antd";
import { useEffect } from "react";
import { useModel } from "umi";
import SelectPhongKTX from "../../PhongKTX/components/Select";

const FormChucVu = (props: any) => {
  const [form] = Form.useForm();
  const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } = useModel("danhmuc.xe");
  const title = props?.title ?? "";

  useEffect(() => {
    if (!visibleForm) resetFieldsForm(form);
    else if (record?._id)
      form.setFieldsValue({ ...record, idSinhVien: record?.idSinhVien?._id, idPhong: record?.idPhong?._id });
  }, [record?._id, visibleForm]);

  const onFinish = async (values: XeKTX.IRecord) => {
    if (edit) {
      putModel(record?._id ?? "", values)
        .then()
        .catch((er) => console.log(er));
    } else
      postModel(values)
        .then(() => form.resetFields())
        .catch((er) => console.log(er));
  };

  return (
    <Card title={(edit ? "Chỉnh sửa " : "Thêm mới ") + title?.toLowerCase()}>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item name="phong" hidden />
        <Form.Item name="idPhong" hidden />
        <Form.Item label="Phòng" name="idPhong" rules={[...rules.required, ...rules.text, ...rules.length(200)]}>
          <SelectPhongKTX
            onChange={(val, option) => {
              const rawData = option?.rawData;
              form.setFieldsValue({
                phong: rawData,
              });
            }}
          />
        </Form.Item>

        <Form.Item name="sinhvien" hidden />
        <Form.Item label="Sinh viên" name="idSinhVien" rules={[...rules.required]}>
          <SelectSinhVien
            onChange={(val, option) => {
              const rawData: DangKyPhongKTX.IRecord = option?.rawData as DangKyPhongKTX.IRecord;
              form.setFieldsValue({
                sinhvien: rawData?.idSinhVien,
                // phong: rawData?.idPhong,
                // idPhong: rawData?.idPhong?._id,
              });
            }}
          />
        </Form.Item>

        <Form.Item name="bienSo" label="Biển số" rules={[...rules.required]}>
          <Input style={{ width: "100%" }} placeholder="Biển số" />
        </Form.Item>

        <div className="form-footer">
          <Button loading={formSubmiting} htmlType="submit" type="primary">
            {!edit ? "Thêm mới" : "Lưu lại"}
          </Button>
          <Button onClick={() => setVisibleForm(false)}>Hủy</Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormChucVu;
