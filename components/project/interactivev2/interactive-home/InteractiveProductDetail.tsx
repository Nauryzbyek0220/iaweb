import React from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { useTranslation } from "next-i18next";

import ErpArticle from "@/components/custom/article/erpArticle";
import ErpCard from "@/components/default/custom/card/erpCard";

import RenderAtom from "@/components/common/atom/renderAtom";
import useSWR from "swr";

import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BlockDiv from "@/components/common/block/blockDiv";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

export default function InteractiveProductDetail() {
  const router = useRouter();
  const filterId = router.query?.id;
  const { t } = useTranslation("translate");

  const command = "IMN_PRDCTN_DTLS_00_HDR_004";

  const parameters = `&parameters=${JSON.stringify({
    id: filterId,
  })}`;
  const { data: dataSrc } = useSWR(
    `/api/get-process?processcode=${command}${parameters}`
  );

  const erpArticleDatas = [
    {
      title: dataSrc?.title,
      description: `<span className='md:text-[18px] text-[#67748E] leading-[28px]'>${dataSrc?.body}</span>`,
    },
  ];

  const erpArticleServiceDatas = [
    {
      title: "Харилцагчийн <b className='text-[#0C529D]'>үйлчилгээ</b>",
      description: `<span className='md:text-[18px] text-[#67748E] leading-[28px]'>Интерактив компани нь харилцагч байгууллагуудынхаа үйл ажиллагааны онцлогыг нарийвчлан судлах, түүнд тохирсон зөвлөгөө өгөх, системийн тохиргоо хийх зэрэг бүх төрлийн үйлчилгээг чанарын өндөр түвшинд нэг дор үзүүлдэгээрээ бусад ижил төрлийн үйл ажиллагаа явуулдаг байгууллагуудаас онцлог юм. Мөн бид хэрэглэгч та бүхэнд Veritech ERP цогц системийн ашиглалттай холбоотой нэвтрүүлэлт, сургалт, дэмжлэг туслалцаа, зөвлөх үйлчилгээ болон техник хангамжийн бүх төрлийн үйлчилгээг үзүүлнэ.
</span>`,
    },
  ];

  const erpArticleOptions = {
    classNameTitle: "leading-[44px] text-[#3C3C3C]",
    classNameDesc: "",
    classNamebutton: "",
    contentStyle: "left",
  };

  const erpCardOptions = {
    className: "",
    extraClassName: "",
    cardType: "randomPosition",
  };

  const specialData = dataSrc?.imn_prdctn_dtls_03_ftr;
  const productionModule = dataSrc?.imn_prdctn_dtls_04_mdl;
  const productionRelation = dataSrc?.imn_web_cms_semantic_dv;
  const productionBenefit = dataSrc?.imn_prdctn_dtls_05_dvntg;
  const productionFeature = dataSrc?.imn_production_feature_dv;
  const productionChance = dataSrc?.imn_prdctn_dtls_07_tpt_rprt;
  const bannerData = dataSrc?.imn_prdctn_dtls_01_bnnr?.[0];
  const slug = _.toString(router?.query?.slug);
  const detailType = slug.split(",")[0];

  const serviceDefaultData = [
    {
      mainimage:
        "https://res.cloudinary.com/dsap2yssk/image/upload/v1687754036/OBJECTS_owi6jp.png",
      title: "Эрчим хүч ба Ногоон хот",
      description:
        " - Байгууллагын өгөгдлийн сангийн дахин төлөвлөлт<br> - Олон төрлийн өөр хоорондоо уялдаа багатай системүүдийн интеграци хийх (EAI, ESB) <br> - Өгөгдлийн сангийн нэгтгэл, шилжүүлэг, хяналт хийх<br> - Байгууллага хоорондын мэдээлэл солилцоог боловсронгуй болгох <br> - Хэрэглэгчийн болон Хандалтын эрхийн тогтолцоо бий болгох (SSO)",
    },
  ];

  const serviceData = [
    {
      title: "Онцлог үйлчилгээ",
      body: "Veritech ERP цогц системд байнгын сайжруулалт, зогсолтгүй шинэчилэлт хийгддэг бөгөөд систем дээр шинээр үүсч буй боломжуудыг ямар нэг хязгаарлалтгүйгээр нийт харилцагчдад цаг тухай бүрт санал болгодог. Уян хатан зохион байгуулалттай учир систем дээр төрөл бүрийн нэмэлт үйлчилгээг таны үйл ажиллагаанд тохируулан санал болгох ба та өөрт хэрэгтэй нэмэлт үйлчилгээг ашиглах боломжтой.",
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1687852847/ontslog_lylpmw.jpg",
    },
  ];

  const serviceCardOptions = {
    className: "",
    extraClassName: "",
    cardType: "imageRight",
  };

  return (
    <>
      {detailType == "product" && (
        <div className="flex flex-col w-full">
          <div
            className="flex  w-full md:h-[400px] bg-black/50 h-auto relative"
            style={{
              backgroundImage: `url('https://dev.veritech.mn/${
                bannerData?.background || bannerData?.imgurl
              }')`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col md:flex-row container mx-auto justify-between  md:pt-[150px] md:pb-[120px] xs:pt-16">
              <div className="flex flex-col w-full md:w-[50%] justify-center gap-10 transition duration-150 ease-in-out">
                <div className="emergeny">
                  {bannerData?.logo && (
                    <RenderAtom
                      renderType="image"
                      item={{ value: bannerData?.logo }}
                      customClassName="w-[200px] md:w-[157px] h-auto"
                    />
                  )}
                </div>
                <div className="flex flex-col emergeny2 gap-5">
                  <RenderAtom
                    renderType="text"
                    item={{ value: t(bannerData?.title) }}
                    customClassName={` ${"xs:text-[24px] md:text-[40px]  font-[300] text-white uppercase md:leading-[46px] xs:leading-[26px]"}`}
                  />
                  {bannerData?.body && (
                    <RenderAtom
                      renderType="text"
                      item={{ value: t(bannerData?.body) }}
                      customClassName={`${"text-[18px] text-white mt-4"} flex font-normal`}
                    />
                  )}
                </div>
                <div className="flex justify-start gap-16 emergeny2">
                  {bannerData?.location && (
                    <span className="text-white">
                      <i className="fa-regular fa-location-dot" />{" "}
                      {bannerData?.location}
                    </span>
                  )}
                  {bannerData?.date && (
                    <span className="text-white">
                      <i className="fa-regular fa-clock" /> {bannerData?.date}
                    </span>
                  )}
                </div>
                {bannerData?.button && (
                  <div className="md:flex flex-row gap-5 emergeny3 xs:hidden ">
                    <Link href={bannerData?.url}>
                      <button
                        className={`${"bg-transparent text-white  border-2 border-white rounded-full hover:bg-black/20 px-8 py-3 w-full max-w-[250px]"}`}
                      >
                        {t(bannerData?.button)}
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
          </div>
          {/* section 1 */}
          <div className="flex container justify-center items-center mx-auto py-10 md:py-20">
            <ErpArticle
              pDataSrc={erpArticleDatas}
              pOptions={erpArticleOptions}
            />
          </div>
          {/* section 2 */}
          {specialData && specialData.length >= 1 && (
            <div className="flex flex-col justify-center items-center pt-7 md:pt-14 pb-28 gap-5 md:gap-[48px] bg-[#0C529D] bg-top bg-cover">
              <span className="text-white text-[32px] md:text-[40px] font-bold text-center">
                Онцлох боломжууд
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 container mx-auto text-center gap-5 md:gap-7">
                {specialData?.map((row: any, index: number) => {
                  return (
                    <SpecialChance
                      key={index}
                      title={row.title}
                      imgUrl={row.imgsmallthumb}
                      description={row.body}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {/* section 3 */}
          {productionModule && productionModule.length > 1 && (
            <div className="flex w-full container mx-auto py-16">
              <ErpCard pDataSrc={productionModule} pOptions={erpCardOptions} />
            </div>
          )}
          {/* section 4 */}
          {productionBenefit && productionBenefit[0].title && (
            <div className="flex w-full py-10">
              <div className={`relative w-full`}>
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation, Pagination]}
                  className="banner"
                >
                  {productionBenefit?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide className="" key={item?.id || index}>
                        <Slide
                          key={index}
                          title={item.title}
                          description={item.body}
                          imgUrl={`https://dev.veritech.mn/${item.imgurl}`}
                          topImage="https://res.cloudinary.com/dzih5nqhg/image/upload/v1686230603/top_bmi2kx.png"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
          {/* section 5 */}
          {productionRelation && productionRelation.length > 1 && (
            <div className="flex flex-col justify-center items-center py-5 md:py-14 gap-5 md:gap-[48px]">
              <span className="text-[#3c3c3c] text-[32px] md:text-[40px] font-bold leading-[52px] text-center">
                Холбогдох системүүд
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center container  gap-5">
                {productionRelation?.map((row: any, index: number) => {
                  return (
                    <BlockDiv
                      customClassName="flex flex-col bg-white cursor-pointer"
                      key={index}
                    >
                      <RenderAtom
                        item={
                          row?.position12 || {
                            value: row?.ecmnewsdtldv[0]?.mainimg,
                          }
                        }
                        renderType="image"
                        customClassName={"w-full h-[195px] object-cover"}
                      />
                      <BlockDiv customClassName="flex flex-col p-5 h-[214px]  gap-3 pt-6">
                        <RenderAtom
                          renderType="title"
                          item={
                            row?.position1 || {
                              value: row?.ecmnewsdtldv[0]?.title,
                            }
                          }
                          customProps={{
                            truncateRow: 2,
                          }}
                          customClassName={
                            "text-[20px] font-bold leading-[26px] text-[#3C3C3C]"
                          }
                        />

                        <RenderAtom
                          renderType="text"
                          item={
                            row?.position3 || {
                              value: row?.ecmnewsdtldv[0]?.description,
                            }
                          }
                          customClassName={
                            "text-[16px] leading-[26px] text-[#67748E] line-clamp-2"
                          }
                        />
                        <Link
                          href={`/product/detail?id=${row?.ecmnewsdtldv[0]?.id}`}
                          className="px-0 mx-0 font-semibold text-[16px] flex-row-reverse gap-x-2 text-[#0C529D] hover:underline mt-4"
                        >
                          {t("WPD_0001")}
                          <i className="fa-regular fa-arrow-right -rotate-45 pl-2 mt-2 relative top-1"></i>
                        </Link>
                      </BlockDiv>
                    </BlockDiv>
                    // <ConnectSystems
                    //   key={index}
                    //   title={row?.ecmnewsdtldv[0].title}
                    //   description={row?.ecmnewsdtldv[0].description}
                    //   imgUrl={row?.ecmnewsdtldv[0].mainimg}
                    // />
                  );
                })}
              </div>
            </div>
          )}
          {productionChance && productionChance.length > 0 && (
            <div className="flex flex-col justify-center items-center py-5 md:py-14 gap-5 md:gap-[48px]">
              <span className="text-[#3C3C3C] text-[32px] md:text-[40px] font-bold leading-[52px] text-center">
                Гарах тайлангууд
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between container mx-auto items-center gap-5">
                {productionChance?.map((row: any, index: number) => {
                  return (
                    <div className="" key={index}>
                      <RenderAtom
                        item={{ value: row?.imgsmallthumb }}
                        renderType="image"
                        customClassName={"w-[60px] h-[60px] mb-5"}
                      />
                      <div>
                        <RenderAtom
                          item={{ value: row?.title }}
                          renderType="title"
                          customClassName={"text-xl font-bold text-[#3C3C3C]"}
                        />
                        <RenderAtom
                          item={{ value: row?.body }}
                          renderType="text"
                          customClassName={
                            "line-clamp-3 mt-1 text-[#67748E] text-lg"
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {detailType == "project" && (
        <div className="flex flex-col w-full bg-white">
          {/* section 1 */}
          <div className="flex container justify-center items-center mx-auto py-10 md:py-20">
            <ErpArticle
              pDataSrc={erpArticleDatas}
              pOptions={erpArticleOptions}
            />
          </div>
          {/* section 2 */}
          <div
            className="w-full flex flex-col gap-10 py-10 sm:py-20 md:pb-40"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dzih5nqhg/image/upload/v1685955585/imgpsh_fullsize_anim_rntm5w.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="text-[#3C3C3C] text-[32px] md:text-[44px] font-bold leading-[52px] text-center">
              Онцлох <b className="text-[#0C529D]">боломжууд</b>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto container gap-8">
              {productionBenefit?.map((row: any, index: number) => {
                return (
                  <div key={index} className="flex flex-col gap-3 p-5">
                    <RenderAtom
                      renderType="image"
                      item={{ value: row.imgurl }}
                      customClassName={"w-[40px] h-[40px]"}
                    />
                    <RenderAtom
                      item={{ value: row.body }}
                      renderType="text"
                      customClassName={`text-[20px] leading-[30px] font-normal text-[#3C3C3C]`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* section 4 */}
          {productionFeature && (
            <div className="flex w-full">
              <div className={`relative w-full`}>
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation, Pagination]}
                  className="banner"
                >
                  {productionFeature?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide className="" key={item?.id || index}>
                        <Slide
                          key={index}
                          title={item.title}
                          description={item.body}
                          imgUrl={
                            item.imgurl
                              ? `https://dev.veritech.mn/${item.imgurl}`
                              : "https://dev.veritech.mn/storage/uploads/process/202306/file_1686208822521608_168612456917890.png"
                          }
                          topImage="https://res.cloudinary.com/dzih5nqhg/image/upload/v1686237263/urdun2_fbnr7h.png"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      )}
      {detailType == "service" && (
        <div className="flex flex-col gap-10 md:gap-20 py-10 md:py-20 bg-white">
          {/* section 1 */}
          <div className="flex container justify-center items-center mx-auto">
            <ErpArticle
              pDataSrc={erpArticleServiceDatas}
              pOptions={erpArticleOptions}
            />
          </div>
          {/* section 2 */}
          <div className="flex flex-col">
            <div className="flex w-full container mx-auto">
              <ErpCard pDataSrc={specialData} pOptions={serviceCardOptions} />
            </div>
          </div>
          {/* section 3 */}
          {serviceData && (
            <div className="flex w-full">
              <div className={`relative w-full`}>
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation, Pagination]}
                  className="banner"
                >
                  {serviceData?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide className="" key={item?.id || index}>
                        <Slide
                          key={index}
                          title={item.title}
                          description={item.body}
                          imgUrl={item.imgUrl}
                          topImage=""
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const SpecialChance = ({
  imgUrl,
  title,
  description,
}: {
  imgUrl: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center ">
      <RenderAtom
        renderType="image"
        item={{ value: imgUrl }}
        customClassName={"w-[60px] h-[60px] object-contain"}
      />
      <span className="text-white text-2xl text-bold leading-6 pt-5">
        {title}
      </span>
      <span className="text-white text-base leading-6 line-clamp-3 pt-5">
        {description}
      </span>
    </div>
  );
};

const ConnectSystems = ({
  imgUrl,
  title,
  description,
}: {
  imgUrl: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col w-full lg:max-w-[240px] items-center gap-5 bg-white p-5 rounded-xl border-4 border-transparent hover:border-green-400 cursor-pointer">
      <RenderAtom
        renderType="image"
        item={{ value: imgUrl }}
        customClassName={"w-[100px] h-auto"}
      />
      <span className="text-interactive text-xl text-bold leading-6">
        {title}
      </span>
      <span className="interactive-white text-base leading-6">
        {description}
      </span>
    </div>
  );
};

const Slide = ({
  imgUrl,
  title,
  description,
  topImage,
}: {
  imgUrl: string;
  title: string;
  description: string;
  topImage: string;
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-auto text-white relative "
      style={{
        backgroundImage: `url('${
          imgUrl ||
          "https://dev.veritech.mn/storage/uploads/process/202306/file_1686208822521608_168612456917890.png"
        }')`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full py-24 bg-black/30">
        <div className="flex flex-col justify-start container mx-auto py-10 relative h-full">
          <div className="flex flex-col justify-center py-10 gap-5 relative h-full max-w-[705px]">
            {title && (
              <RenderAtom
                item={{ value: title }}
                renderType="title"
                customClassName={
                  "text-[24px] lg:text-[60px] max-w-[1060px] md:leading-[59px] items-center text-left flex font-semibold drop-shadow-lg shadow-black"
                }
              />
            )}

            <RenderAtom
              item={{ value: description }}
              renderType="text"
              customClassName={`text-[18px] line-clamp-3 max-w-[1060px] leading-[34px] items-center text-justify md:text-left flex font-medium drop-shadow-lg shadow-black`}
              customProps={{
                truncateRow: 3,
              }}
            />
          </div>
          {topImage && (
            <RenderAtom
              renderType="image"
              item={{
                value: topImage,
              }}
              customClassName={
                "w-[150px] lg:w-[180px] xl:w-full max-w-[250px] h-auto absolute -top-24 right-0"
              }
            />
          )}
          {/* <RenderAtom
            item={{ value: "Дэлгэрэнгүй" }}
            renderType="button"
            customClassName={
              "text-[18px] font-bold text-[#0C529D] bg-white p-3 rounded-[30px]"
            }
          /> */}
        </div>
      </div>
    </div>
  );
};
