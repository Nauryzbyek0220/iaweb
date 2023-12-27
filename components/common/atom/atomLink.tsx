import { FC } from "react";
import { isEmpty } from "lodash";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import _ from "lodash";

type PropsType = {
  item?: string;
  color?: string;
  href?: any;
  customClassName?: string;
  customProps?: any;
  children?: any;
  childData?: any;
};

const AtomLink: FC<PropsType> = ({
  item = "",
  color,
  href,
  customClassName = "",
  customProps,
  children,
  childData,
}) => {
  const { t } = useTranslation("translate");
  if (isEmpty(item)) {
    return children;
  } else {
    const target = _.values(customProps);
    // console.log('customProps :>> ', target[0]);

    return (
      <div className="flex w-full items-center  xs:justify-start md:justify-center  relative">
        <div className="group relative cursor-pointer py-1 ">
          <div className="flex items-center w-full justify-between space-x-1 px-0">
            <Link
              href={
                Array.isArray(childData) && childData.length > 0 ? "#" : href
              }
              target={target[0]}
            >
              <span
                className={`hover:text-${color} ${customClassName} hover:opacity-80 menu-hover md:py-2  xs:my-1 xs:py-1`}
              >
                {t(item)}
              </span>
            </Link>

            {/* Дэд цэстэй бол DropDown icon харуулна */}
            {Array.isArray(childData) && childData.length > 0 && (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke={color}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            )}
          </div>

          {/* DropDown задарч харагдах цэсүүд... */}
          {Array.isArray(childData) && childData.length > 0 && (
            <div className="hidden ddss absolute z-50 w-[300px] flex-col  rounded-b-2xl pt-[24px] shadow-xl group-hover:flex ">
              {childData?.map((row: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-2.5 first-of-type:border-t-4 border-interactive first-of-type:pt-4 bg-white last-of-type:rounded-b-2xl last-of-type:pb-6"
                  >
                    <Link href={row.url} className="py-1 peer submenu">
                      <span
                        key={index}
                        className={` ${customClassName} hover:opacity-80 hover:text-[#0C529D] hover:font-bold text-black py-3 px-6`}
                      >
                        {t(row.title)}
                        {row.children && (
                          <i className="fa-regular fa-chevron-down ml-3" />
                        )}
                      </span>
                    </Link>
                    {row.children && (
                      <div className="ml-5 hidden peer-hover:flex hover:flex  flex-col ">
                        {row.children.map((item: any, key: number) => {
                          return (
                            <Link
                              key={key}
                              href={item.url}
                              className="submenu"
                              style={{ animationDelay: key * 0.1 + "s" }}
                            >
                              <span
                                key={index}
                                className={`hover:opacity-80 hover:text-[#0C529D] text-black py-3 px-6`}
                              >
                                {t(item.title)}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                    <style>
                      {`
                        .submenu {
                          opacity: 0;
                          transform: translateY(-10px);
                          animation: emerge 0.5s forwards;
                        }

                        @keyframes emerge {
                          from {
                            opacity: 0;
                            transform: translateY(-10px);
                          }
                          to {
                            opacity: 1;
                            transform: translateY(0);
                          }
                        }
                        .ddss {
                          opacity: 0;
                          transform: translateY(-10px);
                          animation: emerge 0.5s forwards;
                        }

                        @keyframes emerge {
                          from {
                            opacity: 0;
                            transform: translateY(-10px);
                          }
                          to {
                            opacity: 1;
                            transform: translateY(0);
                          }
                        }
                        `}
                    </style>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default AtomLink;
