<template>
  <div class="tabbar">
    <div class="left">
      <left></left>
    </div>
    <div class="zhong">
      <span>登录时间：{{ time }}</span>
    </div>

    <div class="right">
      <right></right>
    </div>
  </div>
</template>

<script lang="ts">
import left from "./breadcrumb/index.vue";
import right from "./setting/index.vue";
export default {
  components: {
    left,
    right,
  },
};
</script>

<script lang="ts" setup>
let time = localStorage.getItem("time");
</script>

<style lang="scss" scope>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.zhong {
  display: flex;
  align-items: center;
  transition: all 0.3s;
  font-weight: bolder;
}
</style>