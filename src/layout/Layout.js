import Head from "next/head";
import { ToastContainer } from "react-toastify";

//internal import

import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import NavBarTop from "./navbar/NavBarTop";
import FooterTop from "@layout/footer/FooterTop";
import MobileFooter from "@layout/footer/MobileFooter";
import FeatureCard from "@components/feature-card/FeatureCard";

const Layout = ({ title, description, children, imagePreview }) => {
  const queryTime = new Date().getTime();

  return (
    <>
      <ToastContainer />

      <div className="font-sans">
        <Head>
          <title>
            {title
              ? `ขวัญเมล็ดพันธุ์โคราช | ${title}`
              : "ขวัญเมล็ดพันธุ์โคราช"}
          </title>
          {/* {description && <meta name="description" content={description} />} */}
          <link ref="icon" href="/favicon.png" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title}></meta>
          <meta
            property="og:image"
            content={`https://kwanmaledpun.vercel.app/product${imagePreview}?rand=${queryTime}`}
          ></meta>
          <meta
            property="og:image:url"
            content={`https://kwanmaledpun.vercel.app/product${imagePreview}?rand=${queryTime}`}
          ></meta>
          <meta name="description" content={description}></meta>
          <meta property="og:image:width" content="1200"></meta>
          <meta property="og:image:height" content="630"></meta>
          <meta property="og:description" content={description} />
          <meta
          property="og:street-address"
          content="ขวัญเมล็ดพันธุ์ โคราช"
        />
        <meta
          property="og:location"
          content="ขวัญเมล็ดพันธุ์ โคราช"
        />
        </Head>
        <NavBarTop />
        <Navbar />
        <div className="bg-gray-50">{children}</div>
        <MobileFooter />
        <div className="w-full">
          <FooterTop />
          <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
            <FeatureCard />
          </div>
          <hr className="hr-line"></hr>
          <div className="border-t border-gray-100 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
