import { TeacherListRecord, TeacherResponse, Teacher, postTeacher } from "../model/teacher";
import { AxiosResponse } from 'axios';
import { Key } from 'react';
import { getService, postService, deleteService, putService } from './baseService';

export const getTeacherListService = async (page?: number, limit?: number): Promise<any> => {
    var rows: TeacherListRecord[] = [];
    var value: TeacherResponse;
    if (page == undefined || limit == undefined) {
        page = 1;
        limit = 20;
    }

    return await getService(`teachers?page=${page}&limit=${limit}`).then(function (response: AxiosResponse) {
        value = response.data.data;
        //console.log(value)


    }).catch(function (error) {
        console.log(error);
    }).then(function () {
        var rows: any = [];
        const teacherRecords: Teacher[] = value.teachers;
        teacherRecords.forEach(e => {
            const teacherItem: TeacherListRecord = {
                key: e.id,
                id: e.id,
                name: e.name,
                country: e.country,
                email: e.email,
                skill: e.skills.map(item => item.name).join(","),
                courseAmount: e.courseAmount,
                phone: e.phone
            }
            //console.log(teacherItem)
            rows.push(teacherItem);
        })
        return { data: rows, total: value.total }
    }
    )
};

export const postDeleteTeacherService= async (id: string): Promise<any> => {


    return await deleteService(`teachers/${id}`).then(function (response: AxiosResponse) {
        const status = response.data;


        //console.log(`Status:  ${JSON.stringify(status)}`)
        if (status.msg == "success"){
        return true
         }else {
            return false;
        }

    })
        .catch(function (error) {
            console.log(error);
        });
};

export const postAddTeacherService = async (data: postTeacher): Promise<any> => {


    return await postService("teachers", data).then(function (response: AxiosResponse) {
        const status = response.data;


        console.log(`Status:  ${JSON.stringify(status)}`)
        if (status.msg == "success"){
        return {status: true,
        id: status.data.profileId}; }else {
            return {status: false};
        }

    })
        .catch(function (error) {
            console.log(error);
        });
};