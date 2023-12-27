import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

import _ from "lodash";
import { useTranslation } from "next-i18next";

export default function InteractiveNewsList() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const options = widgetnemgooReady?.options;
  const { t } = useTranslation("translate");

  return (
    <div className="container mx-auto">
      {options?.showCategory && (
        <div className="w-full  flex flex-row justify-between items-center  col-span-12 container  px-2 py-4 pb-8">
          {/* <div className=" md:w-[1300px] xs:w-full grid-cols-1"></div>{" "} */}
          <ul className="flex  sm:text-justify xs:text-justify items-center w-max text-[#67748E] space-x-5">
            <li className="list-item cursor-pointer hover:border-b-2 px-2  hover:border-interactive font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 border-b-2 border-interactive text-interactive ">
              <span>Үйл явдал</span>
            </li>
          </ul>
          <Link
            href={"/news/list"}
            className="flex flex-row justify-center items-center gap-3 text-[#2C2C51] hover:text-[#2C2C51]/50"
          >
            <span className="hidden md:block text-lg font-medium">
              {t("WPD_0111")}
            </span>
            <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        {readyDatasrc?.map((item: any, index: number) => {
          return (
            <Link key={index} href={`/news?id=${item?.id}`}>
              <div className="flex flex-col bg-white rounded-[20px]">
                <div className="flex-none w-full h-[195px]">
                  <RenderAtom
                    renderType="image"
                    item={item.position2 || { value: item.mainimg }}
                    customClassName={
                      "w-full h-[200px] cursor-pointer rounded-t-[20px]"
                    }
                  />
                </div>
                <div className="flex flex-col gap-2.5 justify-between w-full p-5 h-full">
                  <RenderAtom
                    renderType="text"
                    item={item?.position5 || { value: t(item?.createddate) }}
                    customClassName="text-base font-semibold text-[#0C529D]"
                  />
                  <RenderAtom
                    renderType="text"
                    item={item?.position1 || { value: t(item?.title) }}
                    customClassName="text-xl font-semibold text-[#3C3C3C] line-clamp-2 leading-[26px]"
                  />
                  <RenderAtom
                    renderType="text"
                    item={item?.position3 || { value: t(item?.body) }}
                    customClassName="text-base font-normal text-[#67748E] line-clamp-3 leading-[26px]"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
