import React, { useState, useEffect, useContext } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import { useRouter } from "next/router";
import useSWR from "swr";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import _ from "lodash";
import moment from "moment";
import { listToTree } from "@/utils/helper";

export default function ItemDetail() {
  const router = useRouter();
  const filterId = router.query?.id || "169632082289510";

  const { config, readyDatasrc, widgetnemgooReady, positionConfig } =
    useContext(WidgetWrapperContext);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const treeReadyDatasrc: any = listToTree(readyDatasrc, {
    idKey: "id",
    parentKey: "parentid",
    childrenKey: "children",
  });

  const handleScroll = (): void => {
    const sections: NodeListOf<HTMLElement> =
      document.querySelectorAll('div[id^="section"]');
    const scrollPosition: number = window.scrollY;
    let currentSection: string | null = null;
    sections.forEach((section) => {
      const sectionTop: number = section.offsetTop;
      const sectionHeight: number = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });
    if (currentSection) {
      setActiveSection(currentSection);
    }
  };
  const filtered1 = treeReadyDatasrc.filter((data: any) => {
    return data.id == filterId;
  });

  const mainData = filtered1[0];
  const contentData = mainData?.children;
  console.log("object :>> ", contentData);

  const handleMenuItemClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const offset = 100; // Adjust this offset as needed
      const scrollPosition = section.offsetTop - offset;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });

      setActiveSection(sectionId);
    }
    setActiveSection(sectionId);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col w-full container mx-auto relative">
      <div className="flex flex-row gap-[40px] cursor-pointer w-full h-[365px] container">
        <div className="flex-none w-[590px] h-[365px] object-cover rounded-[20px]">
          <RenderAtom
            item={
              mainData?.position2 || {
                value: mainData?.mainimg,
              }
            }
            renderType="image"
            customClassName={
              "w-[590px] h-[365px] object-cover rounded-[20px] flex-none"
            }
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-[10px]">
          <div className="flex flex-col justify-center items-start gap-5 w-full max-w-[630px]">
            <RenderAtom
              renderType="text"
              item={{
                value: moment(
                  mainData?.position5?.value || mainData?.createddate
                ).format("YYYY-MM-DD"),
              }}
              customClassName={"text-base font-bold text-[#0C529D]"}
            />
            <RenderAtom
              renderType="title"
              item={mainData?.position1 || { value: mainData?.title }}
              customProps={{
                truncateRow: 2,
              }}
              customClassName={
                "text-[40px] font-bold leading-[43px] text-[#3C3C3C]"
              }
            />
            <RenderAtom
              renderType="text"
              item={mainData?.position3 || { value: mainData?.description }}
              customClassName={
                "text-base leading-[26px] text-[#67748E] text-start line-clamp-4 w-full  font-normal"
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-[60px] py-20  ">
        <div className="flex flex-col w-full max-w-[340px] sticky top-24 h-full ">
          {contentData?.map((item: any, index: any) => {
            return (
              <span
                onClick={() => handleMenuItemClick(`section${index}`)}
                key={index}
                className={`border-b py-5 last:border-b-0 first:pt-0 cursor-pointer  ${
                  activeSection === `section${index}`
                    ? "text-[#0C529D] font-semibold"
                    : "text-[#3C3C3C] font-normal"
                }`}
              >
                <RenderAtom
                  renderType="text"
                  item={{
                    value: item.title,
                  }}
                  customClassName={`text-base leading-[20px]  text-start w-full `}
                />
              </span>
            );
          })}
        </div>
        <div className={`flex flex-col w-full gap-14  list-styled`}>
          {contentData?.map((item: any, index: number) => {
            // console.log("item :>> ", item);
            return (
              <div
                id={`section${index}`}
                key={index}
                className={`flex flex-col w-full gap-5`}
              >
                <RenderAtom
                  renderType="title"
                  item={
                    item?.position1 || {
                      value: item.title,
                    }
                  }
                  customClassName={`text-[40px] leading-[115%] font-medium ${
                    activeSection === `section${index}`
                      ? "text-[#0C529D]"
                      : "text-[#3C3C3C]"
                  }`}
                />
                <RenderAtom
                  item={
                    item?.position2 || {
                      value: item?.mainimg,
                    }
                  }
                  renderType="image"
                  customClassName={"w-full h-[195px] object-cover"}
                />
                <RenderAtom
                  renderType="text"
                  item={
                    item?.position || {
                      value: item.description,
                    }
                  }
                  customClassName={
                    "text-base leading-[26px] text-[#67748E] text-start  w-full font-normal"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
