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
          <link rel="icon" href={setting?.favicon || "/favicon.png"} />
          <meta
            property="og:title"
            content={
              setting?.meta_title ||
              "ขวัญเมล็ดพันธุ์โคราช"
            }
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content={
              setting?.meta_description ||
              "ขวัญเมล็ดพันธุ์โคราช"
            }
          />
          <meta
            name="keywords"
            content={setting?.meta_keywords || "ecommenrce online store"}
          />
          <meta property="og:url" content="https://kwanmaledpun.vercel.app/kwanmaledpun/upload/product/1725009456228-454233636_802294938687264_6357348775603017516_n.jpg"/>
          <meta property="og:image" content="https://kwanmaledpun.vercel.app/kwanmaledpun/upload/product/1725009456228-454233636_802294938687264_6357348775603017516_n.jpg"/>
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
