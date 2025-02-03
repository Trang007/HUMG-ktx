import DonutChart from "@/components/Chart/DonutChart";
import formWaiting from "@/components/Loading/FormWaiting";
import MyDatePicker from "@/components/MyDatePicker";
import ButtonExtend from "@/components/Table/ButtonExtend";
import TableStaticData from "@/components/Table/TableStaticData";
import { IColumn } from "@/components/Table/typing";
import { thongKeHoaDon, xuatHoaDon } from "@/services/QuanLyHoaDon";
import { getFilenameHeader, inputFormat } from "@/utils/utils";
import { DownloadOutlined } from "@ant-design/icons";
import { Card, Col, Modal, Row, Select } from "antd";
import fileDownload from "js-file-download";
import moment from "moment/moment";
import { useEffect, useState } from "react";

export const ColorBase = ["#007eb9", "#84C318", "#20B2AA", "#F6AF65", "#800000", "#4B0082"];

const ThongKeHoaDonPage = () => {
  const [currentThang, setCurrentThang] = useState<number>(moment().month());
  const [currentNam, setCurrentNam] = useState<number>(moment().year());
  const [dataThongKe, setDataThongKe] = useState<QuanLyHoaDon.IThongKe[]>([]);

  const getThongKe = async () => {
    try {
      const res = await thongKeHoaDon(currentThang, currentNam);
      if (res) {
        setDataThongKe(res?.data?.data ?? []);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sumDichVu = dataThongKe?.reduce((accumulator, currentValue) => accumulator + currentValue?.dichVu, 0);
  const sumGuiXe = dataThongKe?.reduce((accumulator, currentValue) => accumulator + currentValue?.guiXe, 0);
  const sumVeXe = dataThongKe?.reduce((accumulator, currentValue) => accumulator + currentValue?.veXe, 0);
  const sumThuePhong = dataThongKe?.reduce((accumulator, currentValue) => accumulator + currentValue?.thuePhong, 0);

  const columns: IColumn<QuanLyHoaDon.IThongKe>[] = [
    {
      title: "Họ và tên",
      width: 120,
      render: (val, rec) => `${rec?.sinhVien?.hoDem ?? ""} ${rec?.sinhVien?.ten}`,
    },
    {
      title: "Phí gửi xe",
      width: 120,
      align: "right",
      dataIndex: "guiXe",
      render: (val, rec) => `${inputFormat(val)} VNĐ`,
    },
    {
      title: "Phí vé xe",
      width: 120,
      align: "right",
      dataIndex: "veXe",
      render: (val, rec) => `${inputFormat(val)} VNĐ`,
    },
    {
      title: "Phí thuê phòng",
      width: 120,
      align: "right",
      dataIndex: "thuePhong",
      render: (val, rec) => `${inputFormat(val)} VNĐ`,
    },
    {
      title: "Phí dịch vụ",
      width: 120,
      align: "right",
      dataIndex: "dichVu",
      render: (val, rec) => `${inputFormat(val)} VNĐ`,
    },
  ];

  const handleXuatHoaDon = async () => {
    try {
      formWaiting("Hệ thống đang xử lý");
      const res = await xuatHoaDon(currentThang + 1, currentNam);
      if (res) {
        fileDownload(res?.data, getFilenameHeader(res));
      }
    } catch (e) {
      console.log(e);
    } finally {
      Modal.destroyAll();
    }
  };

  useEffect(() => {
    getThongKe();
  }, [currentNam, currentThang]);

  return (
    <>
      <Card title={"Hoá đơn"}>
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
        <Row gutter={[12, 12]} style={{ marginTop: 8 }}>
          <Col span={8}>
            <DonutChart
              xAxis={["Dịch vụ", "Gửi xe", "Vé xe", "Thuê phòng"]}
              yAxis={[[sumDichVu, sumGuiXe, sumVeXe, sumThuePhong]]}
              yLabel={[""]}
              height={280}
              formatY={(val) => inputFormat(val ?? 0) + " VNĐ"}
              colors={ColorBase}
              showTotal
            />
          </Col>
          <Col span={16}>
            <TableStaticData addStt data={dataThongKe ?? []} columns={columns} />
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default ThongKeHoaDonPage;
