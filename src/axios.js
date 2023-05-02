import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reactapp-adc8d-default-rtdb.firebaseio.com'
})

export default instance