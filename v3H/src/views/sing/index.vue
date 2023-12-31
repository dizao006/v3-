<template>
  <div class="body">
    <div class="box">
      <span class="borderLine"></span>
      <!-- 用form提交 -->
      <form>
        <h2>Sing up</h2>
        <div class="inputBox">
          <!-- required表示文本框必须输入内容,否则则在提交的时候默认提示 -->
          <input type="text" required class="inp1" v-model="LoginId" />
          <!-- 用一个i元素勾画出来一条线，改变其高度形成一个输入框 -->
          <span>LoginId</span><i></i>
        </div>
        <div class="inputBox">
          <input type="text" required class="inp2" v-model="NickName" />
          <!-- 用一个i元素勾画出来一条线，改变其高度形成一个密码框 -->
          <span>NickName</span><i></i>
        </div>
        <div class="inputBox">
          <input type="password" required class="inp3" v-model="LoginPwd" />
          <!-- 用一个i元素勾画出来一条线，改变其高度形成一个密码框 -->
          <span>LoginPwd</span><i></i>
        </div>
        <input type="submit" value="REGISTER" @click="rejust" />
      </form>
    </div>
  </div>
  <!-- 搭建基本结构 -->
</template>
  
<script type="ts" setup>
import useUserStore from "@/store/modules/user";
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { useRoute, useRouter } from "vue-router";
let LoginId = ref("");
let NickName = ref("");
let LoginPwd = ref("");
let userStore = useUserStore();
const router = useRouter();
const open1 = () => {
  ElNotification({
    title: "Success",
    message: "注册成功，请牢记你的账户密码，正在转跳登陆页面",
    type: "success",
  });
};
const open4 = (msg) => {
  ElNotification({
    title: "Error",
    message: msg + "请重新尝试",
    type: "error",
  });
};
async function rejust() {
  let repaly = await userStore.login({
    loginId: LoginId.value,
    nickname: NickName.value,
    loginPwd: LoginPwd.value,
  });
  if (repaly.code === 0) {
    open1();
    setTimeout(() => {
      router.push({
        name: "login",
      });
    }, 1500);
  } else {
    open4(repaly.msg);
    (LoginId.value = ""), (NickName.value = ""), (LoginPwd.value = "");
  }
}
</script>
  
  <style lang="css" scoped>
* {
  /* 清除默认样式 */
  margin: 0;
  padding: 0;
  font-size: 黑体;
  /* 设置成ie盒 */
  box-sizing: border-box;
}

.body {
  /* 对整整体进行设置 设置为弹性盒子,并且居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height 属性设置元素的最小高度为 100vh。vh 是视口高度的单位，1vh 等于浏览器窗口的高度的 1%。这意味着，
          设置 min-height: 100vh; 的元素的高度将至少为浏览器窗口的高度 底色设置为黑色*/
  min-height: 100vh;
  background: #222;
}

.box {
  /* 对整个盒子进行设置 超出部分隐藏用于最后的效果,并且相对定位相对于原本的位置进行定位,以便于子元素根据父元素的位置
          进行定位  子决父向 */
  overflow: hidden;
  position: relative;
  width: 380px;
  height: 420px;
  background: #1c1c1c;
  border-radius: 8px;
}
/* 对from进行样式设置 进行绝对定位,相对于上面的box进行定位, */
.box form {
  position: absolute;
  inset: 4px; /*定位元素边框或内边距的简写属性 设置所有方向的边距为4px 没啥用 */
  background: #222;
  padding: 50px 40px;
  border-radius: 8px;
  z-index: 2; /* 用于控制元素在垂直层叠顺序中的显示级别 较大的值表示元素在堆叠顺序中更靠前，
          即位于上层；较小的值表示元素在堆叠顺序中更靠后，即位于下层。 */
  display: flex;
  flex-direction: column; /*flex换轴 容器内的元素将在垂直方向上从上至下排列，
          主轴方向为垂直方向。这意味着元素将在垂直方向上按照从上到下的顺序进行布局，而不是默认的水平方向。*/
}
.box form h2 {
  color: #fff;
  font-weight: 500;
  text-align: center; /*加粗文字居中 */
  letter-spacing: 0.1em; /* 制文本中字符之间的间距为0.1em 属性应用于 <p>、<h> 以及 <span> 元素*/
}

.box form .inputBox {
  /* 相对于form进行定位 */
  position: relative;
  width: 300px;
  margin-top: 20px;
}

.box form .inputBox input {
  /* 相对于.inputBox进行定位 */
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent; /*input文本框隐藏起来方便用li标签的那根线撑起来形成文本框仅仅只是展示效果,实际上任然是input文本框 */
  outline: none;
  border: none;
  box-shadow: none; /*阴影设置*/
  color: #23242a;
  font-size: 1em;
  letter-spacing: 0.05em; /* 制文本中字符之间的间距为0.1em 属性应用于 <p>、<h> 以及 <span> 元素*/
  z-index: 10; /*优先级设置 */
  transition: 0.3s;
}

.box form .inputBox span {
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  pointer-events: none;
  color: #8f8f8f;
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: 0.5s; /*动画过渡*/
}

.box form .inputBox input:valid~span,/*选择器将选择所有紧跟在有效输入字段后的 <span> 元素。*/
      .box form .inputBox input:focus~span/*用于选中处于焦点状态的输入字段之后的所有 <span> 元素。*/ {
  color: #fff;
  font-size: 0.75em;
  transform: translateY(-34px); /*向上移动34个像素*/
}
.box form .inputBox i {
  position: absolute; /*相对于inputBox定位,并且在最左和最下面 */
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.5s;
  pointer-events: none;
}
/* 登录面块 获取点击时的样式，点击使得这条线变高形成输入框 */
.box form .inputBox input:valid ~ i,
.box form .inputBox input:focus ~ i {
  height: 42px;
}

/* 设置flex a链接的样式 */
.box form .links {
  display: flex;
  justify-content: space-between; /*容器内的 flex 项目在水平方向上均匀分布，
          项目之间的间距相等，并且最左侧和最右侧的项目紧贴容器的边界。*/
}

.box form .links a {
  margin: 10px 0;
  font-size: 0.75em;
  color: #8f8f8f;
}
/* 移动上去改变颜色 */
.box form .links a:hover,
.box form .links a:nth-child(2) {
  color: #fff;
}

/* 按钮样式 */
.box form input[type="submit"] {
  padding: 9px 25px;
  background: #fff;
  cursor: pointer; /*设置鼠标样式*/
  font-size: 0.9em;
  border-radius: 5px;
  font-weight: 600;
  width: 90%;
  margin-top: 50px;
  margin-left: 18px;
}

/* 登录按钮点击时透明度为80% */
.box form input[type="submit"]:active {
  opacity: 0.8;
}
/* 添加流光动画 */
.borderLine {
  position: absolute;
  top: 0;
  inset: 0;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.box::before,
.box::after,
.borderLine::before,
.borderLine::after {
  /* 对box和borderlin前后插入伪元素 为元素content必修有尽管它可以是空 */
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 420px;
  /* 使用线性渐变作为伪元素的背景样式。渐变采用了透明到非透明的过渡，具体颜色值会根据动画来变化。 */
  background: linear-gradient(
    0deg,
    transparent,
    transparent,
    #45f3ff,
    #45f3ff,
    #45f3ff
  );
  z-index: 1; /*设置伪元素的层级为 1，使其位于正常文档流之上。位于其他大于一的效果之下从而辅助形成一条线的效果*/
  transform-origin: bottom right; /*控制元素的旋转、缩放和倾斜等变换效果的起始位置 从右下开始从而形成逆时针效果bottom right*/
  animation: animate 6s linear infinite;
}
.box::after {
  animation-delay: -3s; /*动画开始前延迟*/
}

.borderLine::before {
  /* 使用线性渐变作为伪元素的背景样式。渐变采用了透明到非透明的过渡，具体颜色值会根据动画来变化。 */
  background: linear-gradient(
    0deg,
    transparent,
    transparent,
    #ff2770,
    #ff2770,
    #ff2770
  );
  animation-delay: -1.5s; /*动画开始前延迟*/
}
.borderLine::after {
  /* 使用线性渐变作为伪元素的背景样式。渐变采用了透明到非透明的过渡，具体颜色值会根据动画来变化。 */
  background: linear-gradient(
    0deg,
    transparent,
    transparent,
    #ff2770,
    #ff2770,
    #ff2770
  );
  animation-delay: -4.5s;
}
</style>