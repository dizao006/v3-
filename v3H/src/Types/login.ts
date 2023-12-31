import type { RouteRecordRaw } from "vue-router"
export interface userLogin {
    loginId: string | number
    nickname?: string
    loginPwd: string | number
}
export interface useState {
    menuRoutes: RouteRecordRaw []
}

