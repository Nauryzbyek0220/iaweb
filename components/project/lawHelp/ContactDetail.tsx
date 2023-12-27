import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

type PropsType = {
  data?: any;
  options?: any;
};
const ContactDetail: FC<PropsType> = ({ data, options }) => {
  return (
    <div className="container mx-auto py-16">
      <div className="bg-[#ffffff] rounded-xl">
        <div className="relative overflow-x-auto rounded-xl">
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
                      <RenderAtom
                        renderType="text"
                        item={{ value: item.title }}
                        customClassName={
                          "font-normal text-[#3C3C3C] line-clamp-3 leading-[26px] text-sm"
                        }
                      />
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

export default ContactDetail;
