import { getService, postService, deleteService, putService } from './baseService';
import { AxiosResponse } from 'axios';
import { getCourseResponse } from '../model/course';

export const getCourseService = async () : Promise<any> => {
    const path = `courses`;
    let value:getCourseResponse;
    return await getService(path).then(function (response: AxiosResponse) {
        value = response.data.data.courses;
        return value
        console.log(value)

    }).catch(function (error) {
        // handle error
        console.log(error);
    })
}