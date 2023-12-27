// import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { useContext, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

export const RenderAtom = ({
  item,
  defaultAtom,
  renderType = "text",
  customClassName = "",
  customStyle = {},
  outsideClassName = "",
  customProps,
  isAtomWorking = false,
  isPageLoadingShow = false,
  onClick,
  onMouseEnter,
  customDivNumber = undefined,
  divNamePrefix = "",
  url = {},
  tooltip = {},
  children,
  ...props
}: {
  item?: any;
  defaultAtom?: string;
  renderType?:
    | "title"
    | "text"
    | "image"
    | "img"
    | "button"
    | "currency"
    | "tag"
    | "icon"
    | "number"
    | "input"
    | "editor"
    | "imagemagnify"
    | "avatar"
    | "line"
    | "forminput"
    | "forminputerror"
    | "search"
    | "htmltext"
    | "date"
    | "clob";
  customClassName?: any;
  customStyle?: any;
  outsideClassName?: string;
  customProps?: any;
  isAtomWorking?: boolean;
  isPageLoadingShow?: boolean;
  onClick?: any;
  onMouseEnter?: any;
  customDivNumber?: string;
  divNamePrefix?: string;
  url?: any;
  tooltip?: any;
  loading?: boolean;
  props?: any;
  children?: any;
}) => {
  const widgetnemgooReady: any = {};
  const router = useRouter();
  const positionnemgoo = item?.positionnemgoo || {};
  const atom = positionnemgoo?.atom || {
    type: renderType || defaultAtom || "text",
  };

  const value = atom?.value ? atom?.value : item?.value;
  const className = atom?.classname || item?.classname || "";
  const style = atom?.style ? atom?.style : item?.style;
  const atomClassName = `${customClassName || ""} ${atom?.className || ""}`;
  const atomStyle = { ...customStyle, ...atom?.style };

  const atomList: any = {
    title: "atomTitle",
    text: "atomText",
    image: "atomImg",
    img: "atomFile",
    button: "atomButton",
    currency: "atomCurrency",
    tag: "atomTag",
    icon: "atomIcon",
    number: "atomNumber",
    date: "atomDate",
    input: "atomInput",
    editor: "atomEditor",
    imagemagnify: "atomImageMagnify",
    avatar: "atomAvatar",
    line: "atomLine",
    forminput: "HookFormatomFormInput",
    forminputerror: "HookFormatomInputErrorText",
    search: "atomSearch",
    htmltext: "atomHtmlText",
    clob: "atomClob",
  };

  // const  readyDatasrc = []
  // console.log("positionnemgoo :>> ", positionnemgoo);

  const atomCustomProps = {
    ...customProps,
  };

  const atomProps = {
    ...atomCustomProps,
    item: { ...item, value: value, className: className, style: style },
    customClassName: atomClassName,
    customStyle: atomStyle,
    isWorking: isAtomWorking,
    onClick: onClick,
    showSample: "",
    customDivNumber: customDivNumber,
    divNamePrefix: divNamePrefix,
    ...(atom?.props || {}),
  };

  const linkPath = positionnemgoo?.url;

  const RenderComponent: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/components/common/atom/${atomList?.[atom?.type || "text"]}`
          ),
        {
          ssr: false,
        }
      ),

    []
  );

  const handlerChange = async (e: any, item: any) => {
    e.preventDefault();
    console.log("item :>> ", item);
    const linkPath = item;
    if (item) router.push({ ...linkPath }, undefined, { scroll: true });
  };

  return (
    <div
      className={linkPath ? "cursor-pointer hover:text-blue-400" : ""}
      onClick={(e) => handlerChange(e, linkPath)}
    >
      <RenderComponent {...atomProps}>{children}</RenderComponent>
    </div>
  );
};

export default RenderAtom;
