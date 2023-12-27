import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveIndustry() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  let newArr = _.map(readyDatasrc, (o) => _.pick(o, ["category"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "category")));
  const [filterItem, setFilterItem]: any = useState("Бүгд");

  const selectdata = _.filter(readyDatasrc, {
    category: filterItem,
  });

  let dataSrc: any = filterItem !== "Бүгд" ? selectdata : readyDatasrc;

  return (
    <div className="w-full">
      <div className="flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
        <div
          className={`pr-7 xl:min-w-auto lg:min-w-auto xs:min-w-max  text-center font-medium text-[#67748E] text-[17px] cursor-pointer ${
            filterItem == "Бүгд" && "text-interactive font-bold"
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
                  filterItem == item && "text-interactive font-bold"
                }`}
                onClick={() => setFilterItem(item)}
              >
                {item}
              </div>
            );
          })}
      </div>
      <div className="grid grid-cols-3 mt-8 gap-8">
        {dataSrc?.map((item: any, index: number) => {
          const ddd = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";

          let imgSrc = item?.imgurl;
          if (imgSrc?.startsWith("storage/")) {
            imgSrc = `${ddd}${imgSrc}`;
          }

          return (
            <div
              className="flex flex-col items-center bg-slate-600 cursor-pointer w-full"
              key={index}
            >
              <div className="relative filter w-full">
                <RenderAtom
                  renderType="image"
                  item={item.position2 || { value: item.mainimage }}
                  customClassName={"w-full h-auto object-cover"}
                />
                <style>
                  {`
                .filter{
                  background: linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.00) 50%), url(<path-to-image>), lightgray 0px -25.657px / 100% 106.752% no-repeat;
                }
                `}
                </style>
                <div className="absolute bottom-0 left-0 flex flex-col gap-2.5 text-white py-[30px] px-5">
                  <RenderAtom
                    item={item?.position41 || { value: item.category }}
                    renderType="text"
                    customClassName={
                      "text-start text-base font-medium line-clamp-1"
                    }
                  />
                  <RenderAtom
                    item={item?.position1 || { value: item.title }}
                    renderType="text"
                    customClassName={
                      "text-start text-xl line-clamp-2 leading-[24px] font-semibold"
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
