import { FC, useState } from "react";
import React from "react";
import _ from "lodash";
import RenderAtom from "@/components/common/atom/renderAtom";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { notification } from "antd";


import Link from "next/link";
type PropsType = {
  options?: any;
  data?: any;
};

const schema = yup
  .object({
    newlink: yup
      .string()
      .email("Имэйл буруу байна ")
      .max(255)
      .required("Имэйл хаяг оруулна уу"),
  })
  .required();

const NewsDetail: FC<PropsType> = ({ options, data}) => {
  
    const router = useRouter();
    const filterId = router.query?.id;
   
    const command = "LAC_ECM_NEWS_DV_004";
    const parameters = `&parameters=${JSON.stringify({
        id: filterId,
    })}`;

    const { data: getdataSrc } = useSWR(
        `/api/get-process?processcode=${command}${parameters}`
    );
    
    const onFilterEvent = (e: any, item: any) => {
        e.preventDefault();
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        const param = {
        typeId: "1",
        ...data,
        };

        const { data: submitData } = await axios.post(`/api/post-process`, {
        processcode: "IMN_GET_EMAIL_DV_001",
        parameters: param,
        });

        if (submitData?.status == "success") {
        notification.success({
            message: "Бидэнтэй нэгдсэнд баярлалаа.",
            placement: "bottom",
        });
        reset();
        }
    };

    return (
        <div className="pt-[60px] pb-[78px] container mx-auto">
            <div className="flex">
                <div className="w-full">
                    <div className="flex-col">
                        <div className="bg-[#ffffff] rounded-xl p-5 mb-2">
                        <RenderAtom
                            renderType="text"
                            item={{ value: getdataSrc?.createddate}}
                            customClassName="text-[12px] text-[#585858]"
                        />
                        <RenderAtom
                            renderType="title"
                            item={{ value: getdataSrc?.title }}
                            customClassName="text-[22px] text-[#003378]"
                        />
                        <RenderAtom
                            renderType="text"
                            item={{ value: getdataSrc?.body }}
                            customClassName="text-[14px] text-[#585858] leading-[24px] py-3"
                        />
                        <RenderAtom
                            renderType="image"
                            item={{ value: getdataSrc?.imgurl }}
                            customClassName={
                            "w-full h-auto cursor-pointer rounded-lg py-3"
                            }
                        />
                        </div>
                        <div className="bg-[#ffffff] rounded-xl p-5 mt-2">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="text-[18px] text-[#003378] font-bold">
                                <span>Сэтгэгдэл</span>
                                </div>

                                <div className="relative flex flex-row py-5">
                                <input
                                    {...register("newlink")}
                                    className="border-#E1E1E1 md:h-[40px]  sm:h-[50px] xs:h-[36px] w-full rounded-lg border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                                    placeholder="Сэтгэгдэл үлдээх"
                                ></input>
                                <span className="flex px-5 items-center  absolute right-0 cursor-pointer sm:w-[140px] xs:w-[130px] md:h-[45px] sm:h-[50px] xs:h-[40px] text-[#003378] xl:text-[18px] lg:text-[16px] xs:text-[14px] flex-row-reverse font-medium">
                                    <i className="fa fa-paper-plane ml-2 flex items-center justify-items-center"></i>
                                    <input
                                    type="submit"
                                    value=""
                                    className="cursor-pointer"
                                    />
                                </span>
                                </div>
                            </form>
                        
                            {data?.map((item: any, index: number) => {
                                return (
                            <div key={index}>
                                {item?.comment?.map((item: any, index: number) => {
                                    return (
                                    <div key={index} className="border-b last:border-none">
                                        <div key={index} className="flex py-5">
                                            <RenderAtom
                                                renderType="image"
                                                item={{ value: item.image }}
                                                customClassName={
                                                "min-w-[40px] max-w-[40px] h-[40px] rounded-full"
                                                }
                                            />
                                            <div className="flex-col pl-2">
                                                <RenderAtom
                                                renderType="title"
                                                item={{ value: item?.name }}
                                                customClassName="text-[14px] text-[#003378]"
                                                />
                                                <RenderAtom
                                                renderType="text"
                                                item={{ value: item?.description }}
                                                customClassName="text-[14px] text-[#585858] leading-[20px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    );
                                })}
                                </div>
                                )
                            })}
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NewsDetail;
