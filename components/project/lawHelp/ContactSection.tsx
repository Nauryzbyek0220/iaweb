import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

type PropsType = {
  data?: any;
};

const ContactSection: FC<PropsType> = ({ data }) => {
  return (
    <div className="container py-16 mx-auto">
      <div className="md:flex gap-10">
        <div className="md:w-2/4 w-full p-5">
          <span>map</span>
        </div>
        <div className="md:w-2/4 w-full p-5">
          <div className="flex-col">
            <div className="flex py-3 items-center">
              <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center rounded-lg border border-[#003378]">
                <i className="fa fa-map-marker text-[#003378] text-[10px]"></i>
              </div>
              <div className="text-[16px] cursor-pointer leading-[24px] text-[#585858] px-3">
                <span>
                  Хаяг: Монгол Улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 6 дугаар
                  хороо, Залуучуудын өргөн чөлөө, Хүрээ төв
                </span>
              </div>
            </div>
            <div className="flex py-3 items-center">
              <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center rounded-lg border border-[#003378]">
                <i className="fa fa-phone text-[#003378] text-[10px]"></i>
              </div>
              <div className="text-[16px] cursor-pointer leading-[24px] text-[#585858] px-3">
                <span>77001982</span>
              </div>
            </div>
            <div className="flex py-3 items-center">
              <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center rounded-lg border border-[#003378]">
                <i className="fa fa-envelope text-[#003378] text-[10px]"></i>
              </div>
              <div className="text-[16px] cursor-pointer leading-[24px] text-[#585858] px-3">
                <span>info@lac.gov.mn</span>
              </div>
            </div>
            <div className="flex py-3 items-center">
              <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center rounded-lg border border-[#003378]">
                <i className="fa fa-globe text-[#003378] text-[10px]"></i>
              </div>
              <div className="text-[16px] cursor-pointer leading-[24px] text-[#585858] px-3">
                <span>lac.gov.mn</span>
              </div>
            </div>
            <div className="flex py-3 items-center">
              <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center rounded-lg border border-[#003378]">
                <i className="fa-brands fa-facebook-f text-[#003378] text-[10px]"></i>
              </div>
              <div className="text-[16px] cursor-pointer leading-[24px] text-[#585858] px-3">
                <span>www.facebook.com/profile</span>
              </div>
            </div>
            <div className="flex py-3 items-center">
              <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center rounded-lg border border-[#003378]">
                <i className="fa-brands fa-twitter text-[#003378] text-[10px]"></i>
              </div>
              <div className="text-[16px] cursor-pointer leading-[24px] text-[#585858] px-3">
                <span>www.facebook.com/profile</span>
              </div>
            </div>
            <div className="flex py-3 items-center">
              <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center rounded-lg border border-[#003378]">
                <i className="fa-brands fa-youtube text-[#003378] text-[10px]"></i>
              </div>
              <div className="text-[16px] cursor-pointer leading-[24px] text-[#585858] px-3">
                <span>www.facebook.com/profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactSection;
