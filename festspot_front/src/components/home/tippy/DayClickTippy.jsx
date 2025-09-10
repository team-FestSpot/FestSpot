import tippy from "tippy.js";
import ReactDOM from "react-dom/client";
import { TippyInTippy } from "./TippyInTippy";

export const DayClickTippy = (info, eventsListOnDate) => {
  // 페스티벌, 내한 여부에 따라 배경 색 다르게
  const backgroundColor = (isFestival, isForeign) => {
    if (isFestival) return "#ffda77";
    if (isForeign) return "#a2d2ff";
    return "#FBD8D0";
  };

  const handleDayTippyOnClick = (e) => {
    const clickedEvent = eventsListOnDate.find(
      (event) => event.performanceId.toString() === e.target.id
    );
    TippyInTippy(e.target, clickedEvent);
  };

  // tippy 창
  const contentElement = document.createElement("div");
  const root = ReactDOM.createRoot(contentElement);
  root.render(
    eventsListOnDate.map((event) => (
      <div
        key={event.performanceId}
        id={event.performanceId}
        style={{
          backgroundColor: `${backgroundColor(
            event.isFestival,
            event.isForeign
          )}`,
          padding: "4px 8px",
          borderRadius: "4px",
          marginBottom: "4px",
        }}
      >
        {event.performanceTitle}
      </div>
    ))
  );
  contentElement.addEventListener("click", handleDayTippyOnClick);

  // 날짜에 이벤트 4개 이상이여야 창 뜨게
  if (eventsListOnDate.length > 3) {
    tippy(info.el, {
      content: contentElement,
      trigger: "click",
      placement: "top",
      animation: "scale-extreme",
      allowHTML: true,
      interactive: true,
      appendTo: () => document.body,

      onMount(instance) {
        const tippyBox = instance.popper.querySelector(".tippy-box");
        const tippyArrow = tippyBox.querySelector(".tippy-arrow");

        tippyBox.style.color = "#474747";
        tippyBox.style.backgroundColor = "#fff";
        tippyArrow.style.color = "#fff";
      },
    });
  }
};
