import { Card } from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { thongKeVaoRaKTX} from "@/services/QuanLyHoaDon";

import MyDateRangePicker from "@/components/MyDatePicker/RangePicker";
import {QuanLyThongTinVaDichVu} from "@/services/QuanLyThongTinVaDichVu/typing";
import TableStaticData from "@/components/Table/TableStaticData";
import {IColumn} from "@/components/Table/typing";

export const ColorBase = ['#007eb9', '#84C318', '#20B2AA', '#F6AF65', '#800000', '#4B0082'];

const ThongKeVaoRaKTXPage = () => {
  const [startDate, setStartDate] = useState<string>(moment().startOf('month').toISOString());
  const [endDate, setEndDate] = useState<string>(moment().endOf('month').toISOString());
  const [dataThongKe, setDataThongKe] = useState<QuanLyThongTinVaDichVu.IThongKe[]>([]);

  const getThongKe = async () => {
    try {
      const res = await thongKeVaoRaKTX(startDate, endDate);
      if (res) {
        setDataThongKe(res?.data?.data??[]);
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
  const columns: IColumn<VaoRaKTX.IThongKe>[] = [
    {
      title: "Họ và tên",
      width: 120,
      render: (val, rec) =>
        `${rec?.thongTinSinhVien?.hoDem ?? ""} ${rec?.thongTinSinhVien?.ten}`,
    },
    {
      title: "CCCD/CMT",
      width: 120,
      align:'center',
      render: (val, rec) =>
        `${rec?.thongTinSinhVien?.cmtCccd ?? ""}`,
    },
    {
      title: "Khách",
      width: 320,
      render: (val, rec) =>
      {
        return(
          <>
            {rec?.danhSachKhach?.map((item)=>{
              return <div>{item?.hoTen} ({item?.cmtCccd}) - {item?.soLanDen} lần</div>
            })}
          </>
        )
      }
    },
  ];
  useEffect(() => {
    getThongKe();
  }, [startDate, endDate]);

  return (
    <>
      <Card title={"Khách vào ra KTX"}>

        <MyDateRangePicker
          style={{ width: 300, marginRight: 8 }}
          value={[moment(startDate),moment(endDate)]}

          format={"DD/MM/YYYY"}
          onChange={(val) => {
            setStartDate(moment(val?.[0]).toISOString())
            setEndDate(moment(val?.[1]).toISOString())
          }}
        />

        {/*<DonutChart*/}
        {/*  xAxis={['Dịch vụ','Gửi xe','Vé xe','Thuê phòng']}*/}
        {/*  yAxis={[[sumDichVu,sumGuiXe,sumVeXe,sumThuePhong]]}*/}
        {/*  yLabel={['']}*/}
        {/*  height={280}*/}
        {/*  formatY={(val) => inputFormat(val ?? 0) + ' VNĐ'}*/}
        {/*  colors={ColorBase}*/}
        {/*  showTotal*/}
        {/*/>*/}
        <TableStaticData addStt data={dataThongKe??[]} columns={columns}/>
      </Card>
    </>
  );
};
export default ThongKeVaoRaKTXPage;
