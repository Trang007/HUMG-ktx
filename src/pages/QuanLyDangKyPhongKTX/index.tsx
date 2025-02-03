import { useModel } from "umi";
import TableBase from "@/components/Table";
import { IColumn } from "@/components/Table/typing";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import ButtonExtend from "@/components/Table/ButtonExtend";
import {Popconfirm} from "antd";
import FormThemMoi from "./components/FormThemMoi";
import {DangKyPhongKTX} from "@/services/DangKyPhongKTX/typing";

const QuanLyDangKyPhongKTXPage = () => {
  const { getModel,handleEdit,handleView,deleteModel } = useModel("quanlydangkyphongktx");

  const getData = () => {
    getModel(
    );
  };

  const columns: IColumn<DangKyPhongKTX.IRecord>[] = [
    {
      title: "Họ và tên",
      width: 180,
      // filterType:"string",
      render:(val,rec)=>`${rec?.idSinhVien?.hoDem??''} ${rec?.idSinhVien?.ten}`
    },
    {
      title: "CMT/CCCD",
      align: "center",
      // filterType:"string",
      width: 180,
      render:(val,rec)=>`${rec?.idSinhVien?.cmtCccd??''} `
    },
    {
      title: "Phòng đăng ký",

      align: "center",
      width: 120,
      render:(val,rec)=>`${rec?.idPhong?.soPhong??''} `
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
        title={"Đăng ký phòng KTX"}
        modelName={"quanlydangkyphongktx"}
        columns={columns}
        Form={FormThemMoi as any}
        formProps={{
          getData:getData
        }}
        widthDrawer={700}
      />
    </>
  );
};
export default QuanLyDangKyPhongKTXPage;
