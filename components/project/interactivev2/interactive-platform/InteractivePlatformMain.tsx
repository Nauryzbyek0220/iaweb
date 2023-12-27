import useSWR from "swr";
import _ from "lodash";
import ErpCard from "@/components/default/custom/card/erpCard";
import ErpSliderBanner from "@/components/custom/banner/erpSliderBanner";
import ErpArticle from "@/components/custom/article/erpArticle";
import ErpBannerOne from "@/components/custom/banner/erpBannerOne";
import ErpPlatformSlider from "@/components/custom/swiper/erpPlatformSlider";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";

export default function InteractivePlatformMain() {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);

  const command = "169306950073710";
  const command2 = "169306996022110";
  const command3 = "169307123787410";
  const mobileDeveloperCommand = "169307430435810";
  const biCommand = "169307683054910";

  const { data: sectionOneData } = useSWR(`/api/get-data?metaid=${command}`);
  const { data: sectionFiveData } = useSWR(`/api/get-data?metaid=${command2}`);
  const { data: sectionDataIntegration } = useSWR(
    `/api/get-data?metaid=${command3}`
  );
  const { data: sectionMobileDeveloper } = useSWR(
    `/api/get-data?metaid=${mobileDeveloperCommand}`
  );
  const { data: sectionBi } = useSWR(`/api/get-data?metaid=${biCommand}`);
  const sectionThreeData = sectionOneData?.result?.slice(1);

  const section4Options = {
    className: "",
    extraClassName: "flex flex-col gap-y-5 justify-center items-center",
    titleClassName:
      "xs:text-[24px] md:text-[40px] text-[#3C3C3C]  md:leading-[47px] xs:leading-[30px] font-bold",
    descClassName:
      "text-[#67748E] text-base  leading-6 md:leading-8 font-normal",
    cardType: "randomPosition",
    startPosition: "right",
  };

  return (
    <div className="flex relative bg-white flex-col w-full py-10 gap-10">
      <div className="relative flex flex-col container mx-auto">
        <ErpCard
          pDataSrc={sectionOneData?.result}
          pOptions={widgetnemgooReady?.mainFirstSectionOptions}
        />
      </div>
      <div className="relative flex flex-col">
        <ErpSliderBanner
          pOptions={widgetnemgooReady?.mainEprSliderBanner?.options}
          pDataSrc={widgetnemgooReady?.mainEprSliderBanner?.data}
        />
      </div>
      <div className="flex container justify-center text-center items-center mx-auto py-10">
        <ErpArticle
          pDataSrc={widgetnemgooReady?.mainDigitalErpArtcle?.data}
          pOptions={widgetnemgooReady?.mainDigitalErpArtcle?.options}
        />
      </div>
      <div className="relative flex flex-col container mx-auto">
        <ErpCard pDataSrc={sectionThreeData} pOptions={section4Options} />
      </div>
      <div className="relative flex flex-col w-full">
        <ErpBannerOne
          pDataSrc={sectionFiveData?.result}
          pOptions={widgetnemgooReady?.mainErpOneBannerOptions}
        />
      </div>
      <div className="flex container justify-center text-center items-center mx-auto pt-10">
        <ErpArticle
          pDataSrc={widgetnemgooReady?.mainArticle?.data}
          pOptions={widgetnemgooReady?.mainArticle?.options}
        />
      </div>
      <div className="flex flex-col gap-5 w-full py-10">
        <div className="col-span-12 container mx-auto">
          <ErpPlatformSlider
            pDataSrc={widgetnemgooReady?.erpPlatformData?.data}
            pOptions={widgetnemgooReady?.erpPlatformData?.options}
          />
        </div>
      </div>
      <div
        className="flex flex-col gap-5 w-full py-10"
        style={{
          backgroundImage: "url(/images/platformBanner.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto">
          <ErpCard
            pDataSrc={sectionDataIntegration?.result}
            pOptions={widgetnemgooReady?.mainDataIntegration?.options}
          />
        </div>
      </div>
      <div className="flex container justify-center text-center items-center mx-auto pt-10">
        <ErpArticle
          pDataSrc={widgetnemgooReady?.mainMobileArticle?.data}
          pOptions={widgetnemgooReady?.mainMobileArticle?.options}
        />
      </div>
      <div className="container mx-auto py-10">
        <ErpCard
          pOptions={widgetnemgooReady?.mainMobileErCardOptions?.options}
          pDataSrc={sectionMobileDeveloper?.result}
        />
      </div>
      <div
        className="flex flex-col pt-10 gap-20"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dzih5nqhg/image/upload/v1692694977/Group_22015_mgzt5b.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex container justify-center text-center items-center mx-auto pt-10">
          <ErpArticle
            pDataSrc={widgetnemgooReady?.mainBiErpArticle?.data}
            pOptions={widgetnemgooReady?.mainBiErpArticle?.options}
          />
        </div>
        <div className="container mx-auto pb-20">
          <ErpCard
            pOptions={widgetnemgooReady?.mainBiErpCard?.options}
            pDataSrc={sectionBi?.result}
          />
        </div>
      </div>
    </div>
  );
}
