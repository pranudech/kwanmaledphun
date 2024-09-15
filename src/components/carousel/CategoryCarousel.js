import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

//internal import
import useAsync from "@hooks/useAsync";
import { SidebarContext } from "@context/SidebarContext";
import CategoryServices from "@services/CategoryServices";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CategoryCarousel = ({ subtypeList, type_id }) => {
  const router = useRouter();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { showingTranslateValue } = useUtilsFunction();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  // const { data, error } = useAsync(() => CategoryServices.getSubType(type_id));
  const data = subtypeList;

  const handleCategoryClick = (id, name) => {
    router.push(`/search?category=${name}&id=${id}&type_id=${type_id}`);
    setIsLoading(!isLoading);
  };

  return (
    <>
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={8}
        navigation={true}
        allowTouchMove={false}
        // loop={data?.length > 6}
        breakpoints={{
          // when window width is >= 640px
          375: {
            width: 375,
            slidesPerView: 2,
          },
          // when window width is >= 768px
          414: {
            width: 414,
            slidesPerView: 3,
          },
          // when window width is >= 768px
          660: {
            width: 660,
            slidesPerView: 4,
          },

          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 6,
          },

          // when window width is >= 768px
          991: {
            width: 991,
            slidesPerView: 8,
          },

          // when window width is >= 768px
          1140: {
            width: 1140,
            slidesPerView: 9,
          },
          1680: {
            width: 1680,
            slidesPerView: 10,
          },
          1920: {
            width: 1920,
            slidesPerView: 10,
          },
        }}
        modules={[Navigation]}
        className="mySwiper category-slider my-10"
      >
        <div>
          {data?.map((category, i) => {
            // console.log(category);
            return (
              <SwiperSlide key={i + category?.subtype_id} className="group">
                <div
                  onClick={() =>
                    handleCategoryClick(category?.subtype_id, category.subtype_name)
                  }
                  className="text-center cursor-pointer p-3 bg-white rounded-lg"
                >
                  <div className="bg-white p-2 mx-auto w-[50px] h-[50px] rounded-full shadow-md flex justify-center items-center">
                    <div className="relative">
                      <image
                        src={category?.icon || "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"}
                        alt="category"
                        className="object-fill w-[35px] h-[35px]"
                      />
                    </div>
                  </div>

                  <h3 className="text-[16px] text-gray-600 mt-2 group-hover:text-emerald-500">
                    {category.subtype_name}
                  </h3>
                </div>
              </SwiperSlide>
            )
          })}
        </div>

        <button ref={prevRef} className="prev">
          <IoChevronBackOutline />
        </button>
        <button ref={nextRef} className="next">
          <IoChevronForward />
        </button>
      </Swiper>
    </>
  );
};

export default React.memo(CategoryCarousel);
// export default CategoryCarousel;
