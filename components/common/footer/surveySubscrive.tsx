import { useState, FC } from "react";
import _ from "lodash";
import RenderAtom from "../atom/renderAtom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetchJson from "@/utils/helper";
import axios from "axios";
import { notification } from "antd";

type PropsType = {
  dataSrc?: any;
};

const schema = yup
  .object({
    newlink: yup
      .string()
      .email("Имэйл буруу байна ")
      .max(255)
      .required("Имэйл хаяг оруулна уу"),
  })
  .required();

const SurveySubscribe: FC<PropsType> = ({ dataSrc }) => {
  const subData = {
    title: "Хэрэглэгчийн <b className='bg-[#4A86FF] text-white font-bold rounded-[10px] text-[50px] p-[10px]'>сэтгэл ханамжийг </b><br>бид мэднэ",
    description:
      "Та өөрийн имэйл хаягаа бүртгүүлэн хүссэн мэдээллээ цаг тухайд нь аваарай.",
    placeholder: "Компани и-мэйл",
    button: "Илгээх",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const param = {
      typeId: "1",
      ...data,
    };

    const { data: submitData } = await axios.post(`/api/post-process`, {
      processcode: "IMN_GET_EMAIL_DV_001",
      parameters: param,
    });

    // console.log("submitData :>> ", submitData);

    if (submitData?.status == "success") {
      notification.success({
        message: "Бидэнтэй нэгдсэнд баярлалаа.",
        placement: "bottom",
      });
      reset();
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div
          className={`flex mx-auto flex-col items-center text-center justify-center sm:w-full`}>
          <RenderAtom
            item={{ value: subData?.title }}
            renderType="title"
            customClassName={
              "font-bold text-[50px] capitalize leading-normal"
            }
          />
          <RenderAtom
            item={{ value: subData?.description }}
            renderType="text"
            customClassName={
              "font-normal leading-8 text-[18px] text-[#67748E]"
            }
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-row py-10">
              <input
                {...register("newlink")}
                className="md:h-[60px] sm:h-[50px] xs:h-[40px] xs:w-[320px] sm:w-[350px] md:w-[550px] rounded-[30px] pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                placeholder="Таны и-мэйл хаяг"></input>
              {errors.newlink && (
                <div className="text-red-400 absolute -bottom-0  pl-2">
                  {!errors?.newlink?.message
                    .toString()
                    .match(/required field/g) && errors?.newlink?.message}
                </div>
              )}
              <span className="flex p-[30px] items-center  absolute right-0 cursor-pointer md:h-[60px] sm:h-[50px] xs:h-[40px] bg-[#FF9339] hover:text-white xl:text-[18px] lg:text-[16px] xs:text-[14px] flex-row-reverse text-white font-medium  rounded-[30px]">
                <input
                  type="submit"
                  value={subData?.button}
                  className="cursor-pointer mx-auto"
                />
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SurveySubscribe;
