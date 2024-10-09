import React from 'react';
import MainImageServices from '@services/MainImageServices';
import Cookies from "js-cookie";
import Layout from '@layout/Layout';

const Landing = ({ mainImage }) => {
    return (
        <Layout isLayout={false}>
            <div className="flex items-center justify-center relative h-[100vh]">
                {mainImage ? (
                    <img
                        src={mainImage?.image_path}
                        alt="Landing Page Image"
                        className="mb-6 rounded-lg w-[90%] h-[90%] object-contain"
                    />
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
            </div>
            <div>
                <div className='flex justify-center items-center mt-5'>ขวัญ, ขวัญเมล็ดพันธุ์โคราช, ขวัญเมล็ดพันธุ์, เมล็ดพันธุ์, การเกษตร, เกษตร, พริก, ข้าวโพด, ถั่ว, มัน, ปุ๋ย</div>
                <div className='flex justify-center items-center mt-5'>ยินดีต้อนรับสู่ ขวัญเมล็ดพันธุ์
                    ขวัญเมล็ดพันธุ์ เปิดให้บริการ มาไม่ต่ำกว่า 30ปี โดยการเริ่มต้น ธุรกิจมาจากเมล็ดพันธุ์ โดย คุณไพบูลย์ สินอนันต์จินดาและได้เข้ามาเริ่มต้นธุรกิจ ในจังหวัด นครราชสีมา โดยเริ่ม
                    ที่ตลาดกลางสุรนารี
                    จำหน่าย สินค้า เมล็ดพันธุ์ผัก อาหารเสริมพืช สารป้องเชื้อราพืชและแมลง ปุ๋ย อุปกรณ์เพาะปลูก ค้าปลีก-ค้าส่ง สินค้าเราคัดสรรคมาอย่างดีมีคุณภาพ ครองใจเกษตกรมาอย่างยาวนาน และเป็นที่รู้จักโดยทั่วไป โดย คำมั่นของทางขวัญเมล็ดพันธุ์ นั้นคือ “เมื่อคุณมั่นใจ เราพร้อมบริการ”</div>
            </div>
        </Layout>
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