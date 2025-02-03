import { Col, Row } from "antd";
import "./components/style.less";
import ThongKeHoaDonPage from "@/pages/TrangChu/ThongKeHoaDon";
import ThongKeSuDungDichVuPage from "@/pages/TrangChu/ThongKeSuDungDichVu";
import ThongKeVaoRaKTXPage from "@/pages/TrangChu/VaoRaKTX";

const TrangChu = () => {
  return (
    <>
     <Row gutter={[12,12]}>
       <Col span={24}>
         <ThongKeHoaDonPage />

       </Col>
       <Col span={24}>
         <ThongKeSuDungDichVuPage />
       </Col> <Col span={24}>
         <ThongKeVaoRaKTXPage />
       </Col>
     </Row>
    </>
  );
};

export default TrangChu;
