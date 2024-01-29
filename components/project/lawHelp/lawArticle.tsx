import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import useSWR from "swr";
import { useRouter } from "next/router";

type PropsType = {
    data?: any;
  };

const LawArticle: FC<PropsType> = ({ data }) => {
    const options = data?.options;
    const articleData = data?.data;
    const staticData = articleData[0];

    const router = useRouter();
    const filterId = router.query?.id;
    const command = "LAC_ECM_NEWS_DV_004";
    const parameters = `&parameters=${JSON.stringify({
      id: filterId,
    })}`;

    const { data: getdataSrc } = useSWR(
      `/api/get-process?processcode=${command}${parameters}`
    );
    
    return(
        <>
            <RenderAtom
              item={ {value: getdataSrc?.title || staticData?.title }}
              renderType="text"
              customClassName={`${
                options?.classNameTitle && options?.classNameTitle
              }`}
            />

              {getdataSrc?.body && (
                  <RenderAtom
                    item={ {value: getdataSrc?.body || staticData?.description }}
                    renderType="text"
                    customClassName={`${
                      options?.classNameDesc || ""
                    }  inline-block leading-[28px]`}
                  />
              ) ||  staticData?.description && (
                  <RenderAtom
                    item={ {value: getdataSrc?.body || staticData?.description }}
                    renderType="text"
                    customClassName={`${
                      options?.classNameDesc || ""
                    }  inline-block leading-[28px]`}
                  />
              )}

              {filterId != "17049685221219" && ( 
                <>
                  {getdataSrc?.imgurl && (
                  <RenderAtom
                    item={{ value: getdataSrc?.imgurl }}
                    renderType="image"
                    customClassName="w-full rounded-xl pt-5"
                  />
                ) || staticData?.image && (
                  <RenderAtom
                    item={{ value: staticData?.image }}
                    renderType="image"
                    customClassName="w-full rounded-xl pt-5"
                  />
                )}
                </>
              )}
        </>
    );
};
export default LawArticle