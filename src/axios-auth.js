import axios from "axios";

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: 'AIzaSyBG5YyNA32-gb9mtXd4Qe5ibHsbqOSyb9o'
    }
})

export default instance