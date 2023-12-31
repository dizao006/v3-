<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-side" :class="{ isShow: ste.isShow ? true : false }">
      <logo></logo>
      <!-- 菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="#fff"
          :default-active="route.path"
          :collapse="ste.isShow ? true : false"
        >
          <Menus :menuList="store.menuRouters"></Menus>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout-top" :class="{ isShow: ste.isShow ? true : false }">
      <tabBar></tabBar>
    </div>
    <!-- 内容展示 -->
    <div class="layout-main" :class="{ isShow: ste.isShow ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts">
import logo from "./logo/index.vue";
import Menus from "./menu/index.vue";
import { constantRoutes } from "../router/routes";
import useUserStore from "@/store/modules/user";
import { useRoute } from "vue-router";
import Main from "./main/index.vue";
import tabBar from "./tabBar/index.vue";
import { useSetting } from "../store/modules/setting";
export default {
  setup() {
    const store = useUserStore();
    const routes = constantRoutes;
    const route = useRoute();
    const ste = useSetting();
    return {
      routes,
      store,
      route,
      ste,
    };
  },
  components: {
    logo,
    Menus,
    Main,
    tabBar,
  },
};
</script>

<style scoped lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
}
.layout-side {
  width: $base-slider-width;
  height: 100vh;
  background-color: $base-slider-bgcolor;
  transition: all 0.3s;
  &.isShow {
    margin-left: -10px;
    padding-right: 10px;
    width: 49px;
    min-height: 400px;
  }
  .scrollbar {
    width: 100%;
    height: calc(100vh - 70px);
    .el-menu {
      border-right: none;
    }
  }
}
.layout-top {
  position: fixed;
  width: calc(100% - $base-slider-width);
  height: $base-tabbar-height;
  top: 0px;
  left: $base-slider-width;
  transition: all 0.3s;
  background-image: linear-gradient(
    to right,
    rgb(236, 212, 212),
    rgb(214, 211, 211)
  );
  &.isShow {
    width: calc(100vw - 39px);
    left: 39px;
  }
}
.layout-main {
  position: absolute;
  width: calc(100% - $base-slider-width);
  height: calc(100vh - $base-tabbar-height);
  top: calc($base-tabbar-height + 2px);
  left:calc($base-slider-width + 2px) ;
  // margin-left:3px ;
  transition: all 0.3s;
  overflow: auto;
  &.isShow {
    width: calc(100vw - 39px);
    left: 39px;
  }
}
</style>