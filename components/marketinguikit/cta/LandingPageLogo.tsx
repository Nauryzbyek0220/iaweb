import RenderAtom from "@/components/common/atom/renderAtom";
import BlockDiv from "@/components/common/block/blockDiv";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { useContext, useState, useEffect, useRef } from "react";

function LandingPageLogo() {
  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);
  const item = readyDatasrc;

  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollInterval = 16; // 60 frames per second

  const containerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);

  // Function to start and stop scrolling
  const toggleScrolling = () => {
    setIsScrolling((prev) => !prev);
  };

  // Scroll speed and direction
  const scrollSpeed = 1; // Adjust as needed
  const scrollDirection = "left"; // 'left' for reverse direction
  const [items, setItems] = useState<any>(item);

  const loadMoreData = () => {
    // Simulate loading more data from an API or another source
    setIsLoading(true);
    const newData = item;
    // Replace this with your actual data fetching logic
    setItems([...items, ...newData]);
    setIsLoading(false);
  };

  const handleScroll = (e: any) => {
    const { scrollLeft, clientWidth, scrollWidth } = e.currentTarget;

    if (scrollWidth - scrollLeft === clientWidth + 50) {
      loadMoreData();
    }
  };

  useEffect(() => {
    let animationFrameId: any;

    const scroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      if (isScrolling) {
        if (scrollDirection === "left") {
          container.scrollLeft += scrollSpeed;
        } else {
          container.scrollLeft -= scrollSpeed;
        }
        const left = container.scrollLeft;
        if (left >= container.scrollWidth - container.clientWidth) {
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isScrolling, scrollDirection]);

  console.log("logo", items);

  return (
    <BlockDiv customClassName=" mx-auto" divNumber={"DivLandingLogo"}>
      <RenderAtom
        item={{ value: widgetnemgooReady?.title }}
        renderType="title"
        customClassName={"text-[40px]"}
      />
      <div
        className={`w-full flex justify-between overflow-hidden containerScroll`}
        ref={containerRef}
        onMouseEnter={toggleScrolling}
        onMouseLeave={toggleScrolling}
        onScroll={handleScroll}
        style={
          {
            // "& webkit-scrollbar":{
            //   display:"none"
            // }
          }
        }
      >
        {item?.map((item: any, index: number) => (
          <div className="min-w-[220px]" key={index}>
            {/* <img src="ddd" alt="" /> */}
            <RenderAtom
              item={item?.position2}
              renderType="img"
              customClassName={
                "min-w-[142px] h-[50px] object-contain mt-[50px]"
              }
            />
          </div>
        ))}
      </div>
      <style>
        {`
         .containerScroll :: -webkit-scrollbar {

         }
          `}
      </style>
    </BlockDiv>
  );
}
export default LandingPageLogo;
