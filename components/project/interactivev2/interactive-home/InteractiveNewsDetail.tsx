import React, { useState, useEffect } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function InteractiveNewsDetail() {
  const router = useRouter();
  const filterId = router.query?.id;
  const command = "169466326678510";

  const criteria = `&criteria=${JSON.stringify({
    id: filterId,
  })}`;
  const criteriaParent = `&criteria=${JSON.stringify({
    parentid: filterId,
  })}`;
  const { data: dataSrc } = useSWR(
    `/api/get-data?metaid=${command}${criteria}`
  );
  const { data: contentDataSrc } = useSWR(
    `/api/get-data?metaid=${command}${criteriaParent}`
  );

  const mainData = dataSrc?.result[0];
  const contentData = contentDataSrc?.result;

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleScroll = (): void => {
    const sections: NodeListOf<HTMLElement> =
      document.querySelectorAll('div[id^="section"]');

    // Calculate the current scroll position
    const scrollPosition: number = window.scrollY;

    // Find the section that is currently in the viewport
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
    // Update the state with the ID of the active section
  };

  const handleMenuItemClick = (sectionId: string) => {
    // Find the section by ID
    const section = document.getElementById(sectionId);

    if (section) {
      // Calculate the scroll position with an offset to ensure the section is fully visible
      const offset = 100; // Adjust this offset as needed
      const scrollPosition = section.offsetTop - offset;
      console.log("object :>> ", scrollPosition);

      // Scroll to the section with smooth behavior when a menu item is clicked
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });

      // Update the active section

      setActiveSection(sectionId);
    }
    setActiveSection(sectionId);
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col w-full container mx-auto relative">
      <div className="flex flex-row gap-[40px] cursor-pointer w-full h-[365px] container">
        <div className="flex-none w-[590px] h-[365px] object-cover rounded-[20px]">
          <RenderAtom
            item={{
              value: mainData?.mainimg,
            }}
            renderType="image"
            customClassName={
              "w-[590px] h-[365px] object-cover rounded-[20px] flex-none"
            }
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-[10px]">
          <div className="flex flex-col justify-center items-start gap-5 w-full max-w-[630px]">
            <RenderAtom
              renderType="title"
              item={{
                value: mainData?.createddate,
              }}
              customClassName={"text-base font-bold text-[#0C529D]"}
            />
            <RenderAtom
              renderType="title"
              item={{ value: mainData?.title }}
              customProps={{
                truncateRow: 2,
              }}
              customClassName={"text-[40px] font-bold text-[#3C3C3C]"}
            />
            <RenderAtom
              renderType="text"
              item={{ value: mainData?.description }}
              customClassName={
                "text-base leading-[26px] text-[#67748E] text-start line-clamp-4 w-full  font-normal"
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-[60px] py-20  ">
        <div className="flex flex-col w-full max-w-[340px] sticky top-24 h-full">
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
        <div className={`flex flex-col w-full gap-14 `}>
          {contentData?.map((item: any, index: number) => {
            return (
              <div
                id={`section${index}`}
                key={index}
                className={`flex flex-col w-full gap-5`}
              >
                <RenderAtom
                  renderType="title"
                  item={{
                    value: item.title,
                  }}
                  customClassName={`text-[40px] leading-[115%] font-medium ${
                    activeSection === `section${index}`
                      ? "text-[#0C529D]"
                      : "text-[#3C3C3C]"
                  }`}
                />
                <RenderAtom
                  renderType="text"
                  item={{
                    value: item.description,
                  }}
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
