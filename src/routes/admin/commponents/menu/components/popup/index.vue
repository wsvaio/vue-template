<script setup lang='ts'>
import { debounce } from "lodash";
import { CSSProperties, Ref } from "vue";

const props = defineProps<{
  direction?: "top" | "left" | "right" | "bottom";
  gap?: number;
}>();


// const popup = reactive({ show: false });


const popupStyle = reactive<CSSProperties>({});
const vpopupRef = $ref<HTMLDivElement>();
const popupRef = $ref<HTMLDivElement>();

let popupShow = $ref(false);
const setPopupShow = debounce(show => popupShow = show, 100);

const syncPopupShowInject = inject<typeof syncPopupShow | null>("syncPopupShow", null);
const syncPopupShow = (show) => {
  setPopupShow(show);
  syncPopupShowInject && syncPopupShowInject(show);
};
provide("syncPopupShow", syncPopupShow);

const setPosition = (direction = "bottom") => {
  if (!vpopupRef || !popupRef) return;
  const { clientWidth, clientHeight } = vpopupRef;
  const { clientWidth: width, clientHeight: height } = document.documentElement;
  let { offsetLeft, offsetTop } = deepPosition(vpopupRef);
  const { gap = 12 } = props;
  // console.log(clientWidth, clientHeight, width, height, gap, direction, offsetLeft, offsetTop);
  if (direction == "bottom") {
    offsetLeft = offsetLeft + clientWidth / 2 - popupRef.clientWidth / 2;
    offsetTop = offsetTop + clientHeight + gap;
    if (offsetTop + popupRef.clientHeight > height) return setPosition("top");
  } else if (direction == "right") {
    offsetLeft = offsetLeft + clientWidth + gap;
    offsetTop = offsetTop + clientHeight / 2 - popupRef.clientHeight / 2;
    if (offsetLeft + popupRef.clientWidth > width) return setPosition("left");
  } else if (direction == "top") {
    offsetLeft = offsetLeft + clientWidth / 2 - popupRef.clientWidth / 2;
    offsetTop = offsetTop - popupRef.clientHeight - gap;
    if (offsetTop < 0) return setPosition("bottom");
  } else if (direction == "left") {
    offsetLeft = offsetLeft - popupRef.clientWidth - gap;
    offsetTop = offsetTop + clientHeight / 2 - popupRef.clientHeight / 2;
    if (offsetLeft < 0) return setPosition("right");
  }

  if (offsetTop < 0) offsetTop = 0;
  else if (offsetTop + popupRef.clientHeight > height) offsetTop = height - popupRef.clientHeight;

  if (offsetLeft < 0) offsetLeft = 0;
  else if (offsetLeft + popupRef.clientWidth > width) offsetLeft = width - popupRef.clientWidth;

  return { offsetLeft, offsetTop };
};

watch($$(popupShow), val => {
  if (!val) return;
  const { direction = "bottom", gap = 12 } = props;
  popupStyle.maxWidth = ["left", "right"].includes(direction) ? `calc(50vw - ${gap * 4}px)` : "100vw";
  popupStyle.maxHeight = ["top", "bottom"].includes(direction) ? `calc(50vh - ${gap * 4}px)` : "100vh";
  nextTick(() => {
    const { offsetLeft, offsetTop } = setPosition(props.direction);
    popupStyle.left = offsetLeft + "px";
    popupStyle.top = offsetTop + "px";
  });
});




const deepPosition = (el: HTMLElement) => {
  let { offsetLeft, offsetTop, scrollTop, scrollLeft } = el;
  const offsetParent = el.offsetParent as HTMLElement;
  if (offsetParent) {
    const sub = deepPosition(offsetParent);
    offsetLeft += sub.offsetLeft;
    offsetTop += sub.offsetTop;
  }
  return { offsetLeft: offsetLeft - scrollLeft, offsetTop: offsetTop - scrollTop };
};

onBeforeMount(() => {
  let el = document.querySelector("#popup-box");
  if (!el) {
    el = document.createElement("div");
    el.id = "popup-box";
    document.querySelector("body")!.appendChild(el);
  }
});


</script>

<template>
  <div ref="vpopupRef" :="$attrs" @mouseleave="syncPopupShow(false)"
    @mousemove="syncPopupShow(true)" @mouseenter="syncPopupShow(true)">
    <slot></slot>
  </div>
  <teleport to="#popup-box">
    <transition>
      <div v-if="popupShow" ref="popupRef" class="popup" :style="popupStyle"
        @mouseleave="syncPopupShow(false)" @mousemove="syncPopupShow(true)"
        @mouseenter="syncPopupShow(true)">
        <slot name="popup"></slot>
      </div>
    </transition>
  </teleport>
</template>

<style lang='less' scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.popup {
  overflow: auto;
  position: absolute;
  z-index: 9999;
  background: var(--menu-bg-color, #001529);
  box-shadow: var(--el-box-shadow);
}
</style>





