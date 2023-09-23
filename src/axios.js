import axios from "axios";
import {useUserStore} from "./stores/user.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    const userStore = useUserStore()
    const token = userStore.getAccessToken()
    if (token) {
      config.headers['x-access-token'] = token
    }
    console.log(token)
    return config
  }
)

export default axiosInstance
