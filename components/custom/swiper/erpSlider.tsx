import React, { FC, useContext, useState } from "react";

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
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { listToTree, positionToPath } from "@/utils/helper";
import { useRouter } from "next/router";

export default function ErpSlider() {
  const { config, readyDatasrc, widgetnemgooReady, positionConfig } =
    useContext(WidgetWrapperContext);
  const router = useRouter();
  const { t } = useTranslation("translate");
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [active, setActive] = useState(0);
  const options = widgetnemgooReady?.options;
  // const positionConfigg = positionToPath(config.bpsectiondtl);

  const treeReadyDatasrc: any = listToTree(readyDatasrc, {
    idKey: "id",
    parentKey: "parentid",
    childrenKey: "children",
  });

  const onFilterEvent = (e: any, item: any) => {
    e.preventDefault();
    setFilterItem(item);
  };

  let newArr = _.map(treeReadyDatasrc, (o) => _.pick(o, ["attribute"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "attribute")));

  const [filterItem, setFilterItem] = useState<any>(grouped[0] || "Эрэлттэй");

  const selectdata = _.filter(treeReadyDatasrc, {
    attribute: filterItem == "null" ? "" : filterItem,
  });

  const dataSrc = grouped.length > 2 ? selectdata : treeReadyDatasrc;

  const content = (item: any) => {
    switch (options?.cardType) {
      case "card2":
        const linkPath = item?.position10?.positionnemgoo?.url;

        const handlerChange = async (e: any, item: any) => {
          e.preventDefault();
          const linkPath = item;
          if (item) router.push({ ...linkPath }, undefined, { scroll: false });
        };

        return (
          <BlockDiv customClassName="flex flex-col bg-white cursor-pointer">
            <RenderAtom
              item={
                item?.position2 || {
                  value: item?.imgurl,
                }
              }
              renderType="image"
              customClassName={"w-full h-[195px] object-cover"}
            />
            <BlockDiv customClassName="flex flex-col p-5 h-[214px]  gap-3 pt-6">
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
                customClassName={
                  "text-[20px] font-bold leading-[26px] text-[#3C3C3C] h-[50px]"
                }
              />

              <RenderAtom
                renderType="text"
                item={
                  item?.position3 || {
                    value: item?.descr,
                  }
                }
                customClassName={
                  "text-[16px] leading-[22px] text-[#67748E] line-clamp-3  h-[70px]"
                }
              />
              {/* {item?.position10 && (
                <span className="px-0 mx-0 font-semibold text-[16px] gap-x-2 text-[#0C529D] hover:underline mt-0 relative flex">
                  <RenderAtom
                    renderType="text"
                    item={{
                      value: t("WPD_0001"),
                    }}
                    customClassName={"text-[16px] leading-[26px]"}
                  />
                  <i className="fa-regular fa-arrow-right -rotate-45 pl-2 mt-2 top-1 absolute"></i>
                </span>
              )} */}
              {linkPath && (
                <span
                  className="px-0 mx-0 font-semibold text-[16px] flex-row-reverse gap-x-2 text-[#0C529D] hover:underline mt-0 right-1 "
                  onClick={(e) => handlerChange(e, linkPath)}
                >
                  {t("WPD_0001")}
                  <i className="fa-regular fa-arrow-right -rotate-45 pl-2 mt-2 relative top-1"></i>
                </span>
              )}
            </BlockDiv>
          </BlockDiv>
        );

      case "card3":
        return (
          <BlockDiv customClassName="flex flex-col h-[400px] bg-white cursor-pointer relative rounded-[10px] group">
            <RenderAtom
              item={
                item?.position2 || {
                  value: item?.mainimage,
                }
              }
              renderType="image"
              customClassName={"w-full h-full object-cover rounded-[10px]"}
            />
            <BlockDiv customClassName="transition-all absolute bottom-0 left-0 right-0 flex flex-col group-hover:justify-center group-hover:items-center group-hover:px-4 bg-white/80 h-[90px] group-hover:bg-[#615BED]/80  group-hover:rounded-[10px] group-hover:h-full text-center">
              <BlockDiv customClassName="hidden group-hover:flex flex-row border-b border-white w-full justify-center gap-5 pb-4 items-center">
                <RenderAtom
                  renderType="icon"
                  item={{ value: "fa-brands fa-facebook" }}
                  customClassName={"text-white"}
                />
                <RenderAtom
                  renderType="icon"
                  item={{ value: "fa-brands fa-google-plus-g" }}
                  customClassName={"text-white"}
                />
                <RenderAtom
                  renderType="icon"
                  item={{ value: "fa-solid fa-envelope" }}
                  customClassName={"text-white"}
                />
              </BlockDiv>

              <RenderAtom
                renderType="title"
                item={
                  item?.position1 || {
                    value: item?.description,
                  }
                }
                customProps={{
                  truncateRow: 1,
                }}
                customClassName={
                  "text-[20px] font-bold leading-[26px] text-[#3C3C3C] group-hover:text-white pt-2"
                }
              />

              <RenderAtom
                renderType="text"
                item={
                  item?.position3 || {
                    value: item?.title,
                  }
                }
                customClassName={
                  "text-[14px] leading-[22px] group-hover:hidden line-clamp-2 pt-2"
                }
              />
              <RenderAtom
                renderType="text"
                item={
                  item?.position3 || {
                    value: item?.subtitle,
                  }
                }
                customClassName={
                  "text-[14px] leading-[22px] text-[#67748E] hidden group-hover:block group-hover:text-white  line-clamp-2 pt-2"
                }
              />
              <RenderAtom
                renderType="text"
                item={
                  item?.position3 || {
                    value: item?.more,
                  }
                }
                customClassName={
                  "text-[16px] leading-[22px] text-white line-clamp-2 hidden group-hover:block pt-2 font-semibold"
                }
              />
            </BlockDiv>
          </BlockDiv>
        );

      case "productCard":
        return (
          <BlockDiv customClassName="flex flex-col bg-white cursor-pointer">
            <RenderAtom
              item={
                item?.position12 || {
                  value: item?.imgurl,
                }
              }
              renderType="image"
              customClassName={"w-full h-[195px] object-cover"}
            />
            <BlockDiv customClassName="flex flex-col p-5 h-[214px]  gap-3 pt-6">
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
                customClassName={
                  "text-[20px] font-bold leading-[26px] text-[#3C3C3C]"
                }
              />

              <RenderAtom
                renderType="text"
                item={
                  item?.position3 || {
                    value: item?.descr,
                  }
                }
                customClassName={
                  "text-[16px] leading-[26px] text-[#67748E] line-clamp-2"
                }
              />
              <Link
                href={`/product/detail?id=${item?.id}`}
                className="px-0 mx-0 font-semibold text-[16px] flex-row-reverse gap-x-2 text-[#0C529D] hover:underline mt-4"
              >
                {/* {item?.buttonname || item?.buttonname} d */}
                {t("WPD_0001")}
                <i className="fa-regular fa-arrow-right -rotate-45 pl-2 mt-2 relative top-1"></i>
              </Link>
            </BlockDiv>
          </BlockDiv>
        );

      case "card":
        return (
          <BlockDiv customClassName="flex flex-col p-[30px] border-t-8 border-transparent rounded-t-[5px] rounded-b-[10px] hover:border-interactive hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] my-5 space-y-5 cursor-pointer">
            <RenderAtom
              item={
                item?.position12 || {
                  value: item?.imgurl,
                }
              }
              renderType="image"
              customClassName={"w-[60px] h-[60px] object-cover rounded-[10px]"}
            />
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
              customClassName={
                "text-[22px] font-bold leading-[30px] text-[#3C3C3C] h-[60px]"
              }
            />
            <RenderAtom
              renderType="text"
              item={
                item?.position3 || {
                  value: item?.descr,
                }
              }
              customClassName={
                "text-[18px] leading-[30px] text-[#67748E] line-clamp-2"
              }
            />
            <Link
              href={item?.url}
              className="px-0 mx-0 font-medium text-[18px] flex-row-reverse gap-x-2 text-[#3C3C3C] hover:text-[#0E6FFF]"
            >
              {item?.buttonname || item?.buttonname}{" "}
              <i className="fa-light fa-arrow-right -rotate-45"></i>
            </Link>
          </BlockDiv>
        );

      default:
        return (
          <BlockDiv customClassName="relative w-[406px] h-[506px] bg-white">
            <Image src={item?.mainimage} alt="" fill />
            {/* <RenderAtom
                item={{
                  value: item?.mainimage,
                }}
                renderType="image"
                customClassName={
                  "absolute z-0 w-full h-full object-cover object-center"
                }
              /> */}
            <BlockDiv customClassName="z-5 absolute w-full h-full p-5 flex flex-col items-start">
              <RenderAtom
                item={{
                  value: item?.title,
                }}
                renderType="title"
                customClassName={"text-[#2C2C51] text-[40px] font-medium"}
              />
              <RenderAtom
                item={{
                  value: item?.button,
                }}
                renderType="button"
                customClassName={`px-0 mx-0 font-medium text-[18px] ${
                  "Internet of </br>Things" == item?.title
                    ? "text-white"
                    : "text-[#0E6FFF]"
                }  flex-row-reverse gap-x-2`}
                customProps={{
                  type: "icon",
                  icon: "fa-light fa-arrow-right -rotate-45",
                }}
              />
            </BlockDiv>
          </BlockDiv>
        );
    }
  };

  return (
    <div className="relative z-30 emergeny">
      {grouped &&
        (options.filter == "true" ? (
          <div className="w-full mb-4 block col-span-12 container xl:overflow-hidden lg:overflow-hidden xs:overflow-scroll">
            <ul className="xs:flex md:gap-6 sm:gap-3 sm:text-justify xs:text-center items-center w-max text-[#67748E] xl:overflow-hidden lg:overflow-hidden xs:overflow-scroll">
              {grouped.map((item: any, index: any) => {
                return (
                  <li
                    key={index}
                    className={`xl:w-auto xs:w-[150px]  list-item cursor-pointer hover:border-b-2 border-transparent hover:border-interactive font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 border-b-2 ${
                      filterItem === item
                        ? "border-interactive text-interactive"
                        : "hover:text-interactive border-transparent"
                    }`}
                    onClick={(e: any) => {
                      onFilterEvent(e, item);
                    }}
                  >
                    <span onClick={() => setActive(index)}>
                      {item === "null" ? "Бүгд" : item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        ))}
      <div
        ref={navigationPrevRef}
        className="absolute drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] bg-white md:flex  xs:hidden justify-center items-center -left-[62px] top-[40%] z-30 w-20 h-20 hover:text-interactive cursor-pointer rounded-full"
      >
        <i className="fa-regular fa-arrow-left text-[25px]" />
      </div>
      <div
        ref={navigationNextRef}
        className="absolute bg-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]  md:flex xs:hidden justify-center items-center -right-[62px] top-[40%]  z-30 w-20 h-20 hover:text-interactive cursor-pointer rounded-full"
      >
        <i className="fa-regular fa-arrow-right text-[25px]" />
      </div>
      <Swiper
        slidesPerView={options?.cardPerView || 3}
        spaceBetween={20}
        loop={true}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: options?.cardPerView || 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: options?.cardPerView || 3,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        {dataSrc?.map((item: any, index: number) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <SwiperSlide className="" key={index}>
              {content(item)}
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
            `}
      </style>
    </div>
  );
}
