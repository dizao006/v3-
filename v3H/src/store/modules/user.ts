import { defineStore } from "pinia";
import type { userLogin, useState } from "@/Types/login";

import { getCurrentTime } from "@/utils/time"
import { constantRoutes } from "../../router/routes"
const useUserStore = defineStore('User', {
    state: () => {
        return {
            nickname: '',
            loginId: '',
            loginTime: '',
            menuRouters: constantRoutes
        }
    },
    actions: {
        //登录方法
        async userLogin(user: userLogin) {
            console.log('@@@', user)
            const repaly = await fetch('https://study.duyiedu.com/api/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const result = await repaly.json()
            console.log(result)
            if (result.code === 0) {
                const token = repaly.headers.get('authorization')
                localStorage.setItem("token", JSON.stringify(token))
                this.$state.loginId = result.data.loginId
                this.$state.nickname = result.data.nickname
                this.$state.loginTime = getCurrentTime()
                localStorage.setItem("time", this.$state.loginTime)
                localStorage.setItem("nickname", this.$state.nickname)
            }

            return result
        },
        async login(register: userLogin) {
            const headers = {
                'Content-Type': 'application/json'
            };
            const token = localStorage.getItem('token');
            if (token) {
                headers.authorization = `Bearer ${token}`;
            }
            const repaly = await fetch("https://study.duyiedu.com/api/user/reg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(register)
            })
            const user = await repaly.json()

            return user
        }
    },
    getters: {

    }
})

export default useUserStore