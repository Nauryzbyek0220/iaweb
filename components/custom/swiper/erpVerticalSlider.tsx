import React, { FC, useContext } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Mousewheel, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from "lodash";

import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import BlockDiv from "@/components/common/block/blockDiv";
import RenderAtom from "@/components/common/atom/renderAtom";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function ErpVerticalSlider() {
  const { config, readyDatasrc, widgetnemgooReady } =
    useContext(WidgetWrapperContext);
  const { t } = useTranslation("translate");

  return (
    <div className="relative h-[490px]">
      {/* <div className="flex flex-col justify-between absolute py-5 -left-14 gap-2.5 h-full">
        <div className="prevSlide bg-white md:flex  xs:hidden justify-center items-center w-12 h-12 cursor-pointer rounded-[10px] drop-shadow-[0px_0px_4px_rgba(255,255,255,0.6)] ">
          <i className="fa-regular text-[#181B34] fa-chevron-up text-[20px]" />
        </div>
        <div className="nextSlide bg-white md:flex xs:hidden justify-center items-center w-12 h-12 cursor-pointer rounded-[10px] drop-shadow-[0px_0px_4px_rgba(255,255,255,0.6)] ">
          <i className="fa-regular text-[#181B34] fa-chevron-down text-[20px]" />
        </div>
      </div> */}

      <Swiper
        direction="vertical"
        navigation={{
          prevEl: ".prevSlide",
          nextEl: ".nextSlide",
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={20}
        mousewheel={{
          releaseOnEdges: true,
        }}
        modules={[Mousewheel, Navigation, Pagination]}
        className="swiperVertical"
        autoHeight={true}
      >
        {readyDatasrc?.map((item: any, index: number) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <SwiperSlide className="" key={item?.id || index}>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-transparent cursor-pointer gap-5 lg:gap-20 py-5 lg:pr-10">
                <div className="hidden md:block flex-none w-full max-w-[240px] lg:max-w-[540px] h-[180px] md:h-full">
                  <RenderAtom
                    item={
                      item?.position2 || {
                        value: item?.imgurl,
                      }
                    }
                    renderType="image"
                    customClassName={
                      "w-full max-w-[240px] lg:max-w-[540px] h-auto object-cover"
                    }
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-3 md:gap-5 pt-5">
                  <RenderAtom
                    renderType="title"
                    item={
                      item?.position1 || {
                        value: item?.title,
                      }
                    }
                    customClassName={
                      "text-[28px] md:text-[40px] font-bold leading-[28px] md:leading-[46px] text-white"
                    }
                  />

                  <RenderAtom
                    renderType="title"
                    item={
                      item?.position3 || {
                        value: item?.descr,
                      }
                    }
                    customClassName={
                      "text-[14px] md:text-[16px] leading-[26px] font-normal text-white text-left"
                    }
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style>
        {`
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }


  `}
      </style>
    </div>
  );
}
