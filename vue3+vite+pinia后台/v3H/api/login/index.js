export let API = ((function () {

    //注册
    async function login(register) {
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
        let user = await repaly.json()
        return user
    }

    // 登录
    async function loginUp(user) {
        const repaly = await fetch('https://study.duyiedu.com/api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const result = await repaly.json()
        if (result.code === 0) {
            console.log(repaly)
            const token = repaly.headers.get('authorization')
            localStorage.setItem("token", token)
        }
        return result
    }

    //验证是否已经登陆了
    async function exist() {
        const token = localStorage.getItem('token')
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        const resit = await fetch('https://study.duyiedu.com/api/user/profile')
        return resit.json()
    }
    return {
        exist,
        login,
        loginUp
    }
}))()