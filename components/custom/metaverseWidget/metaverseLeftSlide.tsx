import { useTranslation } from "next-i18next";
import { RenderAtom } from "@/components/common/atom/renderAtom";
import Link from "next/link";

const LeftSlide = ({ data, options }: { data?: any; options?: any }) => {
  const { t } = useTranslation("translate");
  console.log(data, "daadasasasasddasadsasdasd");
  return (
    <div
      className="flex  w-full md:h-[600px] h-auto relative hover:cursor-pointer"
      style={{
        backgroundImage: `url('https://dev.veritech.mn/${data?.position2?.value}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col md:flex-row container mx-auto justify-between  md:pt-[150px] md:pb-[120px] xs:pt-16">
        <div className="flex flex-col w-full md:w-[50%] justify-center gap-10 transition duration-150 ease-in-out">
          <div className="emergeny">
            {data?.logo && (
              <RenderAtom
                renderType="image"
                item={{ value: data?.logo }}
                customClassName="w-[200px] md:w-[157px] h-auto"
              />
            )}
          </div>
          <div className="flex flex-col emergeny2 gap-5">
            <RenderAtom
              renderType="text"
              item={data?.position1 || { value: t(data?.title) }}
              customClassName={` ${
                options?.titleClassName
                  ? options?.titleClassName
                  : "xs:text-[24px] md:text-[40px]  font-[300] text-white uppercase md:leading-[46px] xs:leading-[26px]"
              }`}
            />
            {data?.position3 && (
              <RenderAtom
                renderType="text"
                item={data?.position3 || { value: t(data?.description) }}
                customClassName={`${
                  options?.escrClassName
                    ? options?.escrClassName
                    : "text-[18px] text-white mt-4"
                } flex font-normal`}
              />
            )}
          </div>
          <div className="flex justify-start gap-16 emergeny2">
            {data?.location && (
              <span className="text-white">
                <i className="fa-regular fa-location-dot" /> {data?.location}
              </span>
            )}
            {data?.date && (
              <span className="text-white">
                <i className="fa-regular fa-clock" /> {data?.date}
              </span>
            )}
          </div>
          {data?.button && (
            <div className="md:flex flex-row gap-5 emergeny3 xs:hidden ">
              <Link href={data?.url}>
                <button
                  className={`${
                    options?.buttonClassName
                      ? options?.buttonClassName
                      : "bg-transparent text-white  border-2 border-white rounded-full hover:bg-black/20 px-8 py-3 w-full max-w-[250px]"
                  }`}
                >
                  {t(data?.button)}
                  {/* {t(row.title)} */}
                </button>
              </Link>
            </div>
          )}
          <style>
            {`
			  .emergeny {
				opacity: 1;
				transform: translateX(-90px);
				animation: emerge 0.3s forwards;
			  }
				.emergeny2 {
				opacity: 1;
				transform: translateX(-90px);
				animation: emerge 0.5s forwards;
			  }
			.emergeny3 {
				opacity: 1;
				transform: translateX(-90px);
				animation: emerge 0.7s forwards;
			  }

			  @keyframes emerge {
				from {
				  opacity: 1;
				  transform: translateX(90px);
				}
				to {
				  opacity: 1;
				  transform: translateY(0);
				}
			  }
			  `}
          </style>
        </div>
      </div>
      {data?.topBanner && (
        <div className="w-[260px] h-[200px] bg-gradient-to-r from-[#FE805A] to-[#FBAD50] text-white text-lg md:text-[46px] leading-none font-semibold  md:absolute md:flex xs:hidden top-0 px-[30px] py-[46px] rounded-b-[20px] right-[16%]">
          <RenderAtom renderType="text" item={{ value: t(data?.topBanner) }} />
        </div>
      )}
    </div>
  );
};

export default LeftSlide;
