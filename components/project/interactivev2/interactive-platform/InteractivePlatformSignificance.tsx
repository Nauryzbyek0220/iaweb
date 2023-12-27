import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";

import useSWR from "swr";
import ErpCard from "@/components/default/custom/card/erpCard";
import ErpArticle from "@/components/custom/article/erpArticle";

export default function InteractivePlatformSignificance() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);

  const erpCardDv = "169308521435110";
  const significancePartnersErpCardDv = "169308555776110";
  const section3Dv = "169308575035410";
  const { data: erpCardData } = useSWR(`/api/get-data?metaid=${erpCardDv}`);
  const { data: significancePartnersErpCardData } = useSWR(
    `/api/get-data?metaid=${significancePartnersErpCardDv}`
  );
  const { data: section3Data } = useSWR(`/api/get-data?metaid=${section3Dv}`);

  return (
    <div className="flex flex-col w-full bg-white">
      <div className="relative flex flex-row gap-3 container mx-auto pt-10 pb-20">
        <ErpCard
          pOptions={widgetnemgooReady?.significanceErpCardOptions?.options}
          pDataSrc={erpCardData?.result}
        />
      </div>
      <div className="flex flex-col bg-[#181B34] py-20">
        <div className="flex container justify-center text-center items-center mx-auto">
          <ErpArticle
            pDataSrc={widgetnemgooReady?.significancePartners?.data}
            pOptions={widgetnemgooReady?.significancePartners?.options}
          />
        </div>
        <div className="relative flex container mx-auto">
          <ErpCard
            pOptions={widgetnemgooReady?.significancePartnersErpCard?.options}
            pDataSrc={significancePartnersErpCardData?.result}
          />
        </div>
      </div>
      <div className="flex container justify-center text-center items-center mx-auto pt-20">
        <ErpArticle
          pDataSrc={widgetnemgooReady?.significanceSection3ErpArticle?.data}
          pOptions={widgetnemgooReady?.significanceSection3ErpArticle?.options}
        />
      </div>
      <div className="relative flex flex-row gap-3 container mx-auto py-20">
        <ErpCard
          pOptions={widgetnemgooReady?.significanceSection3ErpCard?.options}
          pDataSrc={section3Data?.result}
        />
      </div>
    </div>
  );
}
