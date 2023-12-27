import React, { useContext } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import BlockDiv from "@/components/common/block/blockDiv";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import _ from "lodash";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Popover } from "antd";
import { FC } from "react";
import { Content } from "next/font/google";
import { Rate } from "antd";
import TeeData from "@/components/default/custom/card/tee";

export default function ErpCarousel() {
  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);

  const breakPoints = widgetnemgooReady?.options?.breakpoints;
  const isActive = widgetnemgooReady?.options?.isActive;

  const selectdata = _.filter(readyDatasrc, (data) => data.isactive === 0);
  const surveydata = widgetnemgooReady?.options?.carouselType;
  const cardType = widgetnemgooReady?.options?.cardType;
  // console.log("dsadsa dasd as das d", selectdata);

  const renderData = isActive ? selectdata : readyDatasrc;

  const swiperContent = (row: any) => {
    switch (cardType) {
      case "imageDescription":
        return (
          <BlockDiv customClassName="h-72 flex items-center flex-col py-[40px] gap-6 bg-gray-100 px-[10px] rounded-[10px] text-center">
            <BlockDiv customClassName="py-4 max-h-[120px] min-h-[120px] flex items-center justify-center">
              <RenderAtom
                renderType="image"
                item={{ value: row.imgurl || row.mainimage }}
                customClassName="max-h-[80px] w-auto flex items-center justify-center object-contain"
              />
            </BlockDiv>
            <BlockDiv>
              <RenderAtom
                renderType="title"
                item={{ value: row?.title }}
                customClassName={
                  "text-[20px] text-[#585858] leading-[90%] mb-4"
                }
              />
              <RenderAtom
                renderType="text"
                item={{ value: row?.description }}
                customClassName={"text-[#67748E] text-[16px] mt-4"}
              />
            </BlockDiv>
          </BlockDiv>
        );

      default:
        return (
          <BlockDiv customClassName="h-28 flex items-center justify-center">
            <RenderAtom
              renderType="image"
              item={{ value: row.imgurl || row.mainimage }}
              customClassName="w-auto flex items-center justify-center object-cover"
            />
          </BlockDiv>
        );
    }
  };

  return (
    <BlockDiv
      customClassName="flex flex-row container mx-auto gap-5 w-full items-center justify-center py-[20px] relative"
      divNumber="SwiperOutter"
    >
      <BlockDiv
        customClassName={`flex prev bg-white rounded-full bg-white  flex items-center justify-center absolute -left-10 z-20 w-[80px] h-[80px] shadow-xl cursor-pointer`}
      >
        <RenderAtom
          renderType="icon"
          item={{ value: "fa-solid fa-angle-left" }}
          customClassName="text-lg"
        />
      </BlockDiv>

      <Swiper
        navigation={{ nextEl: ".next", prevEl: ".prev" }}
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        centeredSlides={true}
        roundLengths={true}
        className="mySwiper"
        breakpoints={
          // ...breakPoints,
          {
            "390": {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            "1024": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            "1280": {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            "1300": {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }
        }
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
      >
        {renderData?.map((row: any, index: number) => {
          return (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              {swiperContent(row)}
              {/* <BlockDiv customClassName="h-28 flex items-center justify-center">
                <RenderAtom
                  renderType="image"
                  item={{ value: row.imgurl || row.mainimage }}
                  customClassName="w-auto flex items-center justify-center object-cover"
                />
              </BlockDiv> */}
            </SwiperSlide>
          );
        })}

        {/* {surveydata
          ? readyDatasrc?.map((row: any, index: number) => {
              const content = (
                <BlockDiv
                  key={index}
                  customClassName="w-[900px] h-auto text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="41"
                    viewBox="0 0 53 41"
                    fill="none"
                    className="mx-auto mt-[-40px]"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.8498 0.351562C15.6176 7.99862 13.0313 14.1476 13.0313 18.8331C16.4932 19.1802 19.3346 20.4094 21.5555 22.5208C23.7764 24.6321 24.8868 27.0761 24.8868 29.8526C24.8868 32.8028 23.7927 35.2901 21.6045 37.3147C19.4163 39.3393 16.6892 40.3516 13.4232 40.3516C9.76528 40.3516 6.61364 39.0356 3.96817 36.4036C1.32271 33.7716 0 30.5757 0 26.8158C0 15.5359 8.20588 4.11627 22.8498 0.351562Z"
                      fill="#FF9339"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M49.986 0.351562C42.7539 7.99862 40.1675 14.1476 40.1675 18.8331C43.6295 19.1802 46.4709 20.4094 48.6917 22.5208C50.9126 24.6321 52.023 27.0761 52.023 29.8526C52.023 32.8028 50.9289 35.2901 48.7407 37.3147C46.5525 39.3393 43.8254 40.3516 40.5594 40.3516C36.9015 40.3516 33.7499 39.0356 31.1044 36.4036C28.4589 33.7716 27.1362 30.5757 27.1362 26.8158C27.1362 15.5359 35.3421 4.11627 49.986 0.351562Z"
                      fill="#FF9339"
                    />
                  </svg>
                  <Rate className="pt-10" allowHalf defaultValue={4} />
                  <BlockDiv customClassName="justify-center items-center px-10 py-[30px]">
                    <RenderAtom
                      item={{
                        value: row?.extraDesription[0].description,
                      }}
                      renderType="text"
                      customClassName={"font-normal text-[14px] leading-[140%]"}
                    />
                  </BlockDiv>
                  <BlockDiv customClassName="flex justify-center items-center px-10 pb-10">
                    <BlockDiv customClassName="xl:w-[58px] lg:w-[80px] xs:w-[80px]">
                      <RenderAtom
                        renderType="image"
                        customClassName={"w-[58px] h-[58px] mr-4"}
                        item={{
                          value: row?.extraDesription[0].iconImage,
                        }}
                      />
                    </BlockDiv>
                    <BlockDiv customClassName="">
                      <BlockDiv customClassName="font-bold text-xl text-[#3C3C3C] cursor-pointer xl:w-[300px] lg:w-auto xs:w-auto">
                        <RenderAtom
                          renderType="title"
                          customClassName={"line-clamp-0"}
                          item={{
                            value: row?.extraDesription[0].title,
                          }}
                        />
                      </BlockDiv>
                      <BlockDiv customClassName="font-bold text-lg text-[#818E9B] cursor-pointer xl:w-[300px] lg:w-auto xs:w-auto">
                        <RenderAtom
                          renderType="title"
                          customClassName={"line-clamp-0"}
                          item={{
                            value: row?.extraDesription[0].position,
                          }}
                        />
                      </BlockDiv>
                    </BlockDiv>
                  </BlockDiv>
                </BlockDiv>
              );

              return (
                <SwiperSlide key={index}>
                  <Popover content={content} placement="top" trigger="click">
                    <div className="flex items-center justify-center">
                      <RenderAtom
                        renderType="image"
                        item={{
                          value: row.imgurl || row.mainimage,
                        }}
                        customClassName="w-[130px] h-auto"
                      />
                    </div>
                  </Popover>
                </SwiperSlide>
              );
            })
          : renderData?.map((row: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center">
                    <RenderAtom
                      renderType="image"
                      item={{
                        value: row.imgurl || row.mainimage,
                      }}
                      customClassName="w-[130px] h-auto"
                    />
                  </div>
                </SwiperSlide>
              );
            })} */}
      </Swiper>
      <BlockDiv
        customClassName={`flex next bg-white rounded-full bg-white items-center justify-center absolute -right-10 z-20 w-[80px] h-[80px] shadow-xl cursor-pointer`}
      >
        <RenderAtom
          renderType="icon"
          item={{ value: "fa-solid fa-angle-right" }}
          customClassName="text-lg"
        />
        {/* ddd */}
      </BlockDiv>
    </BlockDiv>
  );
}
