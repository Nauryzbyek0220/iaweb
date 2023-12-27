import { useContext, useState } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import _ from "lodash";
import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

export default function InteractiveCompanyTimeline() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const dataSrc = _.orderBy(readyDatasrc, ["year"], ["asc"]);
  const [seeMore, setSeeMore] = useState(true);
  const { t } = useTranslation("translate");
  return (
    <div className="relative flex flex-row w-full  overflow-y-hidden overflow-x-auto py-5">
      <div className="absolute top-1/2 border-t-2 border-dashed w-full"></div>
      <div className="relative w-full">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          // slidesPerView={4.5}
          // spaceBetween={0}
          className="companySwiper"
          modules={[Autoplay]}
          breakpoints={{
            default: {
              slidesPerView: 1.2,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 0,
            },
          }}
        >
          {dataSrc?.map((row: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className={`flex relative h-[554px] w-full ${
                    index % 2 == 0 ? "items-start" : "items-end"
                  }`}
                >
                  <div className="absolute flex flex-col bottom-[45%]">
                    <span className="px-5 py-2.5 bg-[#6373ED] yearColor rounded-[10px] text-[22px] text-white font-semibold">
                      {row.year}
                    </span>
                  </div>
                  <div className="flex relative flex-col w-[420px] gap-[15px] h-[216px] bg-white rounded-[20px] p-5">
                    <i
                      className={`fa-solid text-white absolute text-6xl ${
                        index % 2 == 0
                          ? "fa-caret-down -bottom-8"
                          : "fa-caret-up -top-8"
                      }`}
                    />
                    <RenderAtom
                      renderType="image"
                      item={{
                        value: "logo.svg",
                      }}
                      customClassName={"w-auto h-[40px]"}
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: row.title }}
                      customClassName={"text-[24px] font-semibold line-clamp-1"}
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: row.description }}
                      customClassName={"text-base line-clamp-3 text-[67748E]"}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <style>
          {`
       .companySwiper .swiper-slide:first-child {
          padding-left: 80px;
        }
        .companySwiper .swiper-slide:nth-child(1) .yearColor { background: #6373ED; }
        .companySwiper .swiper-slide:nth-child(2) .yearColor { background: #48C7F4; }
        .companySwiper .swiper-slide:nth-child(3) .yearColor { background: #39E0CF; }
        .companySwiper .swiper-slide:nth-child(4) .yearColor { background: #FEC345; }
        .companySwiper .swiper-slide:nth-child(5) .yearColor { background: #FF8E50; }
        .companySwiper .swiper-slide:nth-child(6) .yearColor { background: #FF7E79; }
        .companySwiper .swiper-slide:nth-child(7) .yearColor { background: #F053AA; }
        .companySwiper .swiper-slide:nth-child(8) .yearColor { background: #6373ED; }
        .companySwiper .swiper-slide:nth-child(9) .yearColor { background: #48C7F4; }
        .companySwiper .swiper-slide:nth-child(10) .yearColor { background: #39E0CF; }
        .companySwiper .swiper-slide:nth-child(11) .yearColor { background: #FEC345; }
        .companySwiper .swiper-slide:nth-child(12) .yearColor { background: #FF8E50; }
        .companySwiper .swiper-slide:nth-child(13) .yearColor { background: #FF7E79; }
        .companySwiper .swiper-slide:nth-child(14) .yearColor { background: #F053AA; }
        .companySwiper .swiper-slide:nth-child(15) .yearColor { background: #6373ED; }
        .companySwiper .swiper-slide:nth-child(16) .yearColor { background: #48C7F4; }
        .companySwiper .swiper-slide:nth-child(17) .yearColor { background: #39E0CF; }
        .companySwiper .swiper-slide:nth-child(18) .yearColor { background: #FEC345; }
        .companySwiper .swiper-slide:nth-child(19) .yearColor { background: #FF8E50; }
        .companySwiper .swiper-slide:nth-child(20) .yearColor { background: #FF7E79; }
        .companySwiper .swiper-slide:nth-child(21) .yearColor { background: #F053AA; }
        `}
        </style>
      </div>
    </div>
  );
}
