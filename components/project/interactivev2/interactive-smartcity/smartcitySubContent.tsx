/* eslint-disable react-hooks/rules-of-hooks */
import { data } from "autoprefixer";
import { FC, useState } from "react";
import useSWR from "swr";
import _ from "lodash";
import RenderAtom from "@/components/common/atom/renderAtom";

const SmartCitySubContent = () => {
  const { data: dataSrc } = useSWR(`/api/get-data?metaid=17026318430639`);

  let newArr = _.map(dataSrc?.result, (o) => _.pick(o, ["categoryname"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categoryname")));

  const [activeTab, setActiveTab] = useState<any>(grouped?.[0]);

  if (dataSrc?.status !== "success") {
    return;
  }

  const reaydData = dataSrc?.result?.filter((item: any, index: number) => {
    return item?.categoryname == activeTab || grouped?.[0];
  });

  return (
    <div className="grid grid-cols-12 gap-x-[60px]">
      <div className="col-span-4 flex flex-col">
        {grouped?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={`text-[18px] py-[20px] leading-[20px]  border-b border-[#E1E1E1] cursor-pointer
              ${
                activeTab || grouped?.[0] == item
                  ? "text-[#0C529D] font-bold"
                  : "text-[#3C3C3C] font-normal"
              }
              `}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="col-span-8 flex flex-col gap-y-[60px]">
        {reaydData?.map((obj: any, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-y-[20px]">
              <RenderAtom
                item={{ value: obj?.title }}
                renderType="title"
                customClassName={"text-[#3C3C3C] text-[40px]"}
              />
              <div className="flex justify-between gap-x-[20px]">
                <RenderAtom
                  item={{
                    value: `https://dev.veritech.mn/${obj?.imgmiddlethumb}`,
                  }}
                  renderType="image"
                  customClassName={"min-h-[208px] min-w-[360px] objcect-cover"}
                />
                <RenderAtom
                  item={{ value: obj?.description }}
                  renderType="text"
                  customClassName={"text-[#67748E] text-lg leading-[26px]"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartCitySubContent;
