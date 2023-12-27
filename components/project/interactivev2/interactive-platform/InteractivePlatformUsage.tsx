import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";

import useSWR from "swr";
import ErpCard from "@/components/default/custom/card/erpCard";
import ErpArticle from "@/components/custom/article/erpArticle";
import ErpPlatformSlider from "@/components/custom/swiper/erpPlatformSlider";

export default function InteractivePlatformUsage() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);

  const usageErpCard = "169307948305510";
  const { data: erpCardData } = useSWR(`/api/get-data?metaid=${usageErpCard}`);

  const usagePlatformErpCard = "169308038291010";
  const { data: erpPlatformCardData } = useSWR(
    `/api/get-data?metaid=${usagePlatformErpCard}`
  );

  const usageRandomErpCard = "169308079108310 ";
  const { data: randomErpCardData } = useSWR(
    `/api/get-data?metaid=${usageRandomErpCard}`
  );

  const usageSecurityErpCard = "169308106892110 ";
  const { data: securityErpCardData } = useSWR(
    `/api/get-data?metaid=${usageSecurityErpCard}`
  );

  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex flex-col py-20 gap-20">
        <div className="flex container justify-center text-center items-center mx-auto">
          <ErpArticle
            pDataSrc={widgetnemgooReady?.usageErpArticle?.data}
            pOptions={widgetnemgooReady?.usageErpArticle?.options}
          />
        </div>
        <div className="relative flex container mx-auto">
          <ErpCard
            pOptions={widgetnemgooReady?.usageErpCard?.options}
            pDataSrc={erpCardData?.result}
          />
        </div>
      </div>

      <div className="relative flex w-full bg-[#ECEFF8] py-20">
        <div className="container mx-auto">
          <ErpCard
            pOptions={widgetnemgooReady?.usagePlatformErpCard?.options}
            pDataSrc={erpPlatformCardData?.result}
          />
        </div>
      </div>
      <div className="relative flex w-full py-20">
        <div className="container mx-auto">
          <ErpCard
            pOptions={widgetnemgooReady?.usageRandomErpCard?.options}
            pDataSrc={randomErpCardData?.result}
          />
        </div>
      </div>
      <div
        className="relative flex flex-col w-full py-20 gap-20"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dzih5nqhg/image/upload/v1698043793/ssss_b4s41n.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex container justify-center text-center items-center mx-auto">
          <ErpArticle
            pDataSrc={widgetnemgooReady?.usageSecurityErpArticle?.data}
            pOptions={widgetnemgooReady?.usageSecurityErpArticle?.options}
          />
        </div>
        <div className="container mx-auto">
          <ErpCard
            pOptions={widgetnemgooReady?.usageSecurityErpCard?.options}
            pDataSrc={securityErpCardData?.result}
          />
        </div>
      </div>

      <div className="relative flex flex-col w-full py-20 gap-20">
        <div className="flex container justify-center text-center items-center mx-auto">
          <ErpArticle
            pDataSrc={widgetnemgooReady?.usageLastErpArticle?.data}
            pOptions={widgetnemgooReady?.usageLastErpArticle?.options}
          />
        </div>
        <div className="col-span-12 container mx-auto">
          <ErpPlatformSlider
            pDataSrc={widgetnemgooReady?.usageSliderPlatform?.data}
            pOptions={widgetnemgooReady?.usageSliderPlatform?.options}
          />
        </div>
      </div>
    </div>
  );
}
