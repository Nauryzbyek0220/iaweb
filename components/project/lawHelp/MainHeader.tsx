import { useContext, FC, useRef } from "react";
import _ from "lodash";
import AtomLink from "@/components/common/atom/atomLink";
import LawHelpLink from "./lawHelpLink";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import LawTitle from "./lawTitle";
import { useWindowScroll } from "react-use";
import { useState } from "react";
import MobileHeader from "./MobileHeader";
import ContactSection from "./ContactSection";

type PropsType = {
  config?: any;
  dataSrc?: any;
  options?: any;
  position?: any;
};

const MainHeader: FC<PropsType> = ({ config, dataSrc, options, position }) => {
  const mainData = options?.maindata;
  let w75: string = "w-3/5";
  let w25: string = "w-2/5";
  const route = useRouter();
  const [show, setShow] = useState(false);
  const activeMenu = route?.asPath;
  const id = route?.query?.id;

  return (
    <div className="">
      <div className="bg-white md:flex sm:hidden xs:hidden">
        <div className="container mx-auto py-[10px]">
          <div className="md:flex sm:hidden xs:hidden">
            <div className={`flex flex-row ${w75}`}>
              {options.data?.map((row: any, index: number) => {
                return (
                  <Link
                    key={index}
                    href={row?.url}
                    target={row?.props}
                    className="py-2.5 px-5"
                  >
                    <span
                      className={`text-[14px] font-normal cursor-pointer hover:text-[#FFCD02] leading-[20px] text-[#003378] hover:font-bold
                                        ${
                                          activeMenu === row?.url
                                            ? "text-[#FFC107] border-[#FFC107]"
                                            : "border-transparent"
                                        }
                                        `}
                    >
                      {row?.title}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className={`flex items-center ${w25}`}>
              <div className="flex gap-5 ml-auto">
                <Link href="https://www.facebook.com" target="_blank">
                  <i className="fa-brands fa-facebook-f text-[#003378] md:text-[16px] text-[14px]"></i>
                </Link>
                <Link href="https://www.youtube.com" target="_blank">
                  <i className="fa-brands fa-youtube text-[#003378] md:text-[16px] text-[14px]"></i>
                </Link>
                <Link href="https://www.facebook.com" target="_blank">
                  <i className="fa-brands fa-instagram text-[#003378] md:text-[16px] text-[14px] font-bold"></i>
                </Link>
                <Link href="https://www.twitter.com" target="_blank">
                  <i className="fa-brands fa-twitter text-[#003378] md:text-[16px] text-[14px]"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[5px] bg-[#003378] md:flex sm:hidden xs:hidden"></div>
      <div className="bg-[#F3F4F6] ">
        <div className="container mx-auto md:flex-col sm:flex xs:flex h-full w-full flex-row justify-between">
          <div className="px-5 py-[23px]">
            <div className="flex items-center">
              <Link href="/">
                <Image src={"/lawHelp.png"} alt="logo" width={94} height={94} />
              </Link>
              <div className="pl-2.5">
                <Image
                  src={"/lawText.png"}
                  alt="logo"
                  width={454}
                  height={64}
                />
              </div>
            </div>
          </div>
          <div className="md:flex pb-5 sm:hidden xs:hidden">
            <div className="flex flex-row gap-[20px] p-2.5">
              {options.maindata?.map((row: any, index: number) => {
                return (
                  <LawHelpLink
                    key={index}
                    item={row?.title}
                    customProps={row?.props}
                    href={row?.url}
                    customClassName={`text-[16px] cursor-pointer leading-[20px] pr-[5px] ${
                      activeMenu === row?.url
                        ? "text-[#FFC107] border-[#FFC107]"
                        : "border-transparent"
                    }  `}
                    childData={row?.childrens || []}
                    // eslint-disable-next-line react/no-children-prop
                    children={row?.childrens || []}
                  />
                );
              })}
            </div>
          </div>
          <span
            className="md:hidden xs:flex text-xl items-center"
            onClick={() => setShow(true)}
          >
            <i className="fa-regular fa-bars "></i>
          </span>
        </div>
      </div>
      {show && (
        <MobileHeader
          data={options.data}
          maindata={options.maindata}
          setShow={setShow}
        />
      )}

      {activeMenu != "/" && (
        <>
          <div className="h-[50px] bg-[#003378] flex items-center">
            <div className="container mx-auto">
              <div className="flex items-center">
                <Image
                  src={"/home.png"}
                  alt="logo"
                  width={30}
                  height={30}
                  className="ml-2"
                />
                <span
                  className={`text-[16px] font-normal cursor-pointer text-white pl-7`}
                >
                  <LawTitle active={activeMenu} id={id} />
                </span>
              </div>
              <div className="h-[5px] w-[43px] bg-[#FFCD02]"></div>
            </div>
          </div>
          <div className="h-[5px] bg-[#FFCD02]"></div>
        </>
      )}

      {activeMenu == "/contact" && (
        <div className="bg-[#F3F4F6] w-full">
          <ContactSection data={dataSrc} />
        </div>
      )}
    </div>
  );
};

export default MainHeader;
