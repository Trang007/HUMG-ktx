import SelectPhongKTX from "@/pages/DanhMuc/PhongKTX/components/Select";
import SelectSinhVien from "@/pages/QuanLyHoSoSinhVien/components/Select";
import { HoSoSinhVien } from "@/services/QuanLyHoSoSinhVien/typing";
import rules from "@/utils/rules";
import { resetFieldsForm } from "@/utils/utils";
import { Button, Card, Col, Form, Row, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useModel } from "umi";

const FormThemMoi = (props: { title: string; getData?: () => void }) => {
  const { title, getData } = props;
  const [form] = Form.useForm();
  const { edit, record, formSubmiting, visibleForm, setVisibleForm, putModel, postModel, setFormSubmiting, isView } =
    useModel("quanlydangkyphongktx");
  const { danhSach: danhSachPhong } = useModel("danhmuc.phongktx");
  const idPhong: string = Form.useWatch("idPhong", form);

  const phongKTX = danhSachPhong?.find((item) => item?._id === idPhong);

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
    } else if (record?._id) {
      form.setFieldsValue({
        ...record,
        idSinhVien: record?.idSinhVien?._id,
        idPhong: record?.idPhong?._id,
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
            <Form.Item name="phong" hidden />
            <Form.Item
              label="Phòng"
              name="idPhong"
              rules={[...rules.required, ...rules.text, ...rules.length(200)]}
              extra={
                phongKTX?._id ? (
                  <i>
                    Số lượng tối đa {phongKTX?.soNguoiToiDa} cho phòng {phongKTX?.soPhong}
                  </i>
                ) : null
              }
            >
              <SelectPhongKTX
                disabled={isView}
                onChange={(val, option) => {
                  const rawData = option?.rawData;
                  form.setFieldsValue({
                    phong: rawData,
                  });
                }}
              />
            </Form.Item>
          </Col>
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
          <Col span={12}>
            <Form.Item label="Tháng" name="thang" rules={[...rules.required]}>
              <Select
                style={{ width: "100%", marginRight: 8 }}
                placeholder={"Chọn tháng"}
                options={Array.from({ length: 12 }, (_, index) => index + 1)?.map((val) => ({
                  value: val,
                  label: `Tháng ${val}`,
                }))}
                disabled={isView}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Năm" name="nam" rules={[...rules.required]}>
              <Select
                style={{ width: "100%", marginRight: 8 }}
                placeholder={"Chọn năm"}
                options={Array.from({ length: moment().year() + 1 - 2020 }, (_, i) => 2020 + i)?.map((val) => ({
                  value: val,
                  label: `Năm ${val}`,
                }))}
                disabled={isView}
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
