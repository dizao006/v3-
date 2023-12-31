import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routes"
import nprogress from "nprogress"  //进度条
import "nprogress/nprogress.css"
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
router.beforeEach((to, from, next) => {
    //进度条
    //nprogress
    nprogress.start()
    const token = localStorage.getItem('token');
    if (to.name === 'sing') {
        next()
    } else if (!token && (to.name !== 'login')) {
        next({
            name: 'login'
        })
    } else if (token && to.name === 'login') {
        next({
            name: 'home'
        })
    } else {
        next()
    }
})
router.afterEach((to, from) => {
    nprogress.done()
})
export default router