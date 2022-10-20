<script setup name="home" lang='ts'>
import mySvg from "@/assets/svg/test.svg";
</script>

<template tag="div">
  <div></div>
  <!-- <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" un:border="black 1px">
    <g>
      <text x="0" y="0">🐎</text>
      <animateMotion path="M10,80 q100,120 120,20 q140,-50 160,0" begin="0s" dur="3s" rotate="auto" repeatCount="indefinite"></animateMotion>
    </g>
    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="red"></line>
    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="red"></line>

  </svg> -->
</template>

<style lang="less" scoped>
// svg {
//   shape-rendering: crispedges;

//   text {
//     transform-origin: 50% 50%;
//     // animation: r 3s linear infinite alternate;
//     dominant-baseline: middle;
//     text-anchor: middle;
//     offset-path: path("M0 50 L10 60 20 70 30 20 100 50");
//     // offset-rotate: 0deg;

//     @keyframes r {
//       0% {
//         offset-distance: 0%;
//       }

//       100% {
//         offset-distance: 100%;
//       }
//     }
//   }
// }
div {
  width: 500px;
  height: 500px;
  background: url("@/assets/svg/test.svg") center / cover;
}
</style>