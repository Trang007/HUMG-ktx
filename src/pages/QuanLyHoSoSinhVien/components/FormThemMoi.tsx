import MyDatePicker from "@/components/MyDatePicker";
import rules from "@/utils/rules";
import { resetFieldsForm } from "@/utils/utils";
import { Button, Card, Col, Form, Input, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useModel } from "umi";
import { HoSoSinhVien } from "@/services/QuanLyHoSoSinhVien/typing";

const FormThemMoi = (props: { title: string; getData?: () => void }) => {
  const { title, getData } = props;
  const [form] = Form.useForm();
  const { edit, record, formSubmiting, visibleForm, setVisibleForm, putModel, postModel, setFormSubmiting, isView } =
    useModel("quanlyhososinhvien");

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
    } else if (record?._id) {
      form.setFieldsValue({
        ...record,
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
      systemRole: "SinhVien",
    };

    if (edit) {
      putModel(record?._id ?? "", data as any, getData)
        .then()
        .catch((er) => console.log(er));
    } else
      postModel({ ...data, username: values?.cmtCccd, password: "@Abc1234" } as any, getData)
        .then()
        .catch((er) => console.log(er));
  };

  return (
    <Card title={`${edit ? "Chỉnh sửa" : isView ? "Chi tiết" : "Thêm mới"} ${title?.toLowerCase()}`}>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Họ đệm" name="hoDem" rules={[...rules.required, ...rules.text, ...rules.length(200)]}>
              <Input placeholder="VD: Nguyễn Văn" style={{ width: "100%" }} disabled={isView} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tên" name="ten" rules={[...rules.required]}>
              <Input placeholder="VD: Huy" style={{ width: "100%" }} disabled={isView} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CMT/CCCD" name="cmtCccd" rules={[...rules.CMND, ...rules.required]}>
              <Input placeholder="VD: 123456789021" style={{ width: "100%" }} disabled={isView} />
            </Form.Item>
          </Col>{" "}
          <Col span={12}>
            <Form.Item label="Ngày sinh" name="ngaySinh">
              <MyDatePicker
                disabled={isView}
                disabledDate={(cur) => !!cur && moment(cur).isSameOrAfter(moment(), "day")}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input placeholder="VD: a@gmail.com" disabled={isView} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Lớp" name="lop">
              <Input placeholder="VD: B24CHHT221" disabled={isView} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Quê quán" name="queQuan">
              <Input.TextArea
                rows={3}
                placeholder="VD: Thôn Cẩm Pha huyện Quảng Ninh Tỉnh Quảng Ninh"
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
