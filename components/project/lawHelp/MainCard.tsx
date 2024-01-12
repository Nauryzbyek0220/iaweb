import { FC, useState } from "react";
import React from "react";
import _ from "lodash";
import RenderAtom from "@/components/common/atom/renderAtom";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import TrainigDetail from "./trainingDetail";
import Training from "./Training";
import ManagementDetail from "./ManagementDetail";
import Legal from "./Legal";
import Management from "./Management";
import LawHomeTable from "./lawHomeTable";
import News from "./News";
import NewsDetail from "./newsdetail";
import Contact from "./Contact";
import ContactDetail from "./ContactDetail";
import useSWR from "swr";

type PropsType = {
  options?: any;
  data?: any;
};

const MainCard: FC<PropsType> = ({ options, data }) => {
  const router = useRouter();
  const filterId = router.query?.id;
  const command = "LAC_ECM_NEWS_DV_004";
  const parameters = `&parameters=${JSON.stringify({
    id: filterId,
  })}`;

  const { data: getdataSrc } = useSWR(
    `/api/get-process?processcode=${command}${parameters}`
  );
  
  const lac_ecm_news = getdataSrc?.lac_ecm_news;
  const lacMap = lac_ecm_news || data;
    console.log(getdataSrc);
    
  let newArr = _.map(data, (o) => _.pick(o, ["categorydesc"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categorydesc")));
  const [active, setActive] = useState(0);
  const [filterItem, setFilterItem]: any = useState(grouped[0] || "Бүгд");

  let filtered: any = [];
  grouped.forEach((x) => {
    if (!x.includes("null")) filtered.push(x);
  });

  const onFilterEvent = (e: any, item: any) => {
    e.preventDefault();
    setFilterItem(item);
  };

  const selectdata = _.filter(data, {
    categorydesc: filterItem,
  });

  let dataSrc: any = filterItem !== "Бүгд" ? selectdata : data;
  const route = useRouter();
  const settings = options?.custom;

  const content = () => {
    switch (settings?.style) {
      case "bestCard":
        return (
          <div className="py-10 px-5">
            {data?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between mt-2"
                >
                  <div className="relative w-full md:w-1/2 px-6 md:py-3 sm:py-1  xs:py-0 col-span-6">
                    <RenderAtom
                      renderType="image"
                      customClassName={
                        "w-full md:min-h-[167px]  h-full rounded-t-lg md:rounded-l-lg"
                      }
                      item={{
                        value: item?.mainimage,
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2 px-6 md:py-3 sm:py-1  xs:py-0 mb-0 mt-auto">
                    <div className="flex flex-col justify-center py-5">
                      <RenderAtom
                        item={{
                          value: item?.title,
                        }}
                        renderType="title"
                        customClassName={
                          "lg:text-[40px] sm:text-[36px] xs:text-[32px] lg:font-bold sm:font-medium xs:font-normal leading-[115%] text-[#003378] line-clamp-3"
                        }
                      />
                      <RenderAtom
                        item={{
                          value: item?.description,
                        }}
                        renderType="title"
                        customClassName={
                          "lg:text-[16px] sm:text-[14px] xs:text-[12px] text-[#3C3C3C] leading-[162%] line-clamp-2 py-5"
                        }
                      />
                    </div>
                    <Link key={index} target={item?.props} href={item?.url}>
                      <RenderAtom
                        item={{
                          value: item?.button,
                        }}
                        renderType="button"
                        customClassName={
                          "bg-[#003378] hover:bg-[#0E430D] text-white font-normal md:px-[30px] px-7 py-3.5 rounded-[30px] md:text-[18px] text-[16px] leading-[22px]"
                        }
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case "grid":
        return <News data={data} options={options} />;
      case "card":
        return <LawHomeTable data={data} options={options} />;
      case "image":
        return (
          <div className="container mx-auto py-[80px]">
            <div className="md:flex gap-[113px] mx-auto justify-center">
              {data?.map((item: any, index: number) => {
                return (
                  <Link key={index} href={`/data?id=${item?.url}`}>
                    <div className="w-full h-[350px]">
                      <RenderAtom
                        renderType="image"
                        item={{ value: item.img }}
                        customClassName={"cursor-pointer"}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );

      case "button":
        return (
          <div className="container mx-auto pb-[80px]">
            <div className="w-full flex flex-row justify-between items-center  col-span-12 container  px-2 py-4 pb-8">
              <ul className="flex sm:text-justify xs:text-justify items-center w-max text-[#67748E] space-x-5">
                {grouped.map((item: any, index: any) => {
                  return (
                    <li
                      key={index}
                      className={`list-item cursor-pointer px-2 font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 text-[#003378]
                                    ${
                                      filterItem == item &&
                                      "border-b-2 border-[#003378]"
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
            <div className="md:flex gap-[50px]">
              {dataSrc?.map((item: any, index: number) => {
                return (
                  <Link key={index} href={`news/detail?id=${item?.url}`}>
                    <div className="flex-none w-full h-[200px]">
                      <RenderAtom
                        renderType="image"
                        item={{ value: item.btnImage }}
                        customClassName={"w-full h-[200px] cursor-pointer"}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );

      case "aboutPosition":
        return (
          <div className="pb-[80px] container mx-auto md:flex flex-row">
            <div className="w-full md:w-6/12 md:pb-0 pb-3">
              <div className="flex content-center">
                <RenderAtom
                  renderType="image"
                  item={{ value: getdataSrc?.imgurl }}
                  customClassName={"max-w-[364px] max-h-[364px] min-w-[364px] min-h-[364px]"}
                />
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:py-3 sm:py-1 xs:py-0 my-auto">
              {lacMap?.map((item: any, index: number) => {
                return (
                  <div className="flex flex-col justify-center" key={index}>
                    <RenderAtom
                      item={{ value: item?.title }}
                      renderType="title"
                      customClassName={
                        "lg:text-[32px] sm:text-[28px] xs:text-[24px] lg:font-bold sm:font-medium xs:font-normal text-[#003378]"
                      }
                    />
                    <RenderAtom
                      item={{ value: item?.body }}
                      renderType="title"
                      customClassName={
                        "lg:text-[16px] sm:text-[14px] xs:text-[12px] text-[#3C3C3C] leading-[162%] py-5"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "aboutCard":
        return <Management data={data} options={options} />;
      case "cardLegal":
        return <Legal data={dataSrc} options={options} />;
      case "cardDetail":
        return <ManagementDetail data={data} options={options} />;
      case "trainingCard":
        return <Training data={data} options={options} />;
      case "trainingDetail":
        return <TrainigDetail data={data} options={options} />;
      case "newsDetail":
        return <NewsDetail data={data} options={options} />;
      case "contact":
        return <Contact data={data} options={options} />;
      case "contactDetail":
        return <ContactDetail data={data} options={options} />;
      default:
        return <></>;
    }
  };

  return <>{content()}</>;
};

export default MainCard;
