import { getService, postService, deleteService, putService } from './baseService';
import { AxiosResponse } from 'axios';
import { CourseDetail, CourseType, getCourseResponse } from '../model/course';

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

export const getACourseByIdService = async(id:string): Promise<any> => {
    
    let value: CourseDetail;

    return await getService(`courses/detail?id=${id}`).then(function (response: AxiosResponse) {
        value = response.data.data;

    }).catch(function (error) {
        // handle error
        console.log(error);
    }).then(function () {
        return value;
    })
};

export const getCourseTypes = async(): Promise<any> => {
    
    let value: CourseType[];

    return await getService(`courses/type`).then(function (response: AxiosResponse) {
        value = response.data.data;

    }).catch(function (error) {
        // handle error
        console.log(error);
    }).then(function () {
        return value;
    })
};