<template>
  <router-view v-slot="{ Component }">
    <!-- 一级路由的子路由的进出动画 -->
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { useSetting } from "../../store/modules/setting";
export default {};
</script>
<script lang="ts" setup>
import { nextTick, ref, watch } from "vue";
const ste = useSetting();
let flag = ref(true);
watch(
  () => ste.reflshow,
  () => {
    flag.value = false;
    nextTick(() => {
      //可以获取更新后的状态
      flag.value = true;
    });
  }
);
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>