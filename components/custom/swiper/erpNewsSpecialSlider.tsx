import React, { useContext } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from "lodash";

import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import BlockDiv from "@/components/common/block/blockDiv";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

export default function ErpNewsSpecialSlider() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const filtered1 = readyDatasrc.filter((data: any) => {
    return data.categorydesc !== "Ажлын байр";
  });

  const filtered = filtered1.filter((data: any) => {
    return data.categorydesc !== null;
  });

  return (
    <div className="flex flex-row container mx-auto justify-center items-center relative z-30 emergeny">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        {filtered?.map((item: any, index: number) => {
          return (
            <SwiperSlide className="" key={item?.id || index}>
              <BlockDiv customClassName="flex flex-row gap-[60px] cursor-pointer w-full max-w-[1280px] h-[365px] container relative">
                <BlockDiv customClassName="flex-none w-[590px] h-[365px] object-cover rounded-[20px]">
                  <RenderAtom
                    item={item?.position2 || { value: item.imgurl }}
                    renderType="image"
                    customClassName={
                      "w-[590px] h-[365px] object-cover rounded-[20px] flex-none"
                    }
                  />
                </BlockDiv>
                <BlockDiv customClassName="flex flex-col justify-between items-start gap-[10px]">
                  <BlockDiv customClassName="flex flex-col justify-between items-start gap-5 w-full max-w-[630px]">
                    <RenderAtom
                      renderType="title"
                      item={
                        item?.position1 || {
                          value: item?.title,
                        }
                      }
                      customProps={{
                        truncateRow: 2,
                      }}
                      customClassName={"text-[40px] font-bold text-[#3C3C3C]"}
                    />
                    <RenderAtom
                      renderType="text"
                      item={
                        item?.position22 || {
                          value: item?.descr,
                        }
                      }
                      customClassName={
                        "text-base leading-[26px] text-[#67748E] text-start line-clamp-4 w-full max-w-[630px] newsCardBody"
                      }
                    />
                  </BlockDiv>

                  <Link
                    href={`/news?id=${item.id}`}
                    className="px-7 py-3 rounded-[30px] font-medium text-lg text-white bg-[#0C529D]"
                  >
                    Дэлгэрэнгүй
                  </Link>
                </BlockDiv>
              </BlockDiv>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style>
        {`
            .emergeny {
              opacity: 0;
              transform: translateY(-10px);
              animation: emerge 2s forwards;
            }

            @keyframes emerge {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .newsCardBody img {
              display: none;
            }
            `}
      </style>
    </div>
  );
}
