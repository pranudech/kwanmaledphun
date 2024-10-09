import SettingServices from "@services/SettingServices";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Fetch general metadata from backend API
    const setting = await SettingServices.getStoreSeoSetting();

    return { ...initialProps, setting };
  }

  render() {
    const setting = this.props.setting;

    return (
      <Html lang="th">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="keywords" content={setting?.meta_keywords || "ขวัญ, ขวัญเมล็ดพันธุ์โคราช, ขวัญเมล็ดพันธุ์, เมล็ดพันธุ์, การเกษตร, เกษตร, พริก, ข้าวโพด, ถั่ว, มัน, ปุ๋ย"} />
          {/* <meta property="og:title" content={"ขวัญเมล็ดพันธุ์โคราช"} /> */}
          {/* <meta property="og:type" content="website" /> */}
          {/* <meta property="og:description" content={`${setting?.meta_description || `ยินดีต้อนรับสู่ ขวัญเมล็ดพันธุ์
            ขวัญเมล็ดพันธุ์ เปิดให้บริการ มาไม่ต่ำกว่า 30ปี โดยการเริ่มต้น ธุรกิจมาจากเมล็ดพันธุ์ โดย คุณไพบูลย์ สินอนันต์จินดาและได้เข้ามาเริ่มต้นธุรกิจ ในจังหวัด นครราชสีมา โดยเริ่ม 
            ที่ตลาดกลางสุรนารี   
            จำหน่าย สินค้า เมล็ดพันธุ์ผัก อาหารเสริมพืช สารป้องเชื้อราพืชและแมลง ปุ๋ย อุปกรณ์เพาะปลูก ค้าปลีก-ค้าส่ง สินค้าเราคัดสรรคมาอย่างดีมีคุณภาพ ครองใจเกษตกรมาอย่างยาวนาน และเป็นที่รู้จักโดยทั่วไป โดย คำมั่นของทางขวัญเมล็ดพันธุ์ นั้นคือ “เมื่อคุณมั่นใจ เราพร้อมบริการ”`}`} /> */}
          {/* <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} /> */}
          {/* <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}/logo.png`} /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
