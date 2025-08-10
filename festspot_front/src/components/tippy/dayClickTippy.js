import tippy from "tippy.js";

export const dayClickTippy = (info, content) => {
  tippy(info.dayEl, {
    content: content,
    trigger: "manual",
    placement: "top",
    animation: "scale-extreme",
  }).show();
};
