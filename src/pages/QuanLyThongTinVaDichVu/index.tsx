import { useModel } from "umi";
import TableBase from "@/components/Table";
import { IColumn } from "@/components/Table/typing";
import moment from "moment/moment";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ButtonExtend from "@/components/Table/ButtonExtend";
import { Popconfirm } from "antd";
import FormThemMoi from "./components/FormThemMoi";
import { QuanLyThongTinVaDichVu } from "@/services/QuanLyThongTinVaDichVu/typing";
import { inputFormat } from "@/utils/utils";

const QuanLyThongTinVaDichVuPage = () => {
  const { getModel, handleEdit, handleView, deleteModel } = useModel("quanlythongtinvadichvu");

  const getData = () => {
    getModel();
  };

  const columns: IColumn<QuanLyThongTinVaDichVu.IRecord>[] = [
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
      title: "Dịch vụ đăng ký",
      align: "center",
      width: 120,
      render: (val, rec) => `${rec?.idDichVu?.tenDichVu ?? ""}`,
    },
    {
      title: "Đơn giá dịch vụ",
      align: "right",
      width: 120,
      render: (val, rec) => `${inputFormat(rec?.idDichVu?.donGia ?? 0)} VNĐ`,
    },
    {
      title: "Thời gian bắt đầu sử dụng",
      align: "center",
      dataIndex: "thoiGianBatDauSuDung",
      width: 120,
      render: (val, rec) => (val ? `${moment(val).format("DD/MM/YYYY")}` : ""),
    },
    {
      title: "Thời gian kết thúc sử dụng",
      align: "center",
      dataIndex: "thoiGianKetThucSuDung",
      width: 120,
      render: (val, rec) => (val ? `${moment(val).format("DD/MM/YYYY")}` : ""),
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
        title={"Thông tin và dịch vụ"}
        modelName={"quanlythongtinvadichvu"}
        columns={columns}
        Form={FormThemMoi as any}
        formProps={{
          title: "Dịch vụ",
          getData: getData,
        }}
        widthDrawer={700}
      />
    </>
  );
};
export default QuanLyThongTinVaDichVuPage;
