<template>
  <div class="logo">
    <img v-if="!stu.isShow" src="/public/image/logo-white.png" />
    <img
      v-if="stu.isShow"
      style="transform: scale(60%) translate(25%)"
      src="/public/image/logo-small.png"
    />
  </div>
</template>

<script lang="ts">
import { useSetting } from "../../store/modules/setting";
export default {};
</script>

<script lang="ts" setup>
let stu = useSetting();
</script>

<style lang="scss" scope>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  transition: all 0.5s ease;
  cursor: pointer;
  width: 100%;
  height: $base-slider-min-width;
  img {
    width: 190px;
  }
}
</style>