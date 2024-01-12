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
            case `/about/management?id=${id}`:
                return 'Удирдлага';
            case `/about/management/detail?id=${id}`:
                return 'Удирдлага';
            case `/about/vision?id=${id}` : 
                return 'Алсын хараа, эрхэм зорилго, зорилт';
            case `/about/strategy?id=${id}` : 
                return 'Яамны бүтэц, стратеги';
            case `/about/list?id=${id}` :
                return 'Бүтэц зохион байгуулалт';
            case `/about/history?id=${id}` :
                return 'Түүхэн замнал';
            case `/activity/service?id=${id}` :
                return 'Өмгөөллийн үйлчилгээ';
            case `/activity/legalService?id=${id}` : 
                return 'Хууль зүйн зөвлөгөө';
            case `/activity/infoService?id=${id}` : 
                return 'Эрх зүйн мэдээлэл, сургалт сурталчилгаа';
            case `/legal/law?id=${id}` : 
                return 'Монгол улсын хууль';
            case `/legal/parlament?id=${id}` :
                return 'УИХ-н тогтоол';
            case `/legal/goverment?id=${id}` :
                return 'Засгийн газрын тогтоол';
            case `/legal/minister?id=${id}` : 
                return 'Сайдын тушаал';
            case `/legal/director?id=${id}` : 
                return 'Захирлын тушаал';
            case `/form?id=${id}` : 
                return 'Ил тод байдал';
            case `/training?id=${id}` : 
                return 'Сургалт';
            case `/training/detail?id=${id}`:
                return 'Сургалт';
            case `/news?id=${id}` : 
                return 'Мэдээ, мэдээлэл';
            case `/news/detail?id=${id}`:
                return 'Мэдээ, мэдээлэл';
            case `/contact?id=${id}` : 
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
