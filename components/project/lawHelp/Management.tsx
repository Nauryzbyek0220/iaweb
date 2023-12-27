import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";
import _ from "lodash";

type PropsType = {
    options?: any;
    data?: any;
  };
const Management: FC<PropsType> = ({ options, data }) => {
    
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
            <div className="w-full flex col-span-12 container pt-[60px] pb-[85px]">
                <ul className="flex w-full justify-around text-[#003378] bg-white rounded-lg">
                    {grouped.map((item: any, index: any) => {
                        return (
                        <li 
                            key={index}
                            className={`list-item cursor-pointer font-[700] md:text-[16px] sm:text-[14px] xs:text-[12px] py-5 text-[#585858]
                            ${
                                filterItem == item && "border-b-2 border-[#003378]"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pb-[80px]"> 
            {dataSrc?.map((item: any, index: number) => {
                return (
                <Link key={index} href={`about/management/detail?id=${item?.label}`}>
                    <div className="flex flex-colrounded-[10px] p-1 bg-white">
                        <div className="py-[36px] px-[24px]" style={{ backgroundImage: `url(/Vector.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover", }}>
                            <RenderAtom
                            renderType="image"
                            item={{value: item.mainimage }}
                            customClassName={
                                "w-full h-[160px] cursor-pointer rounded-full"
                            }
                            />
                            <div className="py-5 text-center">
                                <RenderAtom
                                renderType="text"
                                item={{ value: item?.title }}
                                customClassName="text-[16px] text-[#000]"
                                />
                            </div>
                            <div className="w-[46px] mx-auto h-[2px] bg-[#003378]"></div>
                            <div className="py-5 mx-auto text-[#585858] text-[14px] leading-[20px] font-base text-center flow-root">
                                <span className="">Ажилласан жил</span>
                                <RenderAtom
                                renderType="text"
                                item={{ value: item?.date}}
                                customClassName="mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </Link>
                );
            })}
            </div>
        </div>
    );
};
export default Management;