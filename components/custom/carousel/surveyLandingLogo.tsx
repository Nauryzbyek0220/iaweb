import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import BlockDiv from "@/components/common/block/blockDiv";

function SurveyLandingLogo() {
  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);
  const item = readyDatasrc;
  // console.log(widgetnemgooReady);
  return (
    <BlockDiv
      customClassName="max-w-lpcontainer mx-auto"
      divNumber={"DivLandingLogo"}
    >
      <RenderAtom
        item={{ value: widgetnemgooReady?.title }}
        renderType="title"
        customClassName={"text-[40px]"}
      />
      <div className=" lg:flex-row xs:flex-wrap xs:hidden lg:flex w-full justify-around">
        {item?.map((item: any, index: any) => (
          <RenderAtom
            key={index}
            item={item?.position2}
            renderType="image"
            customClassName={"w-[142px] h-[50px] object-contain"}
          />
        ))}
      </div>
    </BlockDiv>
  );
}
export default SurveyLandingLogo;
