import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

type PropsType = {
    options?: any;
    data?: any;
  };
const Legal: FC<PropsType> = ({ options, data }) => {
    return (
        <div className="container mx-auto py-20">
            <div className="h-2.5 bg-[#003378] rounded-t-xl"></div>
            <div className="bg-[#ffffff] rounded-xl">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <tbody>
                        {data?.map((item: any, index: number) => {
                            return (
                                <tr key={index} className="bg-white border-b last:border-none last:rounded-b-xl">
                                    <td className="md:pl-7 pr-0 py-5">
                                        <RenderAtom
                                            renderType="image"
                                            item={{value: item.mainimage }}
                                            customClassName={
                                                "md:w-auto md:h-auto min-w-[20px] h-[20px]"
                                            }
                                        />
                                    </td>
                                    <td className="py-5">
                                        <RenderAtom
                                            renderType="title"
                                            item={{value: item.title }}
                                            customClassName={
                                                "md:text-[18px] text-[16px] font-normal text-start leading-[18px] text-[#003378]"
                                            }
                                        />                                                      
                                    </td>
                                    <td className="py-5">
                                        <RenderAtom
                                            renderType="text"
                                            item={{value: item.date }}
                                            customClassName={
                                                "md:text-[16px] text-[14px] font-normal text-[#3C3C3C] leading-[18px] text-[#585858]"
                                            }
                                        />
                                    </td>
                                    <td className="py-5">
                                        <Link key={index} href={`/legal?id=${item?.label}`}>
                                            <RenderAtom
                                                item={{value: "Дэлгэрэнгүй"}}
                                                renderType="button"
                                                customClassName={
                                                "hover:bg-[#003378] border border-[#003378] hover:text-white text-[#003378] font-normal md:px-5 py-2 px-3 rounded-[20px] md:text-[16px] text-[14px] leading-[18px]"
                                                }
                                            />
                                        </Link>
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
export default Legal;