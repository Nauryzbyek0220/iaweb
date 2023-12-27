import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

type PropsType = {
  data?: any;
  options?: any;
};
const Contact: FC<PropsType> = ({ data, options }) => {
  return (
    <div className="container mx-auto pb-24">
      <div className="w-full flex col-span-12 pb-7">
        <ul className="text-[#3C3C3C] flex items-center xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll">
          <li className="list-item cursor-pointer font-bold md:text-[18px] sm:text-[16px] xs:text-[14px] text-[#003378] border-b-2 border-[#003378]">
            <span>Салбарын мэдээлэл</span>
          </li>
        </ul>
      </div>
      <div className="bg-[#ffffff] rounded-xl">
        <div className="relative overflow-x-auto py-2">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-[#8A909C] uppercase bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ажлын алба/ Салбар
                </th>
                <th scope="col" className="px-6 py-3">
                  Албан ёсны хаяг
                </th>
                <th scope="col" className="px-6 py-3">
                  Холбоо барих утас
                </th>
                <th scope="col" className="px-6 py-3">
                  Мэйл хаяг
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => {
                return (
                  <tr
                    className="border-b last:border-none odd:bg-[#FAFAFA] even:bg-white"
                    key={index}
                  >
                    <td className="px-2.5 py-4">
                      <Link
                        href={`contact/detail?id=${item?.url}`}
                        className="font-normal text-[#518ef0] line-clamp-3 leading-[26px] text-sm"
                      >
                        <span>{item.title}</span>
                      </Link>
                    </td>
                    <td className="py-4">
                      <RenderAtom
                        renderType="text"
                        item={{ value: item.description }}
                        customClassName={
                          "font-normal text-[#3C3C3C] line-clamp-3 leading-[26px] text-sm"
                        }
                      />
                    </td>
                    <td className="py-4">
                      <RenderAtom
                        renderType="text"
                        item={{ value: item.phone }}
                        customClassName={
                          "font-normal text-[#3C3C3C] line-clamp-3 leading-[26px] text-sm"
                        }
                      />
                    </td>
                    <td className="py-4">
                      <RenderAtom
                        renderType="text"
                        item={{ value: item.mail }}
                        customClassName={
                          "font-normal text-[#3C3C3C] line-clamp-3 leading-[26px] text-sm"
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

export default Contact;
