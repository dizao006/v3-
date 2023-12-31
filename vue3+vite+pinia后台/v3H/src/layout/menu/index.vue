<template>
  <template v-for="route in menuList" :key="route.path">
    <!-- 有子集但只有一个 -->
    <template v-if="route.children && route.children.length === 1">
      <el-menu :default-active="route2.path">
        <el-menu-item
          :index="route.children[0].path"
          v-if="!route.meta.hidden"
          @click="goRoute"
        >
          <el-icon>
            <component :is="route.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ route.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </template>
    <!-- 无子集 -->
    <template v-if="!route.children">
      <el-menu :default-active="route2.path">
        <el-menu-item
          :index="route.path"
          v-if="!route.meta.hidden"
          @click="goRoute"
        >
          <el-icon>
            <component :is="route.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ route.meta.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </template>
    <!-- 有子集且有多个 -->
    <template v-if="route.children && route.children.length > 1">
      <el-menu :default-active="route2.path">
        <el-sub-menu :index="route.path" v-if="!route.meta.hidden">
          <template #title>
            <el-icon>
              <component :is="route.meta.icon"></component>
            </el-icon>
            <span>{{ route.meta.title }}</span>
          </template>
          <Menus :menuList="route.children"></Menus>
        </el-sub-menu>
      </el-menu>
    </template>
  </template>
</template>

<script lang="ts">
import { defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "Menus",
};
</script>
<script lang="ts" setup>
defineProps(["menuList"]);
const router = useRouter();
const route2 = useRoute();
const goRoute = (path: any) => {
  router.push(path.index);
};
</script>

<style scoped lang="scss">
.menuse {
  color: #001529;
}
.el-menu {
      margin-left: 0px;
    }
</style>