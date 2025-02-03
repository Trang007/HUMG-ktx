import { useModel } from "umi";
import TableBase from "@/components/Table";
import { IColumn } from "@/components/Table/typing";
import { HoSoSinhVien } from "@/services/QuanLyHoSoSinhVien/typing";
import moment from "moment/moment";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import ButtonExtend from "@/components/Table/ButtonExtend";
import {Popconfirm} from "antd";
import FormThemMoi from "@/pages/QuanLyHoSoSinhVien/components/FormThemMoi";

const QuanLyHoSinhVienPage = () => {
  const { getModel,handleEdit,handleView,deleteModel } = useModel("quanlyhososinhvien");

  const getData = () => {
    getModel(
      { systemRole: "SinhVien" },
      undefined,
      undefined,
      undefined,
      undefined,
      "pageable"
    );
  };

  const columns: IColumn<HoSoSinhVien.IRecord>[] = [
    {
      title: "Họ và tên",
      dataIndex: "hoDem",
      width: 180,
      filterType:"string",
      render: (val, rec) => `${val} ${rec?.ten}`,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      width: 120,
      align: "center",
      render: (val) => (val ? moment(val).format("DD/MM/YYYY") : ""),
    },
    {
      title: "CMT/CCCD",
      dataIndex: "cmtCccd",
      align: "center",
      filterType:"string",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      width: 120,
    },
    {
      title: "Quê quán",
      dataIndex: "queQuan",
      width: 250,
    },
    {
      title: "Lớp",
      dataIndex: "lop",
      align:'center',
      width: 120,
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
         <Popconfirm title={"Bạn có chắc chắn muốn xoá?"} onConfirm={()=>{
           deleteModel(rec?._id,getData)
         }}>
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
        title={"Hồ sơ sinh viên"}
        modelName={"quanlyhososinhvien"}
        columns={columns}
        Form={FormThemMoi as any}
        formProps={{
          title:'Sinh viên',
          getData:getData
        }}
        widthDrawer={700}
      />
    </>
  );
};
export default QuanLyHoSinhVienPage;
