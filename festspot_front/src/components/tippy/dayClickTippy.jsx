import tippy from "tippy.js";
import ReactDOM from "react-dom/client";
import { TippyInTippy } from "./tippyInTippy";

export const DayClickTippy = (info, eventsListOnDate) => {
  let backgroundColor = (isFestival, isForeign) => {
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
