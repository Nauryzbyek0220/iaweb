/* eslint-disable @next/next/no-img-element */
import RenderAtom from "@/components/common/atom/renderAtom";
import WidgetWrapperContext, {
  WidgetWrapper,
} from "@/components/widget/WidgetWrapper";
import { useState, useContext } from "react";
import { Progress } from "antd";
import _ from "lodash";
import SmartCitySubContent from "./smartcitySubContent";

import ErpArticle from "@/components/custom/article/erpArticle";

export default function InteractiveTabs() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const defaultActive = widgetnemgooReady?.tabs[0]?.id;
  const [mobileMenuDrop, setMobileMenuDrop] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultActive);
  const renderTabsData = widgetnemgooReady?.tabs;
  const defaultArticle = widgetnemgooReady?.defaultArticle;

  let newArr = _.map(readyDatasrc, (o) => _.pick(o, ["categoryname"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categoryname")));

  return (
    <div className="flex flex-col w-full">
      <div className="hidden relative sm:flex flex-row gap-[30px] container mx-auto pb-10">
        {renderTabsData?.map((item: any, index: number) => {
          return (
            <span
              key={index}
              onClick={() => {
                setActiveTab(item?.id);
              }}
              className={`${
                activeTab === item?.id
                  ? " text-[#0C529D] font-semibold  border-[#0C529D]"
                  : " text-[#67748E] border-transparent"
              } text-lg leading-7 py-1 border-b-2 cursor-pointer`}
            >
              {item.name}
            </span>
          );
        })}
      </div>
      <div className="sm:hidden relative flex flex-col container mx-auto pb-5">
        {renderTabsData?.map((item: any, index: number) => {
          if (item.id === activeTab) {
            return (
              <div
                key={index}
                onClick={() => {
                  setMobileMenuDrop(!mobileMenuDrop);
                }}
                className={`${
                  activeTab === item?.id
                    ? " text-[#0C529D] font-semibold  border-[#0C529D]"
                    : " text-[#67748E] border-transparent"
                } flex flex-row justify-between text-lg leading-7 py-4 border-b-2 cursor-pointer w-full`}
              >
                <span> {item.name} </span>
                <i
                  className={`fa-solid ${
                    mobileMenuDrop ? "fa-chevron-up" : "fa-chevron-down"
                  } ml-2`}
                />
              </div>
            );
          }
        })}
        {mobileMenuDrop && (
          <div className="sm:hidden flex flex-col bg-gray-200 p-3 rounded-b-md animate-fade-in-down transition-all delay-500">
            {renderTabsData?.map((item: any, index: number) => {
              return (
                <span
                  key={index}
                  onClick={() => {
                    setActiveTab(item?.id);
                    setMobileMenuDrop(!mobileMenuDrop);
                  }}
                  className={`${
                    activeTab === item?.id
                      ? " text-[#0C529D] font-semibold"
                      : " text-[#67748E]"
                  } text-lg leading-7 py-1 border-b-2 cursor-pointer`}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {activeTab == "001" && (
        <div className="flex flex-col gap-y-[80px]">
          {grouped?.map((item: any, index: number) => {
            const dataSrc = readyDatasrc?.filter((obj: any) => {
              return obj?.categoryname === item;
            });
            return (
              <div key={index} className="grid grid-cols-3 gap-[30px]">
                <div className="text-[60px] font-bold text-[#3C3C3C] leading-[66px]">
                  {item}
                </div>
                {dataSrc?.map((obj: any, rowIndex: number) => {
                  return (
                    <div key={rowIndex} className="flex flex-col gap-y-[10px] ">
                      <RenderAtom
                        item={{
                          value: `https://dev.veritech.mn/${obj?.imgmiddlethumb}`,
                        }}
                        renderType="image"
                        customClassName={
                          "w-full h-[200px] object-cover rounded-[10px]"
                        }
                      />
                      <RenderAtom
                        item={{ value: obj?.title }}
                        renderType="title"
                        customClassName={"text-[20px] font-bold text-[#3C3C3C]"}
                      />
                      <RenderAtom
                        item={{ value: obj?.description }}
                        renderType="text"
                        customClassName={
                          "text-[16px] text-[#67748E] leading-[26px] line-clamp-2"
                        }
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {activeTab == "002" && <SmartCitySubContent />}
    </div>
  );
}
