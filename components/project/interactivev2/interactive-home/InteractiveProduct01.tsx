import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import Image from "next/image";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveProduct01() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  let newArr = _.map(readyDatasrc, (o) => _.pick(o, ["categoryname"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categoryname")));
  const [filterItem, setFilterItem]: any = useState("Бүгд");

  const selectdata = _.filter(readyDatasrc, {
    categoryname: filterItem,
  });

  let dataSrc: any = filterItem !== "Бүгд" ? selectdata : readyDatasrc;

  return (
    <div className={`w-full bg-gray-100 pt-20`}>
      <div className="flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
        <div
          className={`pr-7 xl:min-w-auto lg:min-w-auto xs:min-w-max  text-center font-medium text-[#67748E] text-[17px] cursor-pointer ${
            filterItem == "Бүгд" && "text-[#FF6A71] font-bold"
          }`}
          onClick={() => setFilterItem("Бүгд")}
        >
          Бүгд
        </div>
        {!_.isEmpty(grouped) &&
          grouped.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`pr-7 xl:min-w-auto lg:min-w-auto xs:min-w-max text-center font-medium text-[#67748E] text-[16px] cursor-pointer ${
                  filterItem == item && "text-[#FF6A71] font-bold"
                }`}
                onClick={() => setFilterItem(item)}
              >
                {item}
              </div>
            );
          })}
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-col-3 xs:grid-cols-2 xl:gap-8 lg:gap-10 xs:gap-4 mt-[40px]">
        {dataSrc?.map((item: any, index: number) => {
          const ddd = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";
          let imgSrc = item?.imgurl;
          if (imgSrc?.startsWith("storage/")) {
            imgSrc = `${ddd}${imgSrc}`;
          }

          return (
            <div
              className="flex flex-col h-[278px] items-center py-5 bg-white border-[3px] border-transparent  rounded-lg p-4 cursor-pointer animateCustomer"
              key={index}
              style={{ animationDelay: index * 0.1 + "s" }}
            >
              <div className="relative flex items-center justify-center w-[130px] h-[130px]">
                {/* <Image
                  src={imgSrc}
                  alt="hh"
                  // fill
                  height={50}
                  // fill={true}
                  width={100}
                  className="bg-cover"
                  quality={100}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                /> */}
                <img
                  src={imgSrc}
                  alt="logo"
                  className="w-[130px] h-auto flex justify-center items-center"
                />
              </div>

              <RenderAtom
                item={item?.position1}
                renderType="text"
                customClassName={
                  "text-center text-[18px] leading-[20px] h-10 w-full block text-[#585858]  mt-[5px] font-black line-clamp-2"
                }
              />
              <RenderAtom
                item={item?.position3 || { value: "" }}
                renderType="text"
                customClassName={
                  "text-center text-[16px] w-full block text-[#67748E]  mt-[5px]"
                }
              />
            </div>
          );
        })}
      </div>
      <style>
        {`
            .animateCustomer {
              opacity: 0;
              transform: translateY(-10px);
              animation: up 0.2s forwards;
              border:3px solid transparent;
              background:
              linear-gradient(to right, white, white),
              linear-gradient(to right, transparent , transparent);
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            }
            .animateCustomer:hover {
              background:
              linear-gradient(to right, white, white),
              linear-gradient(#FF679D, #FF712B);;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;


              // border-image:linear-gradient(#FF679D, #FF712B);
              // border-width: 3px;
              // border-type:solid;
              // border-image-slice: 1;
              // border-radius:10px;
              // z-index:10

            }

            @keyframes up {
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
