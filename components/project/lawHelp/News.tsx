import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";
import _ from "lodash";

type PropsType = {
    options?: any;
    data?: any;
  };
const News: FC<PropsType> = ({ options, data }) => {
    const dataisfeatured = _.filter(data, {
        isfeatured: 1,
    });
   
    let dataSrcData: any =  dataisfeatured?.[0];
    let redata = /(?:\.([^.]+))?$/;
    let extention = redata.exec(dataSrcData?.mainimg);
    let newArr = _.map(data, (o) => _.pick(o, ["typename"]));
    let grouped = _.keys(_.mapValues(_.groupBy(newArr, "typename")));
    const [active, setActive] = useState(0);
    const [filterItem, setFilterItem]: any = useState(grouped[0] || "Шинэ мэдээ");
    let filtered: any = [];
    grouped.forEach((x) => {
      if (!x.includes("null")) filtered.push(x);
    });
    const onFilterEvent = (e: any, item: any) => {
      e.preventDefault();
      setFilterItem(item);
    };
  
    const selectdata = _.filter(data, {
      typename: filterItem,
    });
    let dataSrc: any = filterItem !== "Бүгд" ? selectdata : data;
    
    return (
        <>
            <div className="py-10 px-5">
                {dataSrcData && (
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="relative w-full md:w-1/2 px-6 md:py-3 sm:py-1  xs:py-0 col-span-6">
                            {dataSrcData.mainimg && (
                                <div className="flex-none w-full">
                                    <RenderAtom
                                    renderType="image"
                                    item={{value: `${extention?.[0] === ".pdf" ? "https://dev.veritech.mn/storage/uploads/process/202401/file_1704250609504314_17037094337197351.jpg" : dataSrcData.mainimg}`}}
                                    customClassName= {`w-full md:min-h-[167px] md:max-h-[330px] h-full rounded-t-lg md:rounded-l-lg`}
                                    />
                                </div>
                            ) || (
                                <div className="flex-none w-full">
                                    <RenderAtom
                                    renderType="image"
                                    item={{value: `https://dev.veritech.mn/storage/uploads/process/202401/file_1704250609504314_17037094337197351.jpg`}}
                                    customClassName= {`w-full md:min-h-[167px] md:max-h-[330px] h-full rounded-t-lg md:rounded-l-lg`}
                                    />
                                </div>
                            )}  
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 px-6 md:py-3 sm:py-1  xs:py-0 justify-between">
                            <div className="flex flex-col justify-center py-5">
                            <RenderAtom
                                item={{
                                value: dataSrcData?.title,
                                }}
                                renderType="title"
                                customClassName={
                                "lg:text-[40px] sm:text-[36px] xs:text-[32px] lg:font-bold sm:font-medium xs:font-normal leading-[115%] text-[#003378] line-clamp-3"
                                }
                            />
                            <RenderAtom
                                item={{
                                value: dataSrcData?.description,
                                }}
                                renderType="title"
                                customClassName={
                                "lg:text-[16px] sm:text-[14px] xs:text-[12px] text-[#3C3C3C] leading-[162%] line-clamp-2 py-5"
                                }
                            />
                            </div>
                            <Link href={`/news/detail?id=${dataSrcData?.id}`} >
                                <span className= "bg-[#003378] hover:bg-[#0E430D] text-white font-normal md:px-[30px] px-7 py-3.5 rounded-[30px] md:text-[18px] text-[16px] leading-[22px]">
                                    Дэлгэрэнгүй
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        
            <div className="container mx-auto">
                <div className="w-full flex flex-row justify-between items-center  col-span-12 container  px-2 py-4 pb-8">
                    <ul className="sm:text-justify xs:text-justify items-center w-max text-[#67748E] space-x-5
                    flex xl:overflow-hidden lg:overflow-scroll xs:overflow-scroll
                    ">
                        {grouped.map((item: any, index: any) => {
                            return (
                            <li 
                                key={index}
                                className={`list-item cursor-pointer px-2 font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 text-[#003378]
                                ${
                                    filterItem == item && "border-b-2 border-[#003378]"
                                }`}
                                onClick={(e: any) => {
                                    onFilterEvent(e, item);
                                }}
                                >
                                <span onClick={() => setActive(0)}>
                                    {item === "undefined" ? "" : item}
                                </span>
                            </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] pb-[92px]">
                {dataSrc?.map((item: any, index: number) => {
                    let re = /(?:\.([^.]+))?$/;
                    let ext = re.exec(item.mainimg);  
                    return (
                        <div key={index} className="flex flex-col bg-white rounded-[10px]">
                            {item.mainimg && (
                                <div className="flex-none w-full h-[195px]">
                                    <RenderAtom
                                    renderType="image"
                                    item={{value: `${ext?.[0] === ".pdf" ? "https://dev.veritech.mn/storage/uploads/process/202401/file_1704250609504314_17037094337197351.jpg" : item.mainimg}`}}
                                    customClassName= {`w-full h-[200px] cursor-pointer rounded-t-[20px]`}
                                    />
                                </div>
                            ) || (
                                <div className="flex-none w-full h-[195px]">
                                    <RenderAtom
                                    renderType="image"
                                    item={{value: `https://dev.veritech.mn/storage/uploads/process/202401/file_1704250609504314_17037094337197351.jpg`}}
                                    customClassName= {`w-full h-[200px] cursor-pointer rounded-t-[20px]`}
                                    />
                                </div>
                            )} 
                            <div className="flex flex-col gap-2.5 justify-between w-full p-5 h-full">
                                <Link key={index} href={`/news/detail?id=${item?.id}`}>
                                    <span className= "md:text-xl text-lg font-semibold text-[#003378] line-clamp-2">
                                        {item?.title}
                                    </span>
                                </Link>
                                <RenderAtom
                                renderType="text"
                                item={{ value:`Нийтлэгдсэн огноо: ${item?.createddate}`}}
                                customClassName="md:text-base text-sm font-normal text-[#3C3C3C] line-clamp-3"
                                />
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        </>
    );

};
export default News;