import AtomLink from "@/components/common/atom/atomLink";
import { useRouter } from "next/router";
import { FC } from "react";

type PropsType = {
  data?: any;
  colorCustom?: any;
  linkStyle?: any;
};

const ErpMenu: FC<PropsType> = ({ data, colorCustom, linkStyle }) => {
  const route = useRouter();
  const activeMenu = route?.asPath;

  return (
    <div className={`flex flex-row items-center gap-6 ${linkStyle}`}>
      {data?.map((row: any, index: number) => {
        return (
          <AtomLink
            key={index}
            item={row?.title}
            customProps={row?.props}
            href={row?.url}
            color={colorCustom}
            customClassName={`text-[16px]  border-b-2 ${
              activeMenu === row?.url
                ? "text-[#FFC107] border-[#FFC107]"
                : "border-transparent"
            } hover:border-[#fff] flex-row-reverse font-normal cursor-pointer hover:text-blue-400 leading-[18px] `}
            childData={row?.children || []}
          />
        );
      })}
    </div>
  );
};
export default ErpMenu;
