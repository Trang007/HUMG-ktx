import { Card, Col, Row } from "antd";
import MyDatePicker from "@/components/MyDatePicker";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import {
  thongKeSuDungDichVu,
  thongKeSuDungDichVuNam,
} from "@/services/QuanLyHoaDon";
import { inputFormat } from "@/utils/utils";
import MyDateRangePicker from "@/components/MyDatePicker/RangePicker";
import { QuanLyThongTinVaDichVu } from "@/services/QuanLyThongTinVaDichVu/typing";
import TableStaticData from "@/components/Table/TableStaticData";
import { IColumn } from "@/components/Table/typing";

export const ColorBase = [
  "#007eb9",
  "#84C318",
  "#20B2AA",
  "#F6AF65",
  "#800000",
  "#4B0082",
];

const ThongKeSuDungDichVuPage = () => {
  const [startDate, setStartDate] = useState<string>(
    moment().startOf("month").toISOString()
  );
  const [endDate, setEndDate] = useState<string>(
    moment().endOf("month").toISOString()
  );
  const [dataThongKe, setDataThongKe] = useState<
    QuanLyThongTinVaDichVu.IThongKe[]
  >([]);
  const [dataThongKe2, setDataThongKe2] = useState<
    QuanLyThongTinVaDichVu.IThongKe2[]
  >([]);
  const [currentNam, setCurrentNam] = useState<number>(moment().year());

  const getThongKe = async () => {
    try {
      const res = await thongKeSuDungDichVu(startDate, endDate);
      if (res) {
        setDataThongKe(res?.data?.data??[]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getThongKeNam = async () => {
    try {
      const res = await thongKeSuDungDichVuNam(currentNam);
      if (res) {
        setDataThongKe2(res?.data?.data ?? []);
        // setDataThongKe(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const sumDichVu=dataThongKe?.reduce((accumulator, currentValue) => accumulator + currentValue?.dichVu,
  //   0,)
  // const sumGuiXe=dataThongKe?.reduce((accumulator, currentValue) => accumulator + currentValue?.guiXe,
  //   0,)
  // const sumVeXe=dataThongKe?.reduce((accumulator, currentValue) => accumulator + currentValue?.veXe,
  //   0,)
  // const sumThuePhong=dataThongKe?.reduce((accumulator, currentValue) => accumulator + currentValue?.thuePhong,
  //   0,)
  const columns: IColumn<QuanLyThongTinVaDichVu.IThongKe>[] = [
    {
      title: "Họ và tên",
      width: 120,
      render: (val, rec) =>
        `${rec?.thongTinSinhVien?.hoDem ?? ""} ${rec?.thongTinSinhVien?.ten}`,
    },
    {
      title: "CCCD/CMT",
      width: 120,
      align: "center",
      render: (val, rec) => `${rec?.thongTinSinhVien?.cmtCccd ?? ""}`,
    },
    {
      title: "Dịch vụ sử dụng",
      width: 320,
      render: (val, rec) => {
        return (
          <>
            {rec?.danhSachDichVu?.map((item) => {
              return (
                <div>
                  {item?.thongTinDichVu?.tenDichVu} -{" "}
                  {inputFormat(item?.thongTinDichVu?.donGia)} VNĐ
                </div>
              );
            })}
          </>
        );
      },
    },
  ];
  const columns2: IColumn<QuanLyThongTinVaDichVu.IThongKe2>[] = [
    {
      title: "Tên dịch vụ",
      width: 120,
      render: (val, rec) => `${rec?.thongTinDichVu?.tenDichVu ?? ""}`,
    },
    {
      title: "Doanh thu",
      width: 120,
      align:'right',
      render: (val, rec) => `${inputFormat(rec?.tongDoanhThu)} VNĐ`,
    },
  ];
  useEffect(() => {
    getThongKe();

  }, [startDate, endDate]);

  useEffect(()=>{
    getThongKeNam();
  },[currentNam])

  return (
    <>
      <Card title={"Dịch vụ"}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <MyDateRangePicker
              style={{ width: 300, marginRight: 8 }}
              value={[moment(startDate), moment(endDate)]}
              format={"DD/MM/YYYY"}
              onChange={(val) => {
                setStartDate(moment(val?.[0]).toISOString());
                setEndDate(moment(val?.[1]).toISOString());
              }}
            />
            <TableStaticData addStt data={dataThongKe??[]} columns={columns} />
          </Col>
          <Col span={12}>
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
            <TableStaticData addStt data={dataThongKe2??[]} columns={columns2} />
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default ThongKeSuDungDichVuPage;
