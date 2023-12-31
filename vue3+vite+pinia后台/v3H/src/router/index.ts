import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routes"
import nprogress from "nprogress"  //进度条
import { ElNotification } from "element-plus";
import "nprogress/nprogress.css"
import useUserStore from "../store/modules/user"
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        }
    },

})
router.beforeEach(async (to, from, next) => {
    //弹窗
    const open1 = (msg) => {
        ElNotification({
            title: "Success",
            message: msg,
            type: "success",
        });
    };
    const open4 = (msg: string) => {
        ElNotification({
            title: "Error",
            message: msg ,
            type: "error",
        });
    };
    //判断token是否正确
    const stu = useUserStore()
    const { profile } = stu
    const result = await profile()
    const user = result.data
    //进度条
    //nprogress
    nprogress.start()
    //鉴权
    const token = localStorage.getItem('token');
    if (to.name === 'sing') {
        //如果去的是注册页面，无论是从哪去都允许
        next()
    } else if (!user && (to.name !== 'login')) {
        //如果没有登录，去得不是登陆页面，则专挑到登录
        open4("您还没有登录，或者token过期")
        next({
            name: 'login'
        })
    }
    else if (user && to.name === 'login') {
        open1("您已经登录了，无需再次登录")
        //如果登录了，并且去的是登录页面，则跳转到首页
        next({
            name: 'home'
        })
    }
    else {
        //其他情况都允许
        next()
    }
})
router.afterEach((to, from) => {
    nprogress.done()//进度条结束
})
export default router