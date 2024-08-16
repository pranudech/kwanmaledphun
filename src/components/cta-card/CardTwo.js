import React from "react";
import Image from "next/image";
import Link from "next/link";

import { storeCustomization } from "@utils/storeCustomizationSetting";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CardTwo = () => {
  const { storeCustomizationSetting: tempString, error, loading } = useGetSetting();
  const storeCustomizationSetting = storeCustomization.setting;
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <div className="w-full bg-white shadow-sm lg:px-10 lg:py-5 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="lg:w-3/5">
            <h2 className="font-serif text-lg lg:text-2xl font-bold mb-1">
              <CMSkeleton
                count={1}
                height={20}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.quick_delivery_subtitle}
              />
            </h2>
            <h2 className="text-base lg:text-lg">
              <CMSkeleton
                count={1}
                height={30}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.quick_delivery_title}
              />
            </h2>
            <p className="text-sm font-sans leading-6">
              ☎️ สั่งมาได้เลย พร้อมจัดส่งครับ🛒 <br />
              (ส่งของทุกวัน)❗️ <br />
              🚚ปลีก-ส่งราคาถูกเป็นกันเอง <br />
              📥FB:Inbox: <a className="text-blue-500 hover:text-blue-600 underline" href="https://m.me/kwanseed/?ref=bookmarks">https://m.me/kwanseed/?ref=bookmarks</a> <br />
              📱สายด่วน❗️<a className="text-blue-500 hover:text-blue-600 underline" href="tel:064-450-0005">064-450-0005</a> <br />
              ☎️สอบถาม <a className="text-blue-500 hover:text-blue-600 underline" href="tel:044-342371">044-342371</a> <br />
              🆔ไลน์แอด : <a className="text-blue-500 hover:text-blue-600 underline" href="https://line.me/ti/p/~@kwanmaledpunkorat">kwanmaledpunkorat</a>
            </p>
          </div>
          <div className="w-1/5 flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-end">
            <Image
              width={373}
              height={250}
              alt="Quick Delivery to Your Home"
              className="block w-auto object-contain"
              src={
                storeCustomizationSetting?.home?.quick_delivery_img ||
                "/cta/delivery-boy.png"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTwo;
