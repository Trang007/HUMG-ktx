import rules from "@/utils/rules";
import { resetFieldsForm } from "@/utils/utils";
import { Button, Card, Col, Form, Row, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useModel } from "umi";
import { HoSoSinhVien } from "@/services/QuanLyHoSoSinhVien/typing";
import SelectSinhVien from "@/pages/QuanLyHoSoSinhVien/components/Select";
import SelectXeKTX from "@/pages/DanhMuc/QuanLyXe/components/Select";

const FormThemMoi = (props: { title: string; getData?: () => void }) => {
  const { title, getData } = props;
  const [form] = Form.useForm();
  const { edit, record, formSubmiting, visibleForm, setVisibleForm, putModel, postModel, setFormSubmiting, isView } =
    useModel("quanlyvexe");
  const idSinhVien = Form.useWatch("idSinhVien", form);

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
    } else if (record?._id) {
      form.setFieldsValue({
        ...record,
        idSinhVien: record?.idSinhVien?._id,
        idXe: record?.idXe?._id,
      });
    } else {
      form.setFieldsValue({
        thoiGianNop: moment().toISOString(),
      });
    }
  }, [record?._id, visibleForm]);

  const onFinish = async (values: HoSoSinhVien.IRecord) => {
    setFormSubmiting(true);
    // const urlTaiLieu = await buildUpLoadFile(values, 'urlTaiLieu');
    // const urlTomTat = await buildUpLoadFile(values, 'urlTomTat');
    // const urlTaiLieuMinhChung = await buildUpLoadFile(values, 'urlTaiLieuMinhChung');
    setFormSubmiting(false);
    const data = {
      ...values,
      thang: +values?.thang - 1,
    };

    if (edit) {
      putModel(record?._id ?? "", data as any, getData)
        .then()
        .catch((er) => console.log(er));
    } else
      postModel(data as any, getData)
        .then()
        .catch((er) => console.log(er));
  };

  return (
    <Card title={`${edit ? "Chỉnh sửa" : isView ? "Chi tiết" : "Thêm mới"} ${title?.toLowerCase()}`}>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="sinhvien" hidden />
            <Form.Item label="Sinh viên" name="idSinhVien" rules={[...rules.required]}>
              <SelectSinhVien
                disabled={isView}
                onChange={(val, option) => {
                  const rawData = option?.rawData;
                  form.setFieldsValue({
                    sinhvien: rawData,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="xe" hidden />
            <Form.Item label="Xe" name="idXe" rules={[...rules.required]}>
              <SelectXeKTX
                idSinhVien={idSinhVien}
                disabled={isView}
                onChange={(val, option) => {
                  const rawData = option?.rawData;
                  form.setFieldsValue({
                    xe: rawData,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tháng" name="thang" rules={[...rules.required]}>
              <Select
                disabled={isView}
                style={{ width: "100%", marginRight: 8 }}
                placeholder={"Chọn tháng"}
                options={Array.from({ length: 12 }, (_, index) => index + 1)?.map((val) => ({
                  value: val,
                  label: `Tháng ${val}`,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Năm" name="nam" rules={[...rules.required]}>
              <Select
                disabled={isView}
                style={{ width: "100%", marginRight: 8 }}
                placeholder={"Chọn năm"}
                options={Array.from({ length: moment().year() + 1 - 2020 }, (_, i) => 2020 + i)?.map((val) => ({
                  value: val,
                  label: `Năm ${val}`,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="form-footer">
          {!isView && (
            <Button loading={formSubmiting} htmlType="submit" type="primary">
              {!edit ? "Thêm mới" : "Chỉnh sửa"}
            </Button>
          )}
          <Button onClick={() => setVisibleForm(false)}>Hủy</Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormThemMoi;
