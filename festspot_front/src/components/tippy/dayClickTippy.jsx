import tippy from "tippy.js";
import ReactDOM from "react-dom/client";

export const dayClickTippy = (info, eventsListOnDate) => {
  const content = document.createElement("div");
  const root = ReactDOM.createRoot(content);
  root.render(eventsListOnDate.map((event) => <div>{event._def.title}</div>));

  const htmlString = eventsListOnDate
    .map((event, idx) => {
      const { isFestival, isForeign } = event._def.extendedProps;

      let backgroundColor = "#FBD8D0";
      if (isFestival) {
        backgroundColor = "#ffda77";
      } else if (isForeign) {
        backgroundColor = "#a2d2ff";
      }
      const padding = "4px 8px";
      const borderRadius = "4px";
      const marginBottom = "4px";

      return `<div style="
      background-color: ${backgroundColor};
      padding: ${padding};
      border-radius: ${borderRadius};
      margin-bottom: ${marginBottom};
    ">
      ${event._def.title}
    </div>`;
    })
    .join("");

  if (eventsListOnDate.length > 0) {
    tippy(info.dayEl, {
      content: htmlString,
      trigger: "manual",
      placement: "top",
      animation: "scale-extreme",
      allowHTML: true,

      onMount(instance) {
        const tippyBox = instance.popper.querySelector(".tippy-box");
        const tippyArrow = tippyBox.querySelector(".tippy-arrow");

        tippyBox.style.color = "#474747";
        tippyBox.style.backgroundColor = "#fff";
        tippyArrow.style.color = "#fff";
      },
    }).show();
  }
};
