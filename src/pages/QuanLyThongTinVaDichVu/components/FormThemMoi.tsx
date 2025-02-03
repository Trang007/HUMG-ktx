import rules from "@/utils/rules";
import { resetFieldsForm } from "@/utils/utils";
import { Button, Card, Col, Form, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useModel } from "umi";
import { HoSoSinhVien } from "@/services/QuanLyHoSoSinhVien/typing";
import SelectPhongKTX from "@/pages/DanhMuc/PhongKTX/components/Select";
import SelectSinhVien from "@/pages/QuanLyHoSoSinhVien/components/Select";
import SelectDichVuKTX from "@/pages/DanhMuc/DichVuKTX/components/Select";
import MyDatePicker from "@/components/MyDatePicker";

const FormThemMoi = (props: { title: string; getData?: () => void }) => {
  const { title, getData } = props;
  const [form] = Form.useForm();
  const { edit, record, formSubmiting, visibleForm, setVisibleForm, putModel, postModel, setFormSubmiting, isView } =
    useModel("quanlythongtinvadichvu");

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
    } else if (record?._id) {
      form.setFieldsValue({
        ...record,
        idSinhVien: record?.idSinhVien?._id,
        idPhong: record?.idPhong?._id,
        idDichVu: record?.idDichVu?._id,
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
    <Card title={`${edit ? "Chỉnh sửa" : "Thêm mới"} ${title?.toLowerCase()}`}>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="phong" hidden />
            <Form.Item label="Phòng" name="idPhong" rules={[...rules.required]}>
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
          <Col span={24}>
            <Form.Item name="dichvu" hidden />
            <Form.Item label="Dịch vụ" name="idDichVu" rules={[...rules.required]}>
              <SelectDichVuKTX
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
            <Form.Item label="Thời gian bắt đầu sử dụng" name="thoiGianBatDauSuDung" rules={[...rules.required]}>
              <MyDatePicker
                style={{ width: "100%" }}
                disabled={isView}
                showTime={{ showHour: true, showMinute: true }}
                format="HH:mm DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Thời gian kết thúc sử dụng" name="thoiGianKetThucSuDung" rules={[...rules.required]}>
              <MyDatePicker
                style={{ width: "100%" }}
                disabled={isView}
                showTime={{ showHour: true, showMinute: true }}
                format="HH:mm DD/MM/YYYY"
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
