import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";
import _ from "lodash";

type PropsType = {
    options?: any;
    data?: any;
  };
const LawHomeTable: FC<PropsType> = ({ options, data }) => {
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
            <div className="bg-[#ffffff] rounded-xl">
                <div className="w-full flex flex-row col-span-12 container p-0 ">
                    <ul className="text-[#3C3C3C] flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
                        {grouped.map((item: any, index: any) => {
                            return (
                            <li 
                                key={index}
                                className={`list-item cursor-pointer px-5 font-normal md:text-[18px] sm:text-[16px] xs:text-[14px] py-2.5 text-[#3C3C3C]
                                ${
                                    filterItem == item && "text-white rounded-xl bg-[#003378]"
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
                <div  className="relative overflow-x-auto py-2">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <tbody>
                        {dataSrc?.map((item: any, index: number) => {
                            return (
                                <tr key={index} className="bg-white border-b last:border-none">
                                    <td className="px-2.5 py-4">
                                        <Link
                                        key={index}
                                        href={`/news?id=${item?.label}`}
                                        >
                                            <div className="flex-none w-full">
                                                <RenderAtom
                                                renderType="image"
                                                item={{value: item.mainimage }}
                                                customClassName={
                                                    "w-[24px] h-[24px] cursor-pointer"
                                                }
                                                />
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="py-4">
                                        <RenderAtom
                                            renderType="title"
                                            item={{value: item.title }}
                                            customClassName={
                                                "text-[12px] font-normal leading-[20%] text-[#003378]"
                                            }
                                        />                                                      
                                    </td>
                                    <td className="py-4">
                                        <RenderAtom
                                            renderType="text"
                                            item={{value: item.date }}
                                            customClassName={
                                                "font-normal text-[#3C3C3C] line-clamp-3 leading-[26px]"
                                            }
                                        />
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default LawHomeTable;