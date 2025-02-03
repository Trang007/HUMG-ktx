import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import {Button, Card, Form, Input, InputNumber} from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormChucVu = (props: any) => {
  const [form] = Form.useForm();
  const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } =
    useModel('danhmuc.phongktx');
  const title = props?.title ?? '';

  useEffect(() => {
    if (!visibleForm) resetFieldsForm(form);
    else if (record?._id) form.setFieldsValue(record);
  }, [record?._id, visibleForm]);

  const onFinish = async (values: ChucVu.IRecord) => {
    if (edit) {
      putModel(record?._id ?? '', values)
        .then()
        .catch((er) => console.log(er));
    } else
      postModel(values)
        .then(() => form.resetFields())
        .catch((er) => console.log(er));
  };

  return (
    <Card title={(edit ? 'Chỉnh sửa ' : 'Thêm mới ') + title?.toLowerCase()}>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          name="soPhong"
          label="Số phòng"
          rules={[...rules.required, ...rules.text, ...rules.length(20)]}
        >
          <Input placeholder="Số phòng" />
        </Form.Item>

        <Form.Item
          name="loaiPhong"
          label="Loại phòng"
          rules={[...rules.required, ...rules.text, ...rules.length(250)]}
        >
          <Input placeholder="Loại phòng" />
        </Form.Item>
        <Form.Item
          name="soNguoiToiDa"
          label="Số người tối đa"
          rules={[...rules.required]}
        >
          <InputNumber style={{width:'100%'}} placeholder="Số người tối đa" />
        </Form.Item>
        <Form.Item
          name="donGia"
          label="Đơn giá"
          rules={[...rules.required]}
        >
          <InputNumber style={{width:'100%'}} placeholder="Đơn giá" />
        </Form.Item>
        <div className="form-footer">
          <Button loading={formSubmiting} htmlType="submit" type="primary">
            {!edit ? 'Thêm mới' : 'Lưu lại'}
          </Button>
          <Button onClick={() => setVisibleForm(false)}>Hủy</Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormChucVu;
