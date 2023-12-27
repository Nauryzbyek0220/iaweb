import { FC } from "react";
import AtomLink from "@/components/common/atom/atomLink";
import Link from "next/link";
import Image from "next/image";
import RenderAtom from "@/components/common/atom/renderAtom";
// import LangSwicher from "../header/langSwicher";
type PropsType = {
  data?: any;
  options?: any;
  setShow?: any;
  maindata?: any;
};

const MobileHeader: FC<PropsType> = ({ data, maindata, options, setShow }) => {

  return (
    <>
      <div className=" w-full xl:hidden  absolute z-50  text-white transform  translate-x-0 bg-black/50 h-screen top-0">
        <div
          className="bg-gray-800 opacity-50 w-full h-full"
          onClick={() => setShow(false)}
        />
        <div className="w-[280px] right-0 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
          <div className="px-6 h-full">
            <div className="flex flex-col justify-between h-full w-full">
              <div>
                <div className="mt-6 flex w-full items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Link href="/">
                        <Image
                          src={"/lawText.png"}
                          alt=""
                          width={180}
                          height={40}
                        />
                      </Link>
                    </div>
                    <div
                      id="cross"
                      className="text-gray-800"
                      onClick={() => setShow(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="f-m-m text-left pt-10">
                  {data?.map((row: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="text-gray-800 cursor-pointer py-0"
                        onClick={() => setShow(false)}>
                        <AtomLink
                          key={index}
                          item={row?.title}
                          href={row?.url}
                          customClassName="text-[14px] font-semibold  border-b-2 border-transparent hover:border-[#fff] flex-row-reverse font-normal cursor-pointer hover:text-blue-400"
                          childData={row?.children || []}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="h-[5px] bg-[#003378]">
                </div>
                <div className="f-m-m text-left">
                  {maindata?.map((row: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="text-gray-800 cursor-pointer py-2"
                        onClick={() => setShow(false)}>
                        <AtomLink
                          key={index}
                          item={row?.title}
                          href={row?.url}
                          customClassName="text-[14px] font-semibold  border-b-2 border-transparent hover:border-[#fff] flex-row-reverse font-normal cursor-pointer hover:text-blue-400"
                          childData={row?.childrens || []}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;