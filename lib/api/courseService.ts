import { getService, postService, deleteService, putService } from './baseService';
import { AxiosResponse } from 'axios';
import { CourseDetail, CourseType, getCourseResponse, postCourse } from '../model/course';

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

export const postCourseService = async (data: postCourse): Promise<any> => {


    return await postService("courses", data).then(function (response: AxiosResponse) {
        const status = response.data;


        console.log(`Printing from postCourseService - response-data:  ${JSON.stringify(status)}`)
        if (status.msg == "success") {
            return {
                status: true,
                id: status.data.id,
                name: status.data.name
            };
        } else {
            return { status: false };
        }

    })
        .catch(function (error) {
            console.log(error);
        });
};