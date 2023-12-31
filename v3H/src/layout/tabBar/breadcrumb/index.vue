<template>
  <div class="left">
    <el-icon @click="changeIcon">
      <component :is="obj.isShow.value ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item
        v-for="(item, index) in route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="{
          path: item.path,
        }"
      >
        <el-icon size="20px" style="margin: 0 3px 0 10px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span style="margin: 0 8px 10px 0;">{{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { useSetting } from "../../../store/modules/setting";
export default {};
</script>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const ste = useSetting();
const obj = storeToRefs(ste);
const { changeIcon } = ste;
const route = useRoute();
</script>

<style lang="scss" scoped>
.left {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  font-size: 30px;
  display: flex;
  align-items: center;
}
</style>