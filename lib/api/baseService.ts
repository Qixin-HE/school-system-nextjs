import axios, { AxiosResponse } from 'axios';


export const getService = (path: string): Promise<AxiosResponse> => {
    const token = localStorage.getItem("token");
    return axios.get(`http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/${path}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}

export const postService = (path: string): Promise<AxiosResponse> => {
    const token = localStorage.getItem("token");
    return axios.post(`http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/${path}`, "", {
        headers: { 'Authorization': `Bearer ${token}` }
    })
}
