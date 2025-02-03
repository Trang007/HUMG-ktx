import rules from "@/utils/rules";
import { resetFieldsForm } from "@/utils/utils";
import { Button, Card, Col, Form, Input, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useModel } from "umi";
import { HoSoSinhVien } from "@/services/QuanLyHoSoSinhVien/typing";
import SelectSinhVien from "@/pages/QuanLyHoSoSinhVien/components/Select";
import SelectXeKTX from "@/pages/DanhMuc/QuanLyXe/components/Select";
import MyDatePicker from "@/components/MyDatePicker";

const FormThemMoi = (props: { title: string; getData?: () => void }) => {
  const { title, getData } = props;
  const [form] = Form.useForm();
  const { edit, record, formSubmiting, visibleForm, setVisibleForm, putModel, postModel, setFormSubmiting, isView } =
    useModel("quanlyvaoraktx");
  const idSinhVien = Form.useWatch("idSinhVien", form);

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
    } else if (record?._id) {
      form.setFieldsValue({
        ...record,
        idSinhVien: record?.idSinhVien?._id,
        // idXe: record?.idXe?._id,
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
    <Card title={`${edit ? "Chỉnh sửa" : isView ? "Chi tiết" : "Thêm mới"} ${title?.toLowerCase()}`}>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="sinhvien" hidden />
            <Form.Item label="Gặp sinh viên" name="idSinhVien" rules={[...rules.required]}>
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
            <Form.Item label="Họ và tên" name="hoTen" rules={[...rules.required]}>
              <Input placeholder={"Họ và tên"} disabled={isView} />
            </Form.Item>
          </Col>{" "}
          <Col span={12}>
            <Form.Item label="CMT/CCCD" name="cmtCccd" rules={[...rules.required]}>
              <Input placeholder={"CMT/CCCD"} disabled={isView} />
            </Form.Item>
          </Col>
          {/*<Col span={12}>*/}
          {/*  <Form.Item label="Tháng" name="thang" rules={[...rules.required]}>*/}
          {/*    <InputNumber style={{ width: "100%" }} disabled={isView} />*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}
          {/*<Col span={12}>*/}
          {/*  <Form.Item label="Năm" name="nam" rules={[...rules.required]}>*/}
          {/*    <InputNumber style={{ width: "100%" }} disabled={isView} />*/}
          {/*  </Form.Item>*/}
          {/*</Col> */}
          <Col span={12}>
            <Form.Item label="Ngày sinh" name="ngaySinh">
              <MyDatePicker disabled={isView} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày đến" name="ngayDen" rules={[...rules.required]}>
              <MyDatePicker disabled={isView} />
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
