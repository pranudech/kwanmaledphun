import React from 'react';
import MainImageServices from '@services/MainImageServices';
import Cookies from "js-cookie";
const Landing = ({ mainImage }) => {
    console.log(mainImage)
    return (
        <div className="flex flex-col items-center justify-center relative pb-[100px]">
            <img
                src={mainImage.image_path}
                alt="Landing Page Image"
                className="mb-6 rounded-lg shadow-lg max-h-[10%]"
            />
            <div className='fixed bottom-[30px] w-full flex justify-center items-center'>
                <button
                    className="px-6 py-2 text-emerald-500 border bg-white border-emerald-500 rounded hover:bg-emerald-500 hover:text-white transition duration-300"
                    onClick={() => {
                        Cookies.set('mainImage', '1', { expires: 1 })
                        window.location.href = '/'
                    }}
                >
                    เข้าสู่เว็บไซต์
                </button>
            </div>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const { cookies } = context.req;

    const mainImage = await MainImageServices.getMainImageAll();
    const mainImageFilter = mainImage.filter((item) => item.flag === 100);
    if (mainImageFilter.length === 0) {
        context.res.writeHead(302, { Location: '/' });
        context.res.end();
    }
    return {
        props: {
            cookies: cookies,
            mainImage: mainImageFilter[0],
        },
    };
};

export default Landing;