import React, { useContext } from "react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import RenderAtom from "@/components/common/atom/renderAtom";
import BlockDiv from "@/components/common/block/blockDiv";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import _ from "lodash";

export default function ErpSliderVideo() {
  const { readyDatasrc, widgetnemgooReady, metaverseData } =
    useContext(WidgetWrapperContext);
  const { t } = useTranslation("translate");
  const paginationOption = widgetnemgooReady?.options?.pagination;
  const navigationButton = widgetnemgooReady?.options?.navigation;
  const options = widgetnemgooReady?.options;
  const sliderButtonKey = widgetnemgooReady?.options?.sliderButtonKey;
  const readyData = _.isEmpty(readyDatasrc) ? metaverseData : readyDatasrc;

  const renderNavigationButton = () => {
    switch (navigationButton) {
      case "bottomRight":
        return (
          <BlockDiv customClassName="flex flex-row absolute bottom-0 right-4 md:right-[16%] gap-4  md:gap-[60px] py-5 md:py-[100px]">
            <BlockDiv
              customClassName={`flex justify-center items-center bg-white hover:bg-white/80 w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full z-20 ${
                sliderButtonKey?.prev
                  ? `${sliderButtonKey?.prev}`
                  : "prevBanner"
              }`}
            >
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-regular fa-arrow-left" }}
                customClassName="text-sm md:text-2xl text-black"
              />
            </BlockDiv>
            <BlockDiv
              customClassName={`flex justify-center items-center bg-white hover:bg-white/80 w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full z-20  ${
                sliderButtonKey?.next
                  ? `${sliderButtonKey?.next}`
                  : "nextBanner"
              }`}
            >
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-regular fa-arrow-right" }}
                customClassName="text-sm md:text-2xl text-black"
              />
            </BlockDiv>
          </BlockDiv>
        );
      default:
        return (
          <>
            <BlockDiv
              customClassName={`absolute top-1/2 left-0 md:left-5 flex z-20${
                sliderButtonKey?.prev
                  ? `${sliderButtonKey?.prev}`
                  : "prevBanner"
              }`}
            >
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-solid fa-angle-left" }}
                customClassName="text-lg bg-black/50 text-white p-2"
              />
            </BlockDiv>
            <BlockDiv
              customClassName={`absolute top-1/2 right-0 md:right-5 flex z-20${
                sliderButtonKey?.next
                  ? `${sliderButtonKey?.next}`
                  : "nextBanner"
              }`}
            >
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-solid fa-angle-right" }}
                customClassName="text-lg bg-black/50 text-white p-2"
              />
            </BlockDiv>
          </>
        );
    }
  };

  return (
    <div className="relative w-full md:h-[600px] h-[414px]">
      {options?.defaultBgVideo && (
        <div className="absolute w-full h-[414px] md:h-[600px] top-0 left-0 right-0">
          <video
            src={options?.defaultBgVideo}
            controls={false}
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: "0",
              left: "0",
              display: "block",
            }}
          />
        </div>
      )}
      {renderNavigationButton()}
      <Swiper
        slidesPerView={1}
        loop
        pagination={{
          clickable: paginationOption?.show || true,
        }}
        navigation={{
          nextEl: sliderButtonKey?.next
            ? `.${sliderButtonKey.next}`
            : ".nextBanner",
          prevEl: sliderButtonKey?.prev
            ? `.${sliderButtonKey.prev}`
            : ".prevBanner",
        }}
        height={600}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        {readyData?.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <SliderContent
                background={item.backgroundimage}
                image=""
                title={item.title}
                logo={item.logo}
                button={item.button}
                description={item.description}
                date={item.date}
                location={item.location}
                url={item.url}
                topBanner={item.topBanner}
                options={options}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style>
        {`
        .swiper-pagination-bullet {
          background-color:white;
        }
        `}
      </style>
    </div>
  );
}

const SliderContent = ({
  title,
  background,
  logo,
  description,
  button,
  location,
  date,
  url,
  topBanner,
  image,
  options,
}: {
  title: string;
  background: string;
  logo: string;
  description: string;
  button: string;
  location: string;
  date: string;
  image: string;
  topBanner: string;
  url: string;
  options: any;
}) => {
  const { t } = useTranslation("translate");
  return (
    <div className="flex  w-full md:h-[600px] h-[414px] relative">
      {background.slice(-3) == "mp4"
        ? !options?.defaultBgVideo && (
            <video
              src={background}
              controls={false}
              autoPlay
              muted
              loop
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          )
        : !options?.defaultBgVideo && (
            <div className="w-full h-auto object-cover">
              <RenderAtom
                renderType="image"
                item={{ value: `https://dev.veritech.mn/${background}` }}
                customClassName={"w-full h-auto object-cover"}
              />
            </div>
          )}
      <div className="absolute  w-full top-0 left-0 right-0 bottom-0 md:flex-row container mx-auto justify-between  md:pt-[100px] md:pb-[100px] xs:pt-16 flex flex-col items-center">
        <div className="flex flex-col w-full md:w-[60%] justify-center transition duration-150 ease-in-out">
          <div className="emergeny">
            {logo && (
              <RenderAtom
                renderType="image"
                item={{ value: logo }}
                customClassName="w-[200px] md:w-[157px] h-auto"
              />
            )}
          </div>
          <div className="flex flex-col emergeny2 gap-5">
            <RenderAtom
              renderType="text"
              item={{ value: t(title) }}
              customClassName={` ${
                options?.titleClassName
                  ? options?.titleClassName
                  : "xs:text-[24px] md:text-[40px]  font-[300] text-white uppercase md:leading-[48px] xs:leading-[26px]"
              }`}
              customProps={{
                truncateRow: 3,
              }}
            />
            {description && (
              <RenderAtom
                renderType="text"
                item={{ value: t(description) }}
                customClassName={`${
                  options?.escrClassName
                    ? options?.escrClassName
                    : "text-[18px] text-white mt-4"
                } flex font-normal`}
                customProps={{
                  truncateRow: 3,
                }}
              />
            )}
          </div>
          <div className="flex justify-start gap-16 emergeny2">
            {location && (
              <span className="text-white">
                <i className="fa-regular fa-location-dot" /> {location}
              </span>
            )}
            {date && (
              <span className="text-white">
                <i className="fa-regular fa-clock" /> {date}
              </span>
            )}
          </div>
          {button && (
            <div className="md:flex flex-row gap-5 emergeny3 xs:hidden pt-8">
              <Link href={url}>
                <button
                  className={`${
                    options?.buttonClassName
                      ? options?.buttonClassName
                      : "bg-transparent text-white  border-2 border-white rounded-full hover:bg-black/20 px-8 py-3 w-full max-w-[250px]"
                  }`}
                >
                  {t(button)}
                  {/* {t(row.title)} */}
                </button>
              </Link>
            </div>
          )}
          <style>
            {`
            .emergeny {
              opacity: 1;
              transform: translateX(-90px);
              animation: emerge 0.3s forwards;
            }
              .emergeny2 {
              opacity: 1;
              transform: translateX(-90px);
              animation: emerge 0.5s forwards;
            }
          .emergeny3 {
              opacity: 1;
              transform: translateX(-90px);
              animation: emerge 0.7s forwards;
            }

            @keyframes emerge {
              from {
                opacity: 1;
                transform: translateX(90px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            `}
          </style>
        </div>
      </div>
      {topBanner && (
        <div className="w-[260px] h-[200px] bg-gradient-to-r from-[#FE805A] to-[#FBAD50] text-white text-lg md:text-[46px] leading-none font-semibold  md:absolute md:flex xs:hidden top-0 px-[30px] py-[46px] rounded-b-[20px] right-[16%]">
          <RenderAtom renderType="text" item={{ value: t(topBanner) }} />
        </div>
      )}
    </div>
  );
};
