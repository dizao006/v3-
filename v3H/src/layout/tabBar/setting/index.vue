<template>
  <div class="right">
    <el-button size="default" icon="Refresh" circle @click="changeFlshow">
    </el-button>
    <el-button size="default" icon="FullScreen" circle @click="full">
    </el-button>
    <el-button size="default" icon="Setting" circle> </el-button>
    <img src="../../../../image/user.jpg" alt="" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人详情</el-dropdown-item>
          <el-dropdown-item @click="remove">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useSetting } from "../../../store/modules/setting";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
export default {};
</script>

<script lang="ts" setup>
let set = useSetting();
let userName = localStorage.getItem("nickname");
let { changeFlshow } = set;
const router = useRouter();
const open1 = () => {
  ElNotification({
    title: "Success",
    message: "退出登录成功，正在转跳登录页面",
    type: "success",
  });
};
function remove() {
  localStorage.removeItem("token");
  localStorage.removeItem("nickname");
  localStorage.removeItem("time");
  open1();
  setTimeout(() => {
    router.push({
      name: "login",
    });
  }, 300);
}
function full() {
  //dom属性，判断是否全屏
  let fu = document.fullscreenElement;
  if (!fu) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
</script>

<style scoped lang="scss">
img {
  margin: 0px 8px 0 18px;
  width: 45px;
  height: auto;
  border-radius: 45%;
}
.right {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  font-size: 30px;
  display: flex;
  align-items: center;
}
</style>