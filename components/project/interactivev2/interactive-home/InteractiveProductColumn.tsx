import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import Image from "next/image";

import { useState } from "react";
import _ from "lodash";

export default function InteractiveProductColumn() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  // console.log("ssss", readyDatasrc);

  return (
    <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-10">
      {readyDatasrc?.map((row: any, index: number) => {
        return (
          <div key={index} className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center gap-3">
              <i className="fa-solid fa-circle  text-[6px] text-[#0C529D]" />
              <RenderAtom
                renderType="title"
                item={row.position1 || { value: row.title }}
                customClassName={"text-[#0C529D] text-[22px] leading-[32px]"}
              />
            </div>

            <RenderAtom
              renderType="title"
              item={row.position3 || { value: row.description }}
              customClassName={
                "text-[#67748E] text-base leading-[26px] font-normal"
              }
            />
          </div>
        );
      })}
    </div>
  );
}
