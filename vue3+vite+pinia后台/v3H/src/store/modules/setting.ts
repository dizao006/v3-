import { defineStore } from "pinia";
import { ref } from "vue";
export const useSetting = defineStore('setting', {
    state: () => {
        return {
            isShow: ref(false), //控制菜单展示
            reflshow: ref(false)//控制刷新
        }
    },
    actions: {
        changeIcon() {
            console.log(this.isShow)
            this.$state.isShow = !this.$state.isShow;
            console.log(this.isShow)
        },
        changeFlshow() {
            console.log(this.reflshow)
            this.$state.reflshow = !this.$state.reflshow;
        }
    }
});