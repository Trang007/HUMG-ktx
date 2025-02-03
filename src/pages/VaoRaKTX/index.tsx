import { useModel } from "umi";
import TableBase from "@/components/Table";
import { IColumn } from "@/components/Table/typing";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ButtonExtend from "@/components/Table/ButtonExtend";
import { Popconfirm } from "antd";
import FormThemMoi from "./components/FormThemMoi";
import moment from "moment";

const QuanLyVaoRaKTXPage = () => {
  const { getModel, handleEdit, handleView, deleteModel } = useModel(
    "quanlyvaoraktx"
  );

  const getData = () => {
    getModel();
  };

  const columns: IColumn<VaoRaKTX.IRecord>[] = [
    {
      title: "Chủ phòng",
      width: 120,
      render: (val, rec) =>
        `${rec?.idSinhVien?.hoDem ?? ""} ${rec?.idSinhVien?.ten}`,
    },
    {
      title: "CMT/CCCD",
      align: "center",
      width: 120,
      render: (val, rec) => `${rec?.idSinhVien?.cmtCccd ?? ""}`,
    },
    {
      title: "Khách",
      dataIndex:'hoTen',
      align: "center",
      width: 120,
    },
    {
      title: "CMT/CCCD Khách",
      align: "center",
      dataIndex: "cmtCccd",
      width: 120,
    },
    {
      title: "Ngày đến",
      align: "center",
      dataIndex: "ngayDen",
      width: 120,
      render:(val)=>val?moment(val).format('DD/MM/YYYY'):''
    },
    {
      title: "Thao tác",
      align: "center",
      width: 90,
      render: (val, rec) => (
        <>
          <ButtonExtend
            tooltip="Chi tiết"
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(rec)}
          />
          <ButtonExtend
            tooltip="Chỉnh sửa"
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(rec)}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xoá?"}
            onConfirm={() => {
              deleteModel(rec?._id, getData);
            }}
          >
            <ButtonExtend
              tooltip="Xoá"
              type="link"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <TableBase
        getData={getData}
        title={"Khách vào ra KTX"}
        modelName={"quanlyvaoraktx"}
        columns={columns}
        Form={FormThemMoi as any}
        formProps={{
          getData: getData,
        }}
        widthDrawer={700}
      />
    </>
  );
};
export default QuanLyVaoRaKTXPage;
