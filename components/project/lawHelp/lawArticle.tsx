import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";

type PropsType = {
    data?: any;
  };

const LawArticle: FC<PropsType> = ({ data }) => {
    const options = data?.options;
    const articleData = data?.data;
    const staticData = articleData[0];
    
    return(
        <>
            <RenderAtom
              item={{ value: staticData?.title  }}
              renderType="text"
              customClassName={`${
                options?.classNameTitle && options?.classNameTitle
              }`}
            />

              {staticData?.description && (
                  <RenderAtom
                    item={{ value: staticData?.description }}
                    renderType="text"
                    customClassName={`${
                      options?.classNameDesc || ""
                    }  inline-block leading-[28px]`}
                  />
              )}

                {staticData?.data && (
                  <div className={`list-styled ${
                    options?.classNameDesc}`}>
                    <ul>
                      {staticData?.data?.map((item: any, index: number) => {
                          return (
                              <li key={index}> {item?.text }</li>
                          );
                      })}
                    </ul>
                  </div>
                )}

              {staticData?.image && (
                <RenderAtom
                  item={{ value: staticData?.image }}
                  renderType="image"
                  customClassName="w-full rounded-xl pt-5"
                />
              )}
        </>
    );
};
export default LawArticle