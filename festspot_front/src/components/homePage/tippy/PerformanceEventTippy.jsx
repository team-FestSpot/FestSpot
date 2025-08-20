import tippy from "tippy.js";
import ReactDOM from "react-dom/client";
import { getLocalDotDate } from "../../../utils/getLocalDate";

export const PerformanceEventTippy = (info) => {
  //FullCalendar 라이브러리랑 날짜가 안맞아서 맞춰주기
  const prevDay = new Date(info.event._instance.range.end);
  prevDay.setDate(prevDay.getDate() - 1);

  // 등록할 정보 담은 객체
  const performance = {
    title: info.event._def.title,
    start: info.event._instance.range.start,
    end: prevDay,
    ...info.event.extendedProps,
  };

  // tippy 창
  const contentElement = document.createElement("div");
  const root = ReactDOM.createRoot(contentElement);
  root.render(
    <div>
      <div style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
        {performance.title}
      </div>
      <div style={{ fontSize: "14px", color: "#474747" }}>
        공연 시간 :{" "}
        {performance.start.toDateString() === performance.end.toDateString()
          ? getLocalDotDate(performance.start)
          : getLocalDotDate(performance.start) +
            " ~ " +
            getLocalDotDate(performance.end)}
      </div>
      <div style={{ fontSize: "14px", color: "#474747" }}>
        공연 장소 : {performance.performanceVenue}
      </div>

      {performance.performanceCast === "" || (
        <>
          <div style={{ fontSize: "14px", color: "#474747" }}>
            출연진 : {performance.performanceCast}
          </div>
        </>
      )}

      <br />
      <div
        style={{
          fontSize: "14px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {!!performance.ticketingUrls &&
          performance.ticketingUrls.map((ticketingUrl, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#EF5A39",
                  borderRadius: "8px",
                  padding: "2px 4px",
                  margin: "2px",
                }}
              >
                <a
                  href={ticketingUrl.ticketingUrl}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  {ticketingUrl.ticketingAgencyName}
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );

  tippy(info.el, {
    content: contentElement,

    trigger: "click",
    placement: "top",
    animation: "scale-extreme",
    allowHTML: true,
    interactive: true,
    appendTo: () => document.body, // 부모의 overflow/transform 영향 제거
    maxWidth: "none",

    onMount(instance) {
      const tippyBox = instance.popper.querySelector(".tippy-box");
      const tippyArrow = tippyBox.querySelector(".tippy-arrow");

      const { isFestival, isForeign } = info.event.extendedProps;

      tippyBox.style.color = "#474747";

      // 페스티벌, 내한 여부에 따라 배경 색 다르게
      if (isFestival) {
        tippyBox.style.backgroundColor = "#ffda77";
        tippyArrow.style.color = "#ffda77";
      } else if (isForeign) {
        tippyBox.style.backgroundColor = "#a2d2ff";
        tippyArrow.style.color = "#a2d2ff";
      } else {
        tippyBox.style.backgroundColor = "#FBD8D0";
        tippyArrow.style.color = "#FBD8D0";
      }

      //내부 클릭하면 닫히게
      // instance.popper.addEventListener("click", () => {
      //   instance.hide();
      // });
    },
  });
};
