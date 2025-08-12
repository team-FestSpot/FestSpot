import tippy from "tippy.js";
import { getLocalDotDate } from "../../utils/getLocalDate";

export const performanceEventTippy = (info) => {
  const prevDay = new Date(info.event._instance.range.end);
  prevDay.setDate(prevDay.getDate() - 1);

  const performance = {
    title: info.event._def.title,
    start: info.event._instance.range.start,
    end: prevDay,
    ...info.event.extendedProps,
  };

  tippy(info.el, {
    content: `${performance.title}<br>
    ${
      performance.start.toDateString() === performance.end.toDateString()
        ? getLocalDotDate(performance.start)
        : getLocalDotDate(performance.start) +
          "~" +
          getLocalDotDate(performance.end)
    }<br>
    ${performance.performanceCast}<br>
    ${performance.performanceVenue}`,

    trigger: "click",
    placement: "top",
    animation: "scale-extreme",
    allowHTML: true,

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
