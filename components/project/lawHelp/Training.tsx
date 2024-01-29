import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";
import Image from "next/image";

type PropsType = {
    options?: any;
    data?: any;
  };
const Training: FC<PropsType> = ({ options, data }) => {
    console.log(data);
    
    return (
        <div className="pt-[60px] pb-[78px] container mx-auto">
            <div className="bg-[#ffffff] rounded-xl p-5">
               {data?.map((item: any, index: number) => {
                return (
                    <div key={index} className="border-b last:border-none">
                      
                            <div className="md:flex py-5 w-full">
                                <Image
                                    src={item?.mainimage || 'https://dev.veritech.mn/storage/uploads/process/202401/file_1704250609504314_17037094337197351.jpg' }
                                    alt="logo"
                                    width={200}
                                    height={150}
                                    className="rounded-lg"
                                />
                                <div className="pl-[12px] py-5 grid"> 
                                    <div className="flex">
                                        <RenderAtom
                                            renderType="title"
                                            item={{ value: item?.title}}
                                            customClassName="text-[18px] text-[#003378] font-bold"
                                        />
                                    </div>
                                    <div className="flex pt-3">
                                        <div className="mt-auto flex"> 
                                            <div className="px-2 flex">
                                                <i className="fa fa-calendar pr-2 text-[#A0A0A0]"></i>
                                                <RenderAtom
                                                    renderType="text"
                                                    item={{ value: item?.createddate}}
                                                    customClassName="text-[14px] text-[#A0A0A0] font-medium"
                                                />
                                            </div>
                                            <div className="px-2 flex">
                                                <i className="fa fa-eye pr-2 text-[#A0A0A0]" aria-hidden="true"></i>
                                                <RenderAtom
                                                    renderType="text"
                                                    item={{ value: item?.total}}
                                                    customClassName="text-[14px] text-[#A0A0A0] font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto flex items-end py-5">
                                    {item?.dicfiles && (
                                        <Link  href={`training/detail?id=${item?.dim1}`}>
                                            <span className={
                                                "hover:bg-[#003378] border border-[#003378] hover:text-white text-[#003378] font-normal px-5 py-2 rounded-[20px] text-[16px] leading-[18px]"
                                                }>
                                                Дэлгэрэнгүй
                                            </span>
                                        </Link>
                                    )} 
                                </div>
                            </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Training;