import tippy from "tippy.js";
import { getLocalDotDate } from "../../../utils/getLocalDate";
import ReactDOM from "react-dom/client";
import { getDateDotForm } from "../../../utils/getDateForm";

const tippyInstanceMap = new Map();

export const TippyInTippy = (target, event) => {
  // 싱글톤 (map에 값이 있으면 그냥 return)
  if (tippyInstanceMap.has(target.id)) {
    return;
  }

  const performance = {
    title: event.performanceTitle,
    start: event.performanceStartDate,
    end: event.performanceEndDate,

    performanceCast: event.performanceCast,
    performanceVenue: event.performanceVenue,
    isFestival: event.isFestival,
    isForeign: event.isForeign,
    ticketingUrls: event.ticketingUrls,
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
        {performance.start === performance.end
          ? getDateDotForm(performance.start)
          : getDateDotForm(performance.start) +
            " ~ " +
            getDateDotForm(performance.end)}
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
                  backgroundColor: "var(--main-color)",
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

  const instance = tippy(target, {
    content: contentElement,

    trigger: "click",
    placement: "top",
    animation: "scale-extreme",
    allowHTML: true,
    interactive: true,
    appendTo: () => document.body, // 부모의 overflow/transform 영향 제거
    maxWidth: "none",
    showOnCreate: true,

    onMount(instance) {
      const tippyBox = instance.popper.querySelector(".tippy-box");
      const tippyArrow = tippyBox.querySelector(".tippy-arrow");

      const { isFestival, isForeign } = performance;

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

      //   내부 클릭하면 닫히게
      instance.popper.addEventListener("click", () => {
        instance.hide();
      });
    },
  });

  // map에 값 등록
  tippyInstanceMap.set(target.id, instance);
};
