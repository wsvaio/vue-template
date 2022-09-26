<template>
  <span class="copyright">
    <span class="first">xxxx 提供技术支持</span>
    <el-tooltip placement="top" effect="light">
      <template #content>
        <img src="@/assets/about_us.jpg" />
      </template>
      <el-link href="#">联系我们</el-link>
    </el-tooltip>
    <span>Copyright@2016-2022 xxxx有限公司 版权所有</span>
    <el-link target="__blank" href="#">xxxx</el-link>
    <el-link target="__blank"
      href="#">
      xxxx
    </el-link>
  </span>
</template>

<style lang="less" scoped>
.copyright {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);


  .first~* {
    vertical-align: baseline;
    margin-left: .5em;
  }

}
</style>