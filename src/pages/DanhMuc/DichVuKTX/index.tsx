import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { inputFormat } from '@/utils/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';

const ChucVuPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('danhmuc.dichvu');

  const columns: IColumn<DichVuKTX.IRecord>[] = [
    {
      title: 'Mã',
      dataIndex: 'maDichVu',
      width: 80,
      filterType: "string",
      sortable: true,
    },
    {
      title: 'Tên',
      dataIndex: 'tenDichVu',
      width: 120,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Thời gian sử dụng (Phút)',
      dataIndex: 'thoiGianSuDung',
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
      render: (record: DichVuKTX.IRecord) => (
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
      modelName="danhmuc.dichvu"
      title="Dịch vụ KTX"
      Form={Form}
      widthDrawer={700}
    />
  );
};

export default ChucVuPage;
