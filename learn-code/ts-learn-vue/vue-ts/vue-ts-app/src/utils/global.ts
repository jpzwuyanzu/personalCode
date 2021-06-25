import { AxiosRequestConfig, AxiosResponse } from "axios";

declare global {
    interface Window {
        axios(config: AxiosRequestConfig): AxiosResponse<any>
    }
}