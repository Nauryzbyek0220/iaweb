import { createContext, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import _ from "lodash";
import {
  preparePositionAllArray,
  preparePositions,
} from "@/utils/widgetHelper";
import { jsonParse } from "@/utils/helper";
import fetchJson from "@/utils/helper";
import { useRouter } from "next/router";

type PropsContextType = {
  config?: any;
  readyDatasrc?: any;
  customerReady?: any;
  widgetnemgooReady?: any;
  positionConfig?: any;
  metaverseData?: any;
};

const WidgetWrapperContext = createContext<PropsContextType>({});

export const WidgetWrapper = ({
  config,
  datasrc = [],
  widgetnemgooReady,
  positionConfig,
  setVirtualWidgetnemgooReady,
  dataMutate,
  paging,
  aggregatecolumns,
  children,
}: {
  config?: any;
  datasrc?: Array<any>;
  headerData?: Object | null;
  widgetnemgooReady?: any;
  positionConfig?: any;
  setVirtualWidgetnemgooReady?: any;
  dataMutate?: any;
  fillItem?: any;
  paging?: any;
  aggregatecolumns?: string;
  children?: any;
}) => {
  const [metaverseData, setMetaverseData] = useState<any>();
  const metaverse = widgetnemgooReady?.metaverse;

  const router = useRouter();

  const readyDatasrcTemp = useMemo(
    () => preparePositionAllArray(datasrc, positionConfig),
    [datasrc]
  );

  const readyStandart: any = {
    recordId: router.query?.recordId,
    indicatorId: router.query?.indicatorId,
  };

  let myQuery = router.query
    ? _.omit(
        router?.query,
        "slug" // энэ нөхөр router.query дотор явдгийг устгах хэрэгтэй.
      )
    : {};

  const param = _.keys(myQuery)?.map((item) => {
    return {
      [item]: readyStandart[`${item}`],
    };
  });

  let parameters = { ...param[0], ...param[1] };

  if (metaverse?.parameters) {
    parameters = metaverse?.parameters;
  }

  useEffect(() => {
    if (widgetnemgooReady.metaverse) {
      const fetchMetaverseData = async () => {
        const result = await fetchJson(
          `/api/get-indicator?command=${
            metaverse?.command
          }&parameters=${JSON.stringify(parameters)}`
        );
        console.log("this is resultlalalalallalalalalalallalalal", result);
        if (result?.status == "success") {
          setMetaverseData({
            ...result,
            rows: preparePositionAllArray(result?.result?.rows, positionConfig),
          });
        }
      };
      fetchMetaverseData();
    }
  }, [widgetnemgooReady]);

  const readyDatasrc = readyDatasrcTemp;
  const RenderComponent: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `../../components/${config.componentpath.toLowerCase()}/${
              config.widgetcode
            }`
          ),
        {
          loading: () => <span></span>,
        }
      ),

    []
  );

  const otherStyle = jsonParse(config.widgetnemgoo);
  return (
    <div
      className={`
       ${widgetnemgooReady?.design?.className || ""}
        ${otherStyle?.sectionClassName}`}
      style={widgetnemgooReady?.design?.style || widgetnemgooReady?.style}
      attr-data={config.widgetcode}
      attr-code={config.code}
    >
      <WidgetWrapperContext.Provider
        value={{
          config,
          readyDatasrc,
          widgetnemgooReady,
          positionConfig,
          metaverseData,
        }}
      >
        <RenderComponent />
      </WidgetWrapperContext.Provider>
    </div>
  );
};

export default WidgetWrapperContext;
