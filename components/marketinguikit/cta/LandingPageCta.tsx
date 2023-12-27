import { useContext } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

function LandingPageCta() {
  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);

  const staticItem01 = readyDatasrc[0];

  const router = useRouter();

  return (
    <section className="max-w-lpcontainer  mx-auto lg:mt-[80px] xs:mt-[50px] lg:px-0 xs:px-4">
      <div className="max-w-[920px] text-center mx-auto">
        {/* <h1 className="lg:text-[44px] xs:text-3xl font-bold">
          Хэрхэн <span className="text-[#009BDE]"> хөгжүүлэгч</span> болох вэ?
        </h1> */}
        <RenderAtom
          item={{ value: widgetnemgooReady?.title }}
          renderType="title"
          customClassName={"lg:text-[44px] xs:text-[36px]"}
        />
        <RenderAtom
          item={{ value: widgetnemgooReady?.subtitle }}
          renderType="text"
          customClassName={"w-full lg:text-base xs:text-xl opacity-50"}
        />
      </div>

      {readyDatasrc.map((item: any, i: number) => {
        const media = (image: String) => {
          return (
            <div
              className="relative w-full md:w-1/2 px-6 py-10 lg:block xs:hidden"
              key={i}
            >
              <RenderAtom
                item={image}
                renderType="image"
                customClassName={""}
              />
            </div>
          );
        };
        const content = (
          title: String,
          text: String,
          button: any,
          link: any
        ) => {
          return (
            <div className="flex flex-col justify-center w-full md:w-1/2 px-4 md:pr-12 lg:py-0 xs:py-11">
              <div className="pl-4 flex flex-col justify-evenly h-[55%]">
                <RenderAtom
                  item={title}
                  renderType="title"
                  customClassName={"text-[#2C2C51] lg:text-[44px] xs:text-3xl"}
                />
                <RenderAtom
                  item={text}
                  renderType="text"
                  customClassName={`text-base text-[#7B7B93] overflow-hidden mt-[20px]`}
                  // customStyle={{
                  //   textOverflow: "ellipsis",
                  //   display: "-webkit-box",
                  //   // WebkitLineClamp: "2",
                  //   WebkitBoxOrient: "vertical",
                  // }}
                />

                <div>
                  <RenderAtom
                    item={button}
                    renderType="button"
                    customClassName={
                      "font-bold bg-[#0C529D] rounded-[30px] text-[#FFFFFF] px-[30px] py-[14px] text-[18px] mt-[60px]"
                    }
                    customStyle={{ fontSize: "18px" }}
                    onClick={() =>
                      router.push({
                        pathname: `/${link}`,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          );
        };
        const mixedContent = () => {
          if (i === 0) {
            return (
              <div className="flex flex-col md:flex-row justify-between mt-10 mb-5">
                {media(item?.position2)}
                {content(
                  item?.position1,
                  item?.position3,
                  item?.position10,
                  item?.link
                )}
              </div>
            );
          } else if (i === 1) {
            return (
              <div className="flex flex-col md:flex-row  justify-between">
                {content(
                  item?.position1,
                  item?.position3,
                  item?.position10,
                  item?.link
                )}
                {media(item?.position2)}
              </div>
            );
          } else if (i === 2) {
            return (
              <div className="flex flex-col md:flex-row  justify-between mb-10 mt-5">
                {media(item?.position2)}
                {content(
                  item?.position1,
                  item?.position3,
                  item?.position10,
                  item?.link
                )}
              </div>
            );
          }
        };
        return mixedContent();
      })}
    </section>
  );
}

export default LandingPageCta;
