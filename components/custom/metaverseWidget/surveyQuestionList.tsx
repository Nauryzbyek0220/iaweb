import { FC } from "react";
import useSWR from "swr";

type PropsType = {
  data: any;
};

const SurveyQuestionList: FC<PropsType> = ({ data }) => {
  const command = "kpiIndicatorConfig";
  const param = JSON.stringify({
    indicatorId: data?.C9,
  });
  const { data: questionList } = useSWR(
    `/api/get-indicator?command=${command}&parameters=${param}`
  );

  return (
    <div>
      {questionList?.result?.detail?.map((obj: any, index: number) => {
        if (obj?.SHOW_TYPE == "label") {
          return (
            <div key={index} className="bg-gray-100">
              <p className="">{obj?.LABEL_NAME}</p>
            </div>
          );
        } else {
          return (
            <div className="relative left-4" key={index}>
              {obj?.LABEL_NAME}
            </div>
          );
        }
      })}
    </div>
  );
};

export default SurveyQuestionList;
