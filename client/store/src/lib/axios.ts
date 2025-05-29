import axios from "axios";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});


// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error;

        if (!response) {
            toast.error("Unable to reach the server!", { description: "Please try again later." });
        } else if (response.status >= 500) {
            toast.error("Something went wrong!", { description: "Please try again later." });
        } 
        // Reject all errors so the application
        return Promise.reject(error);
    }
);

export default axiosInstance;

