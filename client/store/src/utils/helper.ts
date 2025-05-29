import { isAxiosError } from "axios";

export const handleError = (error: any, defaultMessage: string) => {
    let message = defaultMessage;
    if(isAxiosError(error)){
        message = error.response?.data.message || defaultMessage;
    } else if(error.message){
        message = error.message;
    }
    return message;
} 