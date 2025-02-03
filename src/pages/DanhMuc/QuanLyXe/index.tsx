import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';

const ChucVuPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('danhmuc.xe');

  const columns: IColumn<XeKTX.IRecord>[] = [
    {
      title: 'Sinh viên',
      width: 80,
      render:(val,rec)=>`${rec?.idSinhVien?.hoDem??''} ${rec?.idSinhVien?.ten}`
    },

    {
      title: 'Phòng',
      align: 'center',
      width: 120,
      render:(val,rec)=>`${rec?.idPhong?.soPhong??''}`
    },
    {
      title: 'Biển số',
      dataIndex: 'bienSo',
      align: 'center',
      filterType:'string',
      width: 120,
      sortable: true,
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 90,
      fixed: 'right',
      render: (record: XeKTX.IRecord) => (
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
      modelName="danhmuc.xe"
      title="Xe KTX"
      Form={Form}
      widthDrawer={700}
    />
  );
};

export default ChucVuPage;
