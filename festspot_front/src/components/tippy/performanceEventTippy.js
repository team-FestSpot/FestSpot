import tippy from "tippy.js";

export const performanceEventTippy = (info) => {
  tippy(info.el, {
    content: `${info.event._def.title}`,
    trigger: "click",
    placement: "top",
    animation: "scale-extreme",
    onMount(instance) {
      const tippyBox = instance.popper.querySelector(".tippy-box");
      const tippyArrow = tippyBox.querySelector(".tippy-arrow");

      const { isFestival, isForeign } = info.event.extendedProps;

      if (isFestival) {
        tippyBox.style.backgroundColor = "#ffda77";
        tippyBox.style.color = "#474747";
        tippyArrow.style.color = "#ffda77";
      } else if (isForeign) {
        tippyBox.style.backgroundColor = "#a2d2ff";
        tippyBox.style.color = "#474747";
        tippyArrow.style.color = "#a2d2ff";
      } else {
        tippyBox.style.backgroundColor = "#FBD8D0";
        tippyBox.style.color = "#474747";
        tippyArrow.style.color = "#FBD8D0";
      }
    },
  });
};
