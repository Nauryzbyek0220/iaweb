import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";
import _ from "lodash";
import useSWR from "swr";
import { useRouter } from "next/router";

type PropsType = {
    options?: any;
    data?: any;
  };
const Management: FC<PropsType> = ({ options, data }) => {

    const router = useRouter();
    const filterId = router.query?.id;
    let idFilter = 17049685068529;
    const command = "LAC_ECM_NEWS_DV_004";
    const parameters = `&parameters=${JSON.stringify({
      id: filterId,
    })}`;
    const { data: getdataSrc } = useSWR(
      `/api/get-process?processcode=${command}${parameters}`
    );

    const lac_ecm_news = getdataSrc?.lac_ecm_news;
    
    let newArr = _.map(lac_ecm_news, (o) => _.pick(o, ["title"]));
    let grouped = _.keys(_.mapValues(_.groupBy(newArr, "title")));
    const [active, setActive] = useState(0);
    const [filterItem, setFilterItem]: any = useState(grouped[0] || "Удирдлага");
    
    if (filterItem == "Удирдлага") {
        idFilter = 17049685068529;
      } else if (filterItem == "Хэлтсийн дарга") {
        idFilter = 17034812168219;
    }
    
    const parametersFilter = `&parameters=${JSON.stringify({
        id: idFilter,
    })}`;

    const { data: getdataSrcFilter } = useSWR(
        `/api/get-process?processcode=${command}${parametersFilter}`
    );

    const dataSrc = getdataSrcFilter?.lac_ecm_news;
    
    let filtered: any = [];
        grouped.forEach((x) => {
        if (!x.includes("null")) filtered.push(x);
    });

    const onFilterEvent = (e: any, item: any) => {
      e.preventDefault();
      setFilterItem(item);
    };
  
    return (
        <div className="container mx-auto">
            <div className="w-full flex col-span-12 container pt-[60px] pb-[85px]">
                <ul className="flex w-full justify-around text-[#003378] bg-white rounded-lg">
                    {grouped.map((item: any, index: any) => {
                        return (
                        <li 
                            key={index}
                            className={`list-item cursor-pointer font-[700] md:text-[16px] sm:text-[14px] xs:text-[12px] py-5 text-[#585858]
                            ${
                                filterItem == item && "border-b-2 border-[#003378]"
                              }`}
                            onClick={(e: any) => {
                                onFilterEvent(e, item);
                            }}
                            >
                            <span onClick={() => setActive(index)}>
                                {item === "undefined" ? "" : item}
                            </span>
                        </li>
                          );
                    })}
                </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pb-[80px]"> 
            {dataSrc?.map((item: any, index: number) => {
                return (
                <Link key={index} href={`about/management/detail?id=${item?.id}`}>
                    <div className="flex flex-colrounded-[10px] p-1 bg-white h-full">
                        <div className="py-[36px] px-[24px] w-full" style={{ backgroundImage: `url(/Vector.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover", }}>
                            <RenderAtom
                            renderType="image"
                            item={{value: item.imgurl}}
                            customClassName={
                                "w-full h-[160px] cursor-pointer rounded-[50%]"
                            }
                            />
                            <div className="py-5 text-center">
                                <RenderAtom
                                renderType="text"
                                item={{ value: item?.title }}
                                customClassName="text-[16px] text-[#000]"
                                />
                            </div>
                            <div className="w-[46px] mx-auto h-[2px] bg-[#003378]"></div>
                            <div className="py-5 mx-auto text-[#585858] text-[14px] leading-[20px] font-base text-center flow-root">
                                <span className="">Ажилласан жил</span>
                                <RenderAtom
                                renderType="text"
                                item={{ value: item?.date || item?.body}}
                                customClassName="mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </Link>
                );
            })}
            </div>
        </div>
    );
};
export default Management;