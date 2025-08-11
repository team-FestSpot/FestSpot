import tippy from "tippy.js";
import ReactDOM from "react-dom/client";

export const dayClickTippy = (info, eventsListOnDate) => {
  const content = document.createElement("div");
  const root = ReactDOM.createRoot(content);
  root.render(eventsListOnDate.map((event) => <div>{event._def.title}</div>));

  tippy(info.dayEl, {
    content: content,
    trigger: "manual",
    placement: "top",
    animation: "scale-extreme",
    allowHTML: true,

    onMount(instance) {
      console.log("instance", instance);

      const tippyBox = instance.popper.querySelector(".tippy-box");
      const tippyArrow = tippyBox.querySelector(".tippy-arrow");
    },
  }).show();
};
