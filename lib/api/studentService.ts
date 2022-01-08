import { getService, postService, deleteService, putService } from './baseService';
import { getStudentResponse, Student, StudentListRecord, postStudent, editPutStudent } from "../model/student";
import { AxiosResponse } from 'axios';
import { Key } from 'react';


export const getStudentListService = async (page?: number, limit?: number,query?:string): Promise<any> => {
    var rows: StudentListRecord[] = [];
    var value: getStudentResponse;
    if (page == undefined || limit == undefined) {
        page = 1;
        limit = 10;
    }
    let path = `students?page=${page}&limit=${limit}`;
    if (query !== undefined){
path += `&query=${query}`
    }
    // if (id !== undefined){
    //     path += `&id=${id}`
    // }

    return await getService(path).then(function (response: AxiosResponse) {
        value = response.data.data;
        //console.log(value)

    }).catch(function (error) {
        // handle error
        console.log(error);
    }).then(function () {

        const studentRecords: Student[] = value.students;

        const calculateJoinTime = (joinTime: string): string => {
            const now = new Date();
            const then = new Date(joinTime);
            const Difference_In_Time: number = now.getTime() - then.getTime();

            // To calculate the no. of days between two dates
            const years: number = Difference_In_Time / (1000 * 3600 * 24 * 30 * 12);

            const almostYear: number = parseInt(years.toString()) + 1;

            if (parseInt((years % 1).toFixed(2).substring(2)) >= 50) {
                return "Almost " + almostYear + " years ago"
            } else if (parseInt((years % 1).toFixed(2).substring(2)) < 50) {
                return "Over " + parseInt(years.toString()) + " years ago"
            }
            return "No record."
        }

        studentRecords.forEach(e => {
            const studentItem: StudentListRecord = {
                key: e.id as Key,
                id: e.id,
                name: e.name,
                area: e.country,
                email: e.email,
                selectedCurriculum: e.courses !== undefined ? e.courses.map(item => item.name).join(",") : "",
                studentType: e.type != null ? e.type.name : "null",
                joinTime: calculateJoinTime(e.createdAt)
            }
            rows.push(studentItem);

        })
        return { data: rows, total: value.total };
    })
};


export const logOutService = async (): Promise<any> => {


    return await postService("logout").then(function (response: AxiosResponse) {
        const status = response.data.msg;
        if (status === "success") {
            localStorage.removeItem("token")
            //alert(`You have ${status}fully logout.`)
            //router.push("/")
        }
        return true;
    })
        .catch(function (error) {
            console.log(error);
        });
};



export const postAddStudentService = async (data: postStudent): Promise<any> => {


    return await postService("students", data).then(function (response: AxiosResponse) {
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

export const postDeleteStudentService= async (id: string): Promise<any> => {


    return await deleteService(`students/${id}`).then(function (response: AxiosResponse) {
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


export const putEditStudentService = async (data: editPutStudent): Promise<any> => {


    return await putService("students", data).then(function (response: AxiosResponse) {
        const status = response.data;


        console.log(status)

    })
        .catch(function (error) {
            console.log(error);
        });
};


export const getAStudentByIDService = async(id:string): Promise<any> => {
    let rows: StudentListRecord[] = [];
    let value: getStudentResponse;

    return await getService(`students/${id}`).then(function (response: AxiosResponse) {
        value = response.data.data;
        
        
        //console.log(value)

    }).catch(function (error) {
        // handle error
        console.log(error);
    }).then(function () {
    
        return value;
    })
};

