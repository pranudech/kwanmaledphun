import React, { useState } from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

//internal import

import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import NavBarTop from "./navbar/NavBarTop";
import FooterTop from "@layout/footer/FooterTop";
import MobileFooter from "@layout/footer/MobileFooter";
import FeatureCard from "@components/feature-card/FeatureCard";
import Cookies from 'js-cookie';

const Layout = ({ title, description, children, imagePreview, isLayout = true }) => {
  const queryTime = new Date().getTime();

  const [cookieConsent, setCookieConsent] = useState(Cookies.get('consent') === 'true');
  const handleCookieConsent = () => {
    Cookies.set('consent', 'true', { expires: 1 });
    setCookieConsent(true);
  };
  return (
    <>
      <ToastContainer />

      <div className="font-sans relative">
        <Head>
          <title>
            {title
              ? `ขวัญเมล็ดพันธุ์โคราช | ${title}`
              : "ขวัญเมล็ดพันธุ์โคราช"}
          </title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title}></meta>
          <meta name="description" content={description}></meta>
          <meta property="og:image:width" content="1200"></meta>
          <meta property="og:image:height" content="630"></meta>
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/logo.jpg`} />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}${imagePreview}`} />
          <meta property="og:description" content={description} />
          <meta name="keywords" content={"ขวัญ, ขวัญเมล็ดพันธุ์โคราช, ขวัญเมล็ดพันธุ์, เมล็ดพันธุ์, การเกษตร, เกษตร, พริก, ข้าวโพด, ถั่ว, มัน, ปุ๋ย"} />
          <meta property="og:site_name" content="ขวัญเมล็ดพันธุ์โคราช" />
          <meta property="og:street-address" content="ขวัญเมล็ดพันธุ์โคราช" />
          <meta property="og:location" content="ขวัญเมล็ดพันธุ์โคราช" />
        </Head>

        {isLayout ? (
          <>
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

            {!cookieConsent && (
              <div className="z-20 fixed bottom-5 left-0 w-full h-10 bg-transparent flex justify-center items-center">
                <p className="text-center text-[16px] text-white min-w-max  bg-emerald-500 rounded-lg p-2">
                  เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณบนเว็บไซต์นี้ คุณยินยอมให้เราใช้คุกกี้หรือไม่?
                  <button className="bg-white text-emerald-500 px-4 py-2 rounded-lg ml-4"
                    onClick={() => handleCookieConsent()}>ยินยอม</button>
                </p>
              </div>
            )}
          </>
        ) : <>
          <div className="bg-gray-50 h-[100vh]">{children}</div>
          {/* <MobileFooter /> */}
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
        </>}

      </div>
    </>
  );
};

export default Layout;
