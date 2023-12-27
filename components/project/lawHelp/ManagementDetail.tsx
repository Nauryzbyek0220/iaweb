import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

type PropsType = {
    options?: any;
    data?: any;
  };
const ManagementDetail: FC<PropsType> = ({ options, data }) => {
    return (
        <div className="pt-[60px] pb-[78px] container mx-auto">
            {data?.map((item: any, index: number) => {
                return (
                    <div key={index} className="md:flex">
                        <div className="lg:w-1/4 md:pr-[30px] w-full pb-3">
                            <div className="bg-[#ffffff] rounded-xl p-5">
                                <div className="py-5">
                                    <RenderAtom
                                        renderType="image"
                                        item={{value: item.mainimage }}
                                        customClassName={
                                            "w-[195px] h-[195px] cursor-pointer rounded-full m-auto"
                                        }
                                    />
                                    <div className="pt-5 pb-[6px] text-center">
                                        <RenderAtom
                                        renderType="text"
                                        item={{ value: item?.title }}
                                        customClassName="text-[16px] text-[#000]"
                                        />
                                    </div>
                                    <div className="text-center">
                                            <RenderAtom
                                                renderType="text"
                                                item={{ value: item?.description }}
                                                customClassName="text-[14px] text-[#585858] font-normal"
                                            />
                                    </div>
                                </div>
                                <div className="pt-[30px]">
                                    {item?.mail && (
                                        <div className="flex">
                                            <div className="flex min-w-[30px] h-[30px] items-center justify-center rounded-lg bg-[#F3F4F6]">
                                                <i className="fa fa-envelope"></i>
                                            </div>
                                           <div className="flex-row pl-[8px]">
                                                <div className="text-[18px] font-medium">
                                                    <span>Цахим шуудан</span>
                                                </div>
                                                <RenderAtom
                                                    renderType="text"
                                                    item={{ value: item?.mail }}
                                                    customClassName="text-[14px] text-[#585858] font-normal"
                                                />
                                           </div>
                                        </div>
                                    )}

                                    {item?.phone && (
                                        <div className="flex pt-3">
                                            <div className="flex min-w-[30px] h-[30px] items-center justify-center rounded-lg bg-[#F3F4F6]">
                                                <i className="fa fa-phone"></i>
                                            </div>
                                           <div className="flex-row pl-[8px]">
                                                <div className="text-[18px] font-medium">
                                                    <span>Утас</span>
                                                </div>
                                                <RenderAtom
                                                    renderType="text"
                                                    item={{ value: item?.phone }}
                                                    customClassName="text-[14px] text-[#585858] font-normal"
                                                />
                                           </div>
                                        </div>
                                    )}

                                    {item?.address && (
                                        <div className="flex pt-3">
                                            <div className="flex min-w-[30px] h-[30px] items-center justify-center rounded-lg bg-[#F3F4F6]">
                                                <i className="fa fa-map-marker"></i>
                                            </div>
                                           <div className="flex-row pl-[8px]">
                                                <div className="text-[18px] font-medium">
                                                    <span>Хаяг</span>
                                                </div>
                                                <RenderAtom
                                                    renderType="text"
                                                    item={{ value: item?.address}}
                                                    customClassName="text-[14px] text-[#585858] font-normal"
                                                />
                                           </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-3/4 w-full">
                            <div className="flex-row">
                                {item?.education && (
                                    <div className="bg-[#ffffff] rounded-xl p-5 mb-5">
                                        <div className="text-[18px] text-[#003378] font-bold pb-5">
                                            <span>Боловсрол</span>
                                        </div>
                                        {item?.education?.map((item: any, index: number) => {
                                            return (
                                                <div key={index} className="flex pb-5">
                                                    <div className="pr-[100px] flex-row">
                                                        <RenderAtom
                                                            renderType="text"
                                                            item={{ value: item?.date}}
                                                            customClassName="text-[14px] text-[#585858] font-normal"
                                                        />
                                                        <RenderAtom
                                                            renderType="text"
                                                            item={{ value: item?.year}}
                                                            customClassName="text-[14px] text-[#585858] font-normal"
                                                        />
                                                    </div>
                                                    <div className="flex-row">
                                                        <RenderAtom
                                                            renderType="text"
                                                            item={{ value: item?.type}}
                                                            customClassName="text-[14px] text-[#003378] font-normal pb-3"
                                                        />
                                                        <RenderAtom
                                                            renderType="text"
                                                            item={{ value: item?.description}}
                                                            customClassName="text-[14px] text-[#585858] font-normal"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {item?.education1 && (
                                    <div className="bg-[#ffffff] rounded-xl p-5">
                                        <div className="text-[18px] text-[#003378] font-bold pb-5">
                                            <span>Ажлын туршлага</span>
                                        </div>
                                        {item?.education1?.map((item: any, index: number) => {
                                            return (
                                                <div key={index} className="flex pb-5">
                                                    <div className="pr-[100px] flex-row">
                                                        <RenderAtom
                                                            renderType="text"
                                                            item={{ value: item?.date}}
                                                            customClassName="text-[14px] text-[#585858] font-normal"
                                                        />
                                                        <RenderAtom
                                                            renderType="text"
                                                            item={{ value: item?.year}}
                                                            customClassName="text-[14px] text-[#585858] font-normal"
                                                        />
                                                    </div>
                                                    <div className="flex-row">
                                                        <RenderAtom
                                                            renderType="text"
                                                            item={{ value: item?.type}}
                                                            customClassName="text-[14px] text-[#003378] font-normal pb-3"
                                                        />
                                                        <RenderAtom
                                                            renderType="text"
                                                            item={{ value: item?.description}}
                                                            customClassName="text-[14px] text-[#585858] font-normal"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {item?.total && (
                                            <div className="flex pb-5">
                                                <div className="pr-5">
                                                    <span className="text-[14px] text-[#585858] font-normal">Нийт :</span>
                                                </div>
                                                <RenderAtom
                                                    renderType="text"
                                                    item={{ value: item?.total}}
                                                    customClassName="text-[14px] text-[#585858] font-normal"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
};
export default ManagementDetail;