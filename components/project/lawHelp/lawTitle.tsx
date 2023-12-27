import { FC, useState } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";

type PropsType = {
    active?: any;
    id?:any;
  };
const LawTitle: FC<PropsType> = ({ active, id }) => {
   
    const activeData = () => {
        switch (active) {
            case "/about/management":
                return 'Удирдлага';
            case `/about/management/detail?id=${id}`:
                return 'Удирдлага';
            case "/about/vision" : 
                return 'Алсын хараа, эрхэм зорилго, зорилт';
            case "/about/strategy" : 
                return 'Яамны бүтэц, стратеги';
            case "/about/list" :
                return 'Бүтэц зохион байгуулалт';
            case "/activity/service" :
                return 'Өмгөөллийн үйлчилгээ';
            case "/activity/legalService" : 
                return 'Хууль зүйн зөвлөгөө';
            case "/activity/infoService" : 
                return 'Эрх зүйн мэдээлэл, сургалт сурталчилгаа';
            case "/legal/law" : 
                return 'Монгол улсын хууль';
            case "/legal/parlament" :
                return 'УИХ-н тогтоол';
            case "/legal/goverment" :
                return 'Засгийн газрын тогтоол';
            case "/legal/minister" : 
                return 'Сайдын тушаал';
            case "/legal/director" : 
                return 'Захирлын тушаал';
            case "/form" : 
                return 'Ил тод байдал';
            case "/training" : 
                return 'Сургалт';
            case `/training/detail?id=${id}`:
                return 'Сургалт';
            case "/news" : 
                return 'Мэдээ, мэдээлэл';
            case `/news/detail?id=${id}`:
                return 'Мэдээ, мэдээлэл';
            case "/contact" : 
                return 'Холбоо барих';
            case `/contact/detail?id=${id}`:
                return 'Салбарын мэдээлэл';
            default:
                return (
                <></>
                );
        }
    };

    return <>{activeData()}</>;
};
export default LawTitle;
