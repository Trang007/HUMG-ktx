import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { inputFormat } from '@/utils/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';

const ChucVuPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('danhmuc.phongktx');

  const columns: IColumn<PhongKTX.IRecord>[] = [
    {
      title: 'Số phòng',
      dataIndex: 'soPhong',
      width: 80,
      filterType: "string",
      sortable: true,
    },
    {
      title: 'Loại phòng',
      dataIndex: 'loaiPhong',
      width: 120,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Số người tối đa',
      dataIndex: 'soNguoiToiDa',
      align: 'center',
      width: 120,
      sortable: true,
      render: (val) => inputFormat(val??0) ,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
      align: 'right',
      width: 120,
      sortable: true,
      render: (val) => `${inputFormat(val??0)} VNĐ` ,
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 90,
      fixed: 'right',
      render: (record: PhongKTX.IRecord) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Bạn có chắc chắn muốn xóa chức vụ này?"
              placement="topLeft"
            >
              <Button danger type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <TableBase
      columns={columns}
      dependencies={[page, limit]}
      modelName="danhmuc.phongktx"
      title="Phòng KTX"
      Form={Form}
      widthDrawer={700}
    />
  );
};

export default ChucVuPage;
