import React from 'react';
import MainImageServices from '@services/MainImageServices';
import Cookies from "js-cookie";
import Layout from '@layout/Layout';
import CMSkeleton from "@components/preloader/CMSkeleton";
import FooterTop from "@layout/footer/FooterTop";
import FeatureCard from "@components/feature-card/FeatureCard";
import Footer from "@layout/footer/Footer";
import { storeCustomization } from "@utils/storeCustomizationSetting";

const Landing = ({ mainImage }) => {

    const storeCustomizationSetting = storeCustomization.setting;

    return (
        <>
            <Layout isLayout={false}>
                <div className="relative h-[100vh]">
                    {mainImage ? (
                        <div className='flex items-center justify-center h-full'>
                            <img
                                src={mainImage?.image_path}
                                alt="Landing Page Image"
                                className="mb-6 rounded-lg w-[90%] h-[90%] object-contain"
                            />
                        </div>
                    ) : (
                        <div>No image found</div>
                    )}
                    <div className='fixed bottom-[30px] w-full flex justify-center items-center !z-50'>
                        <button
                            className="w-[200px] text-[24px] px-6 py-2 text-emerald-500 border bg-white border-emerald-500 rounded hover:bg-emerald-500 hover:text-white transition duration-300"
                            onClick={() => {
                                Cookies.set('mainImage', '1', { expires: 1 })
                                window.location.href = '/'
                            }}
                        >
                            เข้าสู่เว็บไซต์
                        </button>
                    </div>
                    <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
                        <div className="grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-16 items-center">
                            <div className="bg-slate-50 rounded-lg p-4">
                                <h3 className="text-xl mb-2 font-serif font-semibold">
                                    <CMSkeleton
                                        count={1}
                                        height={50}
                                        data={storeCustomizationSetting?.about_us?.top_title}
                                    />
                                </h3>
                                <div className="mt-3 text-base opacity-90 leading-7">
                                    <p>
                                        <CMSkeleton
                                            count={5}
                                            height={20}
                                            data={storeCustomizationSetting?.about_us?.top_description}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4">ขวัญ, ขวัญเมล็ดพันธุ์โคราช, ขวัญเมล็ดพันธุ์, เมล็ดพันธุ์, การเกษตร, เกษตร, พริก, ข้าวโพด, ถั่ว, มัน, ปุ๋ย</div>
                        </div>
                    </div>
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
            </Layout>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const { cookies } = context.req;

    const mainImage = await MainImageServices.getMainImageAll();
    const mainImageFilter = mainImage.filter((item) => item.flag === 100);
    if (mainImageFilter.length === 0) {
        // context.res.writeHead(302, { Location: '/' });
        // context.res.end();
    }
    return {
        props: {
            cookies: cookies,
            mainImage: mainImageFilter[0],
        },
    };
};

export default Landing;