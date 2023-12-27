import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";
import _ from "lodash";

type PropsType = {
    options?: any;
    data?: any;
  };
const News: FC<PropsType> = ({ options, data }) => {
    let newArr = _.map(data, (o) => _.pick(o, ["categorydesc"]));
    let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categorydesc")));
    const [active, setActive] = useState(0);
    const [filterItem, setFilterItem]: any = useState(grouped[0] || "Бүгд");
    
    let filtered: any = [];
    grouped.forEach((x) => {
      if (!x.includes("null")) filtered.push(x);
    });
  
    const onFilterEvent = (e: any, item: any) => {
      e.preventDefault();
      setFilterItem(item);
    };
  
    const selectdata = _.filter(data, {
      categorydesc: filterItem,
    });
      
    let dataSrc: any = filterItem !== "Бүгд" ? selectdata : data;

    return (
        <div className="container mx-auto">
            <div className="w-full flex flex-row justify-between items-center  col-span-12 container  px-2 py-4 pb-8">
                <ul className="sm:text-justify xs:text-justify items-center w-max text-[#67748E] space-x-5
                flex xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll
                ">
                    {grouped.map((item: any, index: any) => {
                        
                        return (
                        <li 
                            key={index}
                            className={`list-item cursor-pointer px-2 font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 text-[#003378]
                            ${
                                filterItem == item && "border-b-2 border-[#003378]"
                              }`}
                            onClick={(e: any) => {
                                onFilterEvent(e, item);
                            }}
                            >
                            <span onClick={() => setActive(0)}>
                                {item === "undefined" ? "" : item}
                            </span>
                        </li>
                          );
                    })}
                </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] pb-[92px]">
            {dataSrc?.map((item: any, index: number) => {
                return (
                <Link key={index} href={`/news/detail?id=${item?.label}`}>
                    <div className="flex flex-col bg-white rounded-[10px]">
                        <div className="flex-none w-full h-[195px]">
                            <RenderAtom
                            renderType="image"
                            item={{value: item.mainimage }}
                            customClassName={
                                "w-full h-[200px] cursor-pointer rounded-t-[20px]"
                            }
                            />
                        </div>
                        <div className="flex flex-col gap-2.5 justify-between w-full p-5 h-full">
                            <RenderAtom
                            renderType="text"
                            item={{ value: item?.title }}
                            customClassName="md:text-xl text-lg font-semibold text-[#003378] line-clamp-2 line-clamp-3"
                            />
                            <RenderAtom
                            renderType="text"
                            item={{ value:`Нийтлэгдсэн огноо: ${item?.date}`}}
                            customClassName="md:text-base text-sm font-normal text-[#3C3C3C] line-clamp-3"
                            />
                        </div>
                    </div>
                </Link>
                );
            })}
            </div>
        </div>
    );

};
export default News;