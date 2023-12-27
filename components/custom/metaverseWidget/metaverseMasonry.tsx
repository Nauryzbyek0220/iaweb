import { FC, useState } from "react";
import React from "react";
import _ from "lodash";
import CardData from "./metaverseMasonryData";
import RenderAtom from "@/components/common/atom/renderAtom";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Grid } from "swiper";
import SurveyQuestionList from "./surveyQuestionList";
import Link from "next/link";
type PropsType = {
  options?: any;
  data?: any;
};

const Masonry: FC<PropsType> = ({ options, data }) => {
  let newArr = _.map(data?.rows, (o) => _.pick(o, ["C10_DESC"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "C10_DESC")));
  const [active, setActive] = useState(0);
  const [filterItem, setFilterItem]: any = useState("Бүгд");
  // const [filterItem, setFilterItem]: any = useState(grouped[0] || "Бүгд");

  let filtered: any = [];
  grouped.forEach((x) => {
    if (!x.includes("null")) filtered.push(x);
  });

  const onFilterEvent = (e: any, item: any) => {
    e.preventDefault();
    setFilterItem(item);
  };

  const selectdata = _.filter(data, {
    C10_DESC: filterItem,
  });

  let dataSrc: any = filterItem !== "Бүгд" ? selectdata : data?.rows;
  let surveyCard = data?.[0];
  let mainHeader = surveyCard?.mainHeader;
  let mainBody = surveyCard?.mainBody;

  const settings = options?.custom;

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const readyData = data?.result;

  const typeContent = (item: any, text1: any) => {
    if (item === "text") {
      return (
        <input
          className="py-[10px] px-[8px]  w-full rounded-lg h-[42px] border border-[#EDEDED] hover:border-[#EDEDED]"
          type="text"
        />
      );
    } else if (item === "checkbox") {
      return (
        <>
          <div>
            <input type="checkbox" name="" id="" />
            <label>{text1}</label>
          </div>
        </>
      );
    }
  };

  const content = () => {
    switch (settings?.style) {
      case "masonrySlider":
        return (
          <>
            {grouped && (
              <div className="w-full block   col-span-12 container  px-2 pb-4 pt-16">
                <div className="w-full block col-span-12 container xl:overflow-hidden lg:overflow-hidden xs:overflow-scroll">
                  {" "}
                  <div className="flex justify-between items-center self-stretch">
                    <ul className="xs:flex md:gap-6 sm:gap-3 sm:text-justify xs:text-center items-center w-max text-[#67748E] xl:overflow-hidden lg:overflow-hidden xs:overflow-scroll">
                      <li
                        className={`w-auto list-item cursor-pointer hover:border-b-2 font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 border-b-2 ${
                          filterItem === "Бүгд"
                            ? "border-interactive text-interactive"
                            : "hover:text-interactive border-transparent"
                        }`}
                        onClick={(e: any) => {
                          onFilterEvent(e, "Бүгд");
                        }}
                      >
                        <span>Бүгд</span>
                      </li>
                      {grouped.map((item: any, index: any) => {
                        return (
                          <li
                            key={index}
                            className={`w-auto list-item cursor-pointer hover:border-b-2 font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 border-b-2 ${
                              filterItem === item
                                ? "border-interactive text-interactive"
                                : "hover:text-interactive border-transparent"
                            }`}
                            onClick={(e: any) => {
                              onFilterEvent(e, item);
                            }}
                          >
                            <span onClick={() => setActive(index)}>
                              {item === "undefined" ? "" : item}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex">
                      <div
                        ref={navigationPrevRef}
                        className="w-10 h-10 hover:text-interactive cursor-pointer flex justify-center items-center"
                      >
                        <i className="fa-regular fa-arrow-left text-[15px]" />
                      </div>
                      <div
                        ref={navigationNextRef}
                        className="w-10 h-10 hover:text-interactive cursor-pointer flex justify-center items-center"
                      >
                        <i className="fa-regular fa-arrow-right text-[15px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="relative lg:pb-28 pb-5">
              <Swiper
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    grid: {
                      rows: 1,
                      fill: "row",
                    },
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    grid: {
                      rows: 1,
                      fill: "row",
                    },
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    grid: {
                      rows: 1,
                      fill: "row",
                    },
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    grid: {
                      rows: 2,
                      fill: "row",
                    },
                  },
                  1280: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    grid: {
                      rows: 2,
                      fill: "row",
                    },
                  },
                }}
                modules={[Autoplay, Grid, Navigation, Pagination]}
                className="mySwiper"
              >
                {dataSrc?.map((item: any, index: number) => {
                  return (
                    <div key={index} className="pb-10">
                      <SwiperSlide>
                        <div className="flex flex-col xl:min-w-auto w-full min-w-full h-auto  md:flex-row bg-white rounded-[10px] cursor-pointer hover:shadow-lg">
                          <div className="flex-none w-full md:w-[202.703px] h-full">
                            <div>
                              <RenderAtom
                                renderType="image"
                                customClassName={
                                  "w-full md:min-h-[167px]  h-full rounded-t-lg md:rounded-l-lg"
                                }
                                item={
                                  item?.position2 || {
                                    value: item?.mainimage,
                                  }
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-5 p-5">
                            <RenderAtom
                              item={
                                item?.position1 || {
                                  value: item?.title || "title",
                                }
                              }
                              renderType="title"
                              customClassName={
                                "lg:text-[16px] sm:text-[14px] xs:text-[12px] lg:font-semibold sm:font-medium xs:font-normal leading-[120%] text-[#3C3C3C]"
                              }
                            />
                            <RenderAtom
                              item={
                                item?.position3 || {
                                  value: item?.description || "description",
                                }
                              }
                              renderType="title"
                              customClassName={
                                "lg:text-[14px] sm:text-[14px] xs:text-[10px] text-[#67748E] leading-[140%] line-clamp-2"
                              }
                            />
                            <div className="flex items-center gap-6">
                              <div className="flex-none">
                                <RenderAtom
                                  renderType="image"
                                  customClassName={"w-auto h-full"}
                                  item={{
                                    value: item?.iconImage,
                                  }}
                                />
                              </div>
                              <div>
                                <RenderAtom
                                  item={{ value: item?.label }}
                                  renderType="text"
                                  customClassName={
                                    "lg:text-[14px] sm:text-[14px] xs:text-[12px] text-[#3C3C3C] leading-[120%]"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </div>
                  );
                })}
              </Swiper>
            </div>
          </>
        );

      case "rightImage":
        return (
          <>
            {grouped && (
              <div className="w-full block col-span-12 container  px-2 pb-[30px]">
                <div className="sm:w-fit block bg-[#F7F7F7] rounded-[20px] sm:m-auto">
                  <ul className="text-[#67748E] flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
                    {grouped.map((item: any, index: any) => {
                      return (
                        <li
                          key={index}
                          className={`cursor-pointer w-auto py-2 px-5 font-[800] md:text-[18px] sm:text-[16px] xs:text-[14px] rounded-[30px] text-[#67748E] ${
                            filterItem == item && "bg-[#35CC61] text-white"
                          }`}
                          onClick={(e: any) => {
                            onFilterEvent(e, item);
                          }}
                        >
                          <span onClick={() => setActive(index)}>
                            {item === "undefined" ? "" : item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {selectdata?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-center items-center md:justify-between gap-10 w-full hContent"
                >
                  <div className="flex flex-col justify-center items-center md:items-start gap-5 md:w-1/2">
                    <RenderAtom
                      renderType="title"
                      item={{ value: item?.title }}
                      customClassName={
                        "text-lg xs:text-[1.5rem] md:text-[40px] text-center md:text-start font-bold md:leading-none text-[#2C2C51]"
                      }
                    />
                    <RenderAtom
                      renderType="text"
                      item={{
                        value: item?.description || item?.description,
                      }}
                      customClassName={
                        "md:text-[18px] sm:text-lg xs:text-base leading-[30px] text-[#67748E] font-normal xs:text-justify"
                      }
                    />
                    <div className="flex flex-col w-full space-y-16">
                      <div key={0} className="flex items-center">
                        <Link href={item?.url}>
                          <RenderAtom
                            item={{
                              value: item?.button,
                            }}
                            renderType="button"
                            customClassName={
                              "bg-[#FF9339] hover:bg-[#0E430D] text-white font-normal px-[30px] py-3.5 rounded-[30px] text-[18px] leading-[22px]"
                            }
                          />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-end md:w-1/2">
                    <RenderAtom
                      renderType="image"
                      item={{
                        value: item?.mainimage || item?.mainimage,
                      }}
                      customClassName={
                        "w-full xl:max-w-[629px] xl:min-w-[629px] w-auto h-auto"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </>
        );

      case "leftImage":
        return (
          <>
            {data?.map((item: any, index: number) => {
              let extraDesription = data?.[index].extraDesription;

              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-start items-start md:justify-start gap-10 w-full hContent"
                >
                  <div className="flex flex-col items-start justify-start md:w-1/2">
                    <RenderAtom
                      renderType="image"
                      item={{
                        value: item?.mainimage || item?.mainimage,
                      }}
                      customClassName={
                        "w-full xl:max-w-[629px] xl:min-w-[629px] w-auto h-auto"
                      }
                    />
                  </div>
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center md:items-start gap-5 md:w-1/2"
                  >
                    <RenderAtom
                      renderType="title"
                      item={{ value: item?.title }}
                      customClassName={
                        "text-lg xs:text-[1.5rem] md:text-[40px] text-center md:text-start font-bold md:leading-none text-[#2C2C51]"
                      }
                    />
                    <div className="lg:grid items-center xl:overflow-hidden xs:overflow-scroll grid-cols-2 gap-6 z-10 px-2 p-6">
                      {extraDesription?.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row w-full cursor-pointer relative gap-5 sm:mt-0 mt-5"
                          >
                            <div className="flex flex-col">
                              <div className="flex items-center gap-6">
                                <div className="flex-none">
                                  <RenderAtom
                                    renderType="image"
                                    item={{
                                      value: item?.iconImage || item?.iconImage,
                                    }}
                                    customClassName={"w-full w-auto h-auto"}
                                  />
                                </div>
                                <RenderAtom
                                  renderType="title"
                                  item={{
                                    value: item?.title,
                                  }}
                                  customClassName={
                                    "sm:text-2xl xs:text-lg font-bold leading-9 text-[#3C3C3C]"
                                  }
                                />
                              </div>

                              <div>
                                <RenderAtom
                                  renderType="text"
                                  item={{
                                    value: item?.description,
                                  }}
                                  customClassName={
                                    "md:text-[18px] sm:text-lg xs:text-base leading-[30px] text-[#67748E] font-normal xs:text-justify"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col w-full space-y-16">
                      <div key={0} className="flex items-center">
                        <RenderAtom
                          item={{
                            value: item?.button,
                          }}
                          renderType="button"
                          customClassName={
                            "text-[18px] text-black rounded-full hover:opacity-80 transition p-0"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        );

      case "surveyCard":
        return (
          <>
            <div className="flex flex-wrap gap-y-2">
              <div className="md:w-3/4 w-full pb-4 md:pb-0 md:pr-6 xs:p-0">
                <div className="bg-white  w-full md:p-5 xs:p-4 space-y-5 rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.06)]">
                  <div className="flex gap-2.5 mb-10">
                    <div className="flex-none">
                      <RenderAtom
                        renderType="image"
                        item={{
                          value: `https://dev.veritech.mn/${readyData?.C4}`,
                        }}
                        customClassName={
                          "w-full xl:max-w-[305px] xl:min-w-[305px] w-auto h-auto rounded-[10px]"
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <RenderAtom
                        renderType="title"
                        item={{ value: readyData?.C2 }}
                        customClassName={
                          "line-clamp-2 text-[24px] leading-[36px] font-bold not-italic text-[#3C3C3C]"
                        }
                      />
                      <RenderAtom
                        item={{ value: readyData?.C11 }}
                        renderType="text"
                        customClassName={
                          "text-[14px] leading-[32px] font-normal not-italic text-justify text-[#67748E] "
                        }
                      />
                      <div className="flex flex-row gap-x-5 pt-10 mt-auto">
                        <div className="w-[30px] h-[30px] flex items-center justify-center rounded-full">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="31"
                              viewBox="0 0 30 31"
                              fill="none"
                            >
                              <rect
                                y="0.917969"
                                width="30"
                                height="30"
                                rx="15"
                                fill="#4267B2"
                              />
                              <path
                                d="M16.3979 24.918V16.7188H19.162L19.5761 13.5095H16.3979V11.4655C16.3979 10.5384 16.6552 9.90678 17.9846 9.90678H19.6693V7.04414C19.3762 7.00516 18.3705 6.91797 17.2004 6.91797C14.7572 6.91797 13.0851 8.40874 13.0851 11.1476V13.5095H10.3313V16.7188H13.0851V24.918H16.3979Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#03A9F4]">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                            >
                              <g clip-path="url(#clip0_268_855)">
                                <path
                                  d="M18 4.33684C17.3306 4.63047 16.6174 4.82509 15.8737 4.91959C16.6388 4.46284 17.2226 3.74509 17.4971 2.87997C16.7839 3.30522 15.9964 3.60559 15.1571 3.77322C14.4799 3.05209 13.5146 2.60547 12.4616 2.60547C10.4186 2.60547 8.77388 4.26372 8.77388 6.29659C8.77388 6.58909 8.79862 6.87034 8.85938 7.13809C5.7915 6.98847 3.07688 5.51809 1.25325 3.27822C0.934875 3.83059 0.748125 4.46284 0.748125 5.14347C0.748125 6.42147 1.40625 7.55434 2.38725 8.21022C1.79438 8.19897 1.21275 8.02684 0.72 7.75572C0.72 7.76697 0.72 7.78159 0.72 7.79622C0.72 9.58947 1.99912 11.079 3.6765 11.4221C3.37612 11.5042 3.04875 11.5436 2.709 11.5436C2.47275 11.5436 2.23425 11.5301 2.01038 11.4806C2.4885 12.942 3.84525 14.0163 5.4585 14.0512C4.203 15.0333 2.60888 15.6251 0.883125 15.6251C0.5805 15.6251 0.29025 15.6116 0 15.5745C1.63463 16.6286 3.57188 17.2305 5.661 17.2305C12.4515 17.2305 16.164 11.6055 16.164 6.72972C16.164 6.56659 16.1584 6.40909 16.1505 6.25272C16.8829 5.73297 17.4983 5.08384 18 4.33684Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_268_855">
                                  <rect
                                    width="18"
                                    height="18"
                                    fill="white"
                                    transform="translate(0 0.917969)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div className="w-[30px] h-[30px] flex items-center justify-center rounded-full">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="31"
                              viewBox="0 0 30 31"
                              fill="none"
                            >
                              <g clip-path="url(#clip0_268_858)">
                                <path
                                  d="M15 30.918C23.28 30.918 30 24.198 30 15.918C30 7.63797 23.28 0.917969 15 0.917969C6.72 0.917969 0 7.63797 0 15.918C0 24.198 6.72 30.918 15 30.918ZM20.3538 14.8467H22.5012V12.7005H24.6488V14.848H26.7775V16.9955H24.6488V19.143H22.5012V16.9955H20.3538V14.8467ZM15.745 10.3705L13.7125 12.343C11.1125 9.80172 6.05375 11.653 6.05375 15.9117C6.05375 21.688 14.2525 22.083 14.9637 17.4117H10.7238V14.8355H17.795C18.5975 19.0305 15.8888 23.418 10.7238 23.418V23.4192C6.5625 23.4192 3.2225 20.0617 3.2225 15.918C3.22375 9.24547 11.1388 6.09172 15.745 10.3705Z"
                                  fill="#F44336"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_268_858">
                                  <rect
                                    width="30"
                                    height="30"
                                    fill="white"
                                    transform="translate(0 0.917969)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <SurveyQuestionList data={readyData?.C7[0]} />
                  {/* <div className="flex gap-2.5 bg-slate-200 rounded-lg p-5">
                    {mainHeader?.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col justify-between "
                        >
                          <RenderAtom
                            renderType="title"
                            item={{ value: item?.title }}
                            customClassName={
                              "line-clamp-2 text-[16px] font-semibold not-italic text-[#585858] "
                            }
                          />
                          <RenderAtom
                            item={{ value: item?.description }}
                            renderType="text"
                            customClassName={
                              "text-[14px] leading-[19.6px] font-normal not-italic text-justify text-[#A0A0A0] py-[10px] "
                            }
                          />
                          <div className="pt-[10px] flex items-start">
                            <input
                              className="py-[10px] px-[8px]  w-full rounded-lg h-[42px] border border-[#EDEDED] hover:border-[#EDEDED]"
                              type="text"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {mainBody?.map((item: any, index: number) => {
                    return (
                      <div key={index} className="py-0">
                        <RenderAtom
                          renderType="title"
                          item={{ value: item?.quiz }}
                          customClassName={
                            "line-clamp-2 text-[16px] font-semibold not-italic text-[#585858] "
                          }
                        />
                        <div className="pt-[10px] flex items-start">
                          {typeContent(item?.type, item?.text)}
                        </div>
                      </div>
                    );
                  })} */}
                </div>
              </div>

              <div className="md:w-1/4 w-full">
                <div className="flex h-auto w-full xl:w-[360px] flex-col bg-white shadow-[0_2px_14px_rgba(0,0,0,0.06)] w-full] rounded-xl p-5 space-y-5">
                  <span className="text-[20px] leading-6 font-semibold text-[#585858]">
                    Хандалт ихтэй судалгаанууд
                  </span>
                  {selectdata?.map((item: any, index: number) => {
                    return (
                      <>
                        <div key={index} className="flex flex-col">
                          <div className="flex gap-2.5 border-b py-5 first:pt-0 pb-5 first:border-b-1">
                            <div className="flex-none">
                              <RenderAtom
                                renderType="image"
                                item={{ value: item?.mainimage }}
                                customClassName={
                                  "rounded-[5px] w-[100px] h-[70px] object-cover flex-none"
                                }
                              />
                            </div>
                            <div className="flex flex-col justify-between ">
                              <RenderAtom
                                renderType="title"
                                item={{ value: item?.mainTitle }}
                                customClassName={
                                  "line-clamp-2 text-sm leading-normal font-semibold text-[#3C3C3C] group-hover:text-interactive"
                                }
                              />
                              <RenderAtom
                                renderType="title"
                                item={{ value: item?.mainDate }}
                                customClassName={
                                  "text-[12px] leading-normal font-medium text-[#67748E] group-hover:text-interactive"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="flex h-auto w-full xl:w-[360px] flex-col bg-white shadow-[0_2px_14px_rgba(0,0,0,0.06)] w-full] rounded-xl p-5 space-y-5 mt-5">
                  <span className="text-[20px] leading-6 font-semibold text-[#585858]">
                    Төрлүүд
                  </span>
                  <div className="flex flex-col">
                    {grouped && (
                      <div className="block col-span-12 container">
                        <div className="sm:w-fit block sm:m-auto">
                          <ul className="text-[#67748E] flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
                            {grouped.map((item: any, index: any) => {
                              return (
                                <li
                                  key={index}
                                  className={`cursor-pointer w-auto py-2 px-5 font-[800] md:text-[18px] sm:text-[16px] xs:text-[14px] rounded-[30px] text-[#67748E] ${
                                    (filterItem == item &&
                                      "bg-[#35CC61] text-white") ||
                                    "bg-[#F7F7F7] rounded-[20px]"
                                  }`}
                                  onClick={(e: any) => {
                                    onFilterEvent(e, item);
                                  }}
                                >
                                  <span onClick={() => setActive(index)}>
                                    {item === "undefined" ? "" : item}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            {grouped && (
              <div className="w-full block col-span-12 container  px-2 pt-10 pb-[30px]">
                <div className="sm:w-fit block bg-[#F7F7F7] rounded-[20px] sm:m-auto">
                  {/* flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll */}
                  <ul className="text-[#67748E] flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
                    {/* flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll */}
                    <li
                      key={""}
                      className={`cursor-pointer w-auto py-2 px-5 font-[800] md:text-[18px] sm:text-[16px] xs:text-[14px] rounded-[30px] text-[#67748E] ${
                        filterItem == "Бүгд" ? "bg-[#35CC61] text-white" : ""
                      }`}
                      onClick={() => setFilterItem("Бүгд")}
                    >
                      <span onClick={() => setActive(96)}>Бүгд</span>
                    </li>
                    {grouped.map((item: any, index: any) => {
                      return (
                        <li
                          key={index}
                          className={`cursor-pointer w-auto py-2 px-5 font-[800] md:text-[18px] sm:text-[16px] xs:text-[14px] rounded-[30px] text-[#67748E] ${
                            filterItem == item && "bg-[#35CC61] text-white"
                          }`}
                          onClick={(e: any) => {
                            onFilterEvent(e, item);
                          }}
                        >
                          <span onClick={() => setActive(index)}>
                            {item === "undefined" ? "" : item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
            <div className="grid 8xl:grid-cols-4 grid-cols-1 gap-6 z-10 8xl:px-0 lg:px-2 xs:px-2 pb-16">
              <CardData data={dataSrc} />
            </div>
          </>
        );
    }
  };

  return <>{content()}</>;
};

export default Masonry;
