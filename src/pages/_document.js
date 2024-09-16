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
          <meta property="og:title" content={"ขวัญเมล็ดพันธุ์โคราช"} />
          <meta property="og:type" content="eCommerce Website" />
          <meta property="og:description" content={setting?.meta_description || "ขวัญเมล็ดพันธุ์ โคราชเปิดให้บริการมาตั้งแต่ พ.ศ. 2543 จำหน่ายเมล็ดพันธุ์ผัก อาหารเสริมพืช สารป้องกันแมลง และปุ๋ยค้าปลีก-ส่ง สินค้าของเราคัดสรรมาอย่างดีเพื่อให้ได้คุณภาพและผลผลิตที่ดีที่สุดสำหรับพืชของคุณ ไม่ว่าคุณจะเป็นชาวสวนที่บ้านหรือเกษตรกรมืออาชีพ เรามีทุกสิ่งที่คุณต้องการเพื่อปลูกพืชที่แข็งแรงและให้ผลผลิตดี ช้อปกับเราและสัมผัสประสบการณ์ที่ดีที่สุดในผลิตภัณฑ์การเกษตรและการบริการลูกค้า"} />
          <meta name="keywords" content={setting?.meta_keywords || "ขวัญ, ขวัญเมล็ดพันธุ์โคราช, ขวัญเมล็ดพันธุ์, เมล็ดพันธุ์, การเกษตร, เกษตร, พริก, ข้าวโพด, ถั่ว, มัน, ปุ๋ย"} />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}/logo.png`} />
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
