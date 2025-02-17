import formWaiting from "@/components/Loading/FormWaiting";
import MyDatePicker from "@/components/MyDatePicker";
import TableBase from "@/components/Table";
import ButtonExtend from "@/components/Table/ButtonExtend";
import { IColumn } from "@/components/Table/typing";
import { xuatHoaDon } from "@/services/QuanLyHoaDon";
import { ETrangThaiThanhToan, MapColorETrangThaiThanhToan } from "@/services/QuanLyHoaDon/constants";
import { getFilenameHeader, inputFormat } from "@/utils/utils";
import { CheckOutlined, DownloadOutlined, RollbackOutlined } from "@ant-design/icons";
import { Modal, Popconfirm, Select, Tag } from "antd";
import fileDownload from "js-file-download";
import moment from "moment";
import { useState } from "react";
import { useModel } from "umi";

const QuanLyHoaDonPage = () => {
  const { getModel, page, limit, condition, putModel } = useModel("quanlyhoadon");

  const [currentThang, setCurrentThang] = useState<number>(moment().month());
  const [currentNam, setCurrentNam] = useState<number>(moment().year());

  const getData = () => {
    getModel({ thang: currentThang, nam: currentNam });
  };

  const columns: IColumn<QuanLyHoaDon.IRecord>[] = [
    {
      title: "Họ và tên",
      width: 180,
      // filterType:"string",
      render: (val, rec) => `${rec?.idSinhVien?.hoDem ?? ""} ${rec?.idSinhVien?.ten}`,
    },
    {
      title: "CMT/CCCD",
      align: "center",
      // filterType:"string",
      width: 180,
      render: (val, rec) => `${rec?.idSinhVien?.cmtCccd ?? ""} `,
    },
    {
      title: "Hoá đơn",
      dataIndex: "loaiHoaDon",
      align: "center",
      width: 120,
    },
    {
      title: "Tháng",
      dataIndex: "thang",
      align: "center",
      width: 120,
      render: (val, rec) => `Tháng ${rec?.thang + 1}`,
    },
    {
      title: "Năm",
      dataIndex: "nam",
      align: "center",
      width: 120,
    },

    {
      title: "Số lượng",
      dataIndex: "soLuong",
      align: "center",
      width: 120,
      render: (val) => inputFormat(val ?? 0),
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhTien",
      align: "right",
      width: 120,
      render: (val) => `${inputFormat(val ?? 0)} VNĐ`,
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "trangThaiThanhToan",
      align: "center",
      width: 120,
      render: (val) => (val ? <Tag color={MapColorETrangThaiThanhToan?.[val as ETrangThaiThanhToan]}>{val}</Tag> : ""),
      fixed: "right",
    },
    {
      title: "Thao tác",
      align: "center",
      width: 90,
      render: (val, rec) => (
        <>
          <Popconfirm
            title={"Xác nhận hoàn tác lại thanh toán hóa đơn?"}
            onConfirm={() => {
              putModel(rec?._id, { trangThaiThanhToan: ETrangThaiThanhToan.CHUA_THANH_TOAN }, getData);
            }}
          >
            <ButtonExtend
              disabled={rec?.trangThaiThanhToan === ETrangThaiThanhToan.CHUA_THANH_TOAN}
              tooltip="Hoàn tác"
              type="link"
              icon={<RollbackOutlined />}
            />
          </Popconfirm>
          <Popconfirm
            title={"Xác nhận đã thanh toán thành công hóa đơn?"}
            onConfirm={() => {
              putModel(rec?._id, { trangThaiThanhToan: ETrangThaiThanhToan.THANH_TOAN_DU }, getData);
            }}
          >
            <ButtonExtend
              disabled={rec?.trangThaiThanhToan === ETrangThaiThanhToan.THANH_TOAN_DU}
              tooltip="Đã thanh toán"
              type="link"
              className="text-success"
              icon={<CheckOutlined />}
            />
          </Popconfirm>
        </>
      ),
      fixed: "right",
    },
  ];

  const handleXuatHoaDon = async () => {
    try {
      formWaiting("Hệ thống đang xử lý");
      const res = await xuatHoaDon(currentThang, currentNam);
      if (res) {
        fileDownload(res?.data, getFilenameHeader(res));
      }
    } catch (e) {
      console.log(e);
    } finally {
      Modal.destroyAll();
    }
  };

  return (
    <>
      <TableBase
        getData={getData}
        title={"Hoá đơn"}
        modelName={"quanlyhoadon"}
        columns={columns}
        dependencies={[currentThang, currentNam, page, limit, condition]}
        buttons={{ create: false }}
        // Form={FormThemMoi as any}
        // formProps={{
        //   title:'Sinh viên',
        //   getData:getData
        // }}
        // widthDrawer={700}
      >
        <Select
          style={{ width: 120, marginRight: 8 }}
          value={currentThang + 1}
          onChange={(value) => {
            setCurrentThang(value - 1);
          }}
          placeholder={"Chọn tháng"}
          options={Array.from({ length: 12 }, (_, index) => index + 1)?.map((val) => ({
            value: val,
            label: `Tháng ${val}`,
          }))}
        />

        <MyDatePicker
          style={{ width: 120, marginRight: 8 }}
          value={moment().set({ year: currentNam })}
          pickerStyle={"year"}
          format={"YYYY"}
          onChange={(val) => {
            const year = moment(val).year();
            setCurrentNam(year);
          }}
        />
        <ButtonExtend
          icon={<DownloadOutlined />}
          tooltip={"Xuất hoá đơn"}
          onClick={() => {
            handleXuatHoaDon();
          }}
        >
          Xuất hoá đơn
        </ButtonExtend>
      </TableBase>
    </>
  );
};
export default QuanLyHoaDonPage;
