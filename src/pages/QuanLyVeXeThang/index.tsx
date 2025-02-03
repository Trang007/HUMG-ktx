import { useModel } from "umi";
import TableBase from "@/components/Table";
import { IColumn } from "@/components/Table/typing";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ButtonExtend from "@/components/Table/ButtonExtend";
import { Popconfirm } from "antd";
import FormThemMoi from "./components/FormThemMoi";

const QuanLyVeXeThangPage = () => {
  const { getModel, handleEdit, handleView, deleteModel } = useModel("quanlyvexe");

  const getData = () => {
    getModel();
  };

  const columns: IColumn<QuanLyVeXe.IRecord>[] = [
    {
      title: "Họ và tên",
      width: 120,
      render: (val, rec) => `${rec?.idSinhVien?.hoDem ?? ""} ${rec?.idSinhVien?.ten}`,
    },
    {
      title: "CMT/CCCD",
      align: "center",
      width: 120,
      render: (val, rec) => `${rec?.idSinhVien?.cmtCccd ?? ""}`,
    },
    {
      title: "Biển số xe",
      align: "center",
      width: 120,
      render: (val, rec) => `${rec?.idXe?.bienSo ?? ""}`,
    },
    {
      title: "Tháng",
      align: "center",
      dataIndex: "thang",
      render: (month) => `Tháng ${month + 1}`,
      width: 120,
    },
    {
      title: "Năm",
      align: "center",
      dataIndex: "nam",
      width: 120,
    },

    {
      title: "Thao tác",
      align: "center",
      width: 90,
      render: (val, rec) => (
        <>
          <ButtonExtend tooltip="Chi tiết" type="link" icon={<EyeOutlined />} onClick={() => handleView(rec)} />
          <ButtonExtend tooltip="Chỉnh sửa" type="link" icon={<EditOutlined />} onClick={() => handleEdit(rec)} />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xoá?"}
            onConfirm={() => {
              deleteModel(rec?._id, getData);
            }}
          >
            <ButtonExtend tooltip="Xoá" type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <TableBase
        getData={getData}
        title={"Vé xe tháng"}
        modelName={"quanlyvexe"}
        columns={columns}
        Form={FormThemMoi as any}
        formProps={{
          title: "Vé xe",
          getData: getData,
        }}
        widthDrawer={700}
      />
    </>
  );
};
export default QuanLyVeXeThangPage;
