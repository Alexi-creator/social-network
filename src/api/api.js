import * as axios from "axios";


const instance = axios.create({ // создаем шаблон класса и экземпляр и передаем параметры которые будут у экземпляра
    withCredentials: true, // разрешает делать запросы с чужого(в нашем случае локального) хоста на другой сервер
    baseURL: `https://social-network.samuraijs.com/api/1.0/`, // базовый URL к нему будет приклеиваться url который будум писать в самом запросе например get запросе
    headers: {
        "API-KEY": "3e7f4bcc-dd86-4953-9c72-9b8ea9a9bcc1"
    }
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data) // возврщаем конкретно объект data из ответа
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    }
}

export const myAPI = {
    getMyData() {
        return instance.get(`auth/me`)
            //.then(response => response.data) // возврщаем конкретно объект data из ответа
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const userAPI = {
    getUserData(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data) // возврщаем конкретно объект data из ответа
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, { status: status}) // отправляем статус, status: - это то название св-ва которое требуеться по дукументации API
    },
    savePhoto(photoFile) {
        // отправляем фото а не json поэтому нужно создать другой тип данных (content-type)
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
}

// капча
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
