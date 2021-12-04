import axios, { AxiosResponse } from 'axios';
import { url } from './configuration';


export const getService = (path: string): Promise<AxiosResponse> => {
    const token = localStorage.getItem("token");
    //console.log(`${url}${path}`)
    return axios.get(`${url}${path}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const postService = (path: string, data?: any): Promise<AxiosResponse> => {
    const token = localStorage.getItem("token");
    if (data == undefined) {
        data = "";
    }
    return axios.post(`${url}${path}`, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}
