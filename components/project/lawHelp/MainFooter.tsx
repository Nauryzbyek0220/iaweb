import { useContext, FC, useRef } from "react";
import _ from "lodash";
import Link from "next/link";
import Image from "next/image";

type PropsType = {
    options?: any;
  };
  
const MainFooter: FC<PropsType> = ({ options }) => {
    let w60: string = "w-6/12";

    return (
        <div className="">
            <div className="bg-white container mx-auto ">
                <div className="md:flex">
                    <div className={`md:${w60} w-full px-5`}>
                        <div className="pt-[80px] pb-[44px]">
                            <div className="flex items-center">
                                <Link href="/">
                                    <Image
                                        src={"/lawHelp.png"}
                                        alt="logo"
                                        width={94}
                                        height={94}
                                    />
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
                        {options.data?.map((row: any, index: number) => {
                            return (
                                <div key={index} className="flex pb-[19px] gap-2.5">
                                    <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center rounded-lg border border-[#003378]">
                                        <div> 
                                            <i className={`${row?.iconImage} text-[10px]`} ></i>
                                        </div>
                                    </div>
                                    <div className="text-[16px] cursor-pointer leading-[20px] text-[#585858]">
                                        {row?.desc}
                                    </div>
                                </div>
                            );
                        })} 
                        <div className="py-8">
                            <div className="h-[2px] md:w-[400px] sm:w-[250px] bg-[#003378]"></div>
                        </div>
                        <div className="flex flex-row gap-x-4 pb-20">
                            {options.urlData?.map((row: any, index: number) => {
                                return (
                                    <div key={index} className="min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] flex items-center justify-center rounded-full border border-white bg-[#003378]">
                                        <div> 
                                            <i className={`${row?.iconName}`} div-name={`${row?.url}`}></i>
                                        </div>
                                    </div>
                                );
                            })} 
                        </div>
                    </div>
                    <div className={`md:${w60} w-full px-5`}>
                        <div className="pt-[80px] pb-[44px]">
                            <span>map</span>
                        </div>
                    </div>
               </div>
            </div>
            <div className="h-[50px] bg-[#003378]">
            </div>
        </div>
    );
};

export default MainFooter