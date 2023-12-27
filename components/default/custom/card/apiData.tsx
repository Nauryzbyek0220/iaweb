import { CodeBlock } from "react-code-blocks";
import { useState, useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";

function Apidata() {
  const [formData, setFormData] = useState<any>({
    exclude: "",
    group_by: "",
    lang: "",
    limit: "",
    offset: "",
    order_by: "",
    refine: "",
    select: "",
    timezone: "",
    where: "",
    dataset: "",
  });
  const [apiUrl, setApiUrl] = useState("");

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);
  const item = readyDatasrc;
  console.log("sdfg:", item);

  const handleSubmit = () => {
    console.log("object :>> ", formData);
    setApiUrl(`
        /api/datasets${formData.dataset}/records?select=${formData.select}&where=${formData.where}&group_by=${formData.group_by}&order_by=${formData.order_by}&limit=${formData.limit}&offset=${formData.offset}&refine=${formData.refine}&exclude=${formData.exclude}&lang=${formData.lang}&timezone=${formData.timezone}`);
  };

  const myCustomTheme = {
    lineNumberColor: "#071F32",
    lineNumberBgColor: "#222",
    backgroundColor: "#f5f5f5",
    textColor: "#071F32",
    substringColor: "#0000FF",
    keywordColor: "#0077ff",
    attributeColor: "#ffaa00",
    selectorTagColor: "#0077ff",
    docTagColor: "#aa00ff",
    nameColor: "#e60b0b",
    builtInColor: "#0077ff",
    literalColor: "#ffaa00",
    bulletColor: "#ffaa00",
    codeColor: "#071F32",
    additionColor: "#0000FF",
    regexpColor: "#e60b0b",
    symbolColor: "#ffaa00",
    variableColor: "#ffaa00",
    templateVariableColor: "#ffaa00",
    linkColor: "#aa00ff",
    selectorAttributeColor: "#ffaa00",
    selectorPseudoColor: "#aa00ff",
    typeColor: "#0077ff",
    stringColor: "#0000FF",
    selectorIdColor: "#ffaa00",
    quoteColor: "#e60b0b",
    templateTagColor: "#071F32",
    deletionColor: "#ff0000",
    titleColor: "#0077ff",
    sectionColor: "#0077ff",
    commentColor: "#777",
    metaKeywordColor: "#e60b0b",
    metaColor: "#aa00ff",
    functionColor: "#0077ff",
    numberColor: "#ffaa00",
  };

  return (
    <div className="mt-[90px]">
      <div className="flex flex-wrap gap-y-2">
        <div className="md:w-2/4 w-full pb-4 md:pb-0 md:pr-6 xs:p-0">
          <h2 className="md:text-[24px] font-bold xs:text-2xl text-[#071F32] mb-[13px]">
            Query for API call
          </h2>
          <form className="w-full">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  dataset
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="dataset"
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  data-path="dataset"
                  placeholder=""
                  value="SelectData"
                  onChange={handleChange}
                />
                <p className="text-gray-700 text-xs italic">Dataset ID</p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  select
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="select"
                  data-path="select"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  Selected fields (documentation)
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  where
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="where"
                  data-path="where"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  Filter parameter (documentation)
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  group_by
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="group_by"
                  data-path="group_by"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  Grouping parameter (documentation)
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  order_by
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="order_by"
                  data-path="order_by"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  Sort parameter (documentation)
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  limit
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="number"
                  name="limit"
                  data-path="limit"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  Limite du nombre de résultats
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  offset
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="number"
                  name="offset"
                  data-path="offset"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  Index of first result returned
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  refine
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="refine"
                  data-path="refine"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  Refinements to take into account
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  exclude
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="exclude"
                  data-path="exclude"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  Exclusions to consider
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  lang
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="lang"
                  data-path="lang"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  2 letter language code
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-[#071F32] md:text-left mb-1 md:mb-0 pr-4">
                  timezone
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  name="timezone"
                  data-path="timezone"
                  onChange={handleChange}
                  className="border-#E1E1E1 w-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                  placeholder=""
                />
                <p className="text-gray-700 text-xs italic">
                  The time zone used to interpret dates and times in the request
                  and response data.
                </p>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  onClick={handleSubmit}
                  className="shadow bg-red-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="md:w-2/4 w-full pb-4 md:pb-0 md:pr-6 xs:p-0">
          <h2 className="md:text-[24px] font-bold xs:text-2xl text-[#071F32] mb-[13px]">
            Results
          </h2>
          <div>
            <pre>
              <CodeBlock
                text={JSON.stringify(item, null, 4)}
                language="jsx"
                showLineNumbers={false}
                theme={myCustomTheme}
              />
            </pre>
            <style>
              {`
                        pre span{
                            overflow-x:hidden !important;
                            font-size:10px !important;
                        }
                        `}
            </style>
          </div>
        </div>
      </div>

      <div>
        <h2 className="md:text-[24px] font-bold text-[#071F32] mt-[2rem] mb-[13px]">
          API call URL
        </h2>
        <div className="text-[#e22c3f] flex">
          <div>
            <i className="fa fa-link"></i>
          </div>
          <div>
            {(apiUrl && (
              <a href={apiUrl} rel="noopener noreferrer">
                {apiUrl}
              </a>
            )) ||
              "dddd"}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Apidata;
