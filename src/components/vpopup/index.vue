<script setup lang='ts'>
import { CSSProperties, Ref } from "vue";

const { direction = "right" } = defineProps<{
  direction?: "top" | "left" | "right" | "bottom";
}>();

const popup = reactive({ slot: "", show: false });

const popupStyle = reactive<CSSProperties>({});
const vpopupRef = $ref<HTMLDivElement>();
const popupRef = $ref<HTMLDivElement>();

provide("popup", popup);
const popupInject = inject<typeof popup | null>("popup", null);

watch(toRef(popup, "show"), val => {
  if (popupInject) popupInject.show = val;
  if (!val) return;
  nextTick(() => {
    const { clientWidth, clientHeight } = vpopupRef;
    const { offsetLeft, offsetTop } = deepPosition(vpopupRef);
    if (direction == "bottom") {
      popupStyle.left = offsetLeft + clientWidth / 2 - popupRef.clientWidth / 2 + "px";
      popupStyle.top = offsetTop + clientHeight + "px";
    } else if (direction == "right") {
      popupStyle.left = offsetLeft + clientWidth + "px";
      popupStyle.top = offsetTop + clientHeight / 2 - popupRef.clientHeight / 2 + "px";
    } else if (direction == "top") {
      popupStyle.left = offsetLeft + clientWidth / 2 - popupRef.clientWidth / 2 + "px";
      popupStyle.top = offsetTop - popupRef.clientHeight + "px";
    } else if (direction == "left") {
      popupStyle.left = offsetLeft - popupRef.clientWidth + "px";
      popupStyle.top = offsetTop + clientHeight / 2 - popupRef.clientHeight / 2 + "px";
    }
  });
});



const deepPosition = (el: HTMLElement) => {
  let { offsetLeft, offsetTop } = el;
  const offsetParent = el.offsetParent as HTMLElement;
  if (offsetParent) {
    const sub = deepPosition(offsetParent);
    offsetLeft += sub.offsetLeft;
    offsetTop += sub.offsetTop;
  }
  return { offsetLeft, offsetTop };
};


</script>

<template>
  <div ref="vpopupRef">
    <slot :popup="popup"></slot>
  </div>
  <teleport to="body">
    <transition>
      <div v-show="popup.show" ref="popupRef" pos="absolute" :style="popupStyle" z="100"
        @mouseenter="popup.show = true" @mouseleave="popup.show = false">
        <slot :name="popup.slot"></slot>
      </div>
    </transition>
  </teleport>
</template>

<style lang='less' scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>