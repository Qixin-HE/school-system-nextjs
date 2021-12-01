import { getService, postService } from './baseService';
import { getStudentResponse, Student, StudentListRecord } from "../model/student";
import { TeacherListRecord, TeacherResponse, Teacher } from "../model/teacher";
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router'

export const getStudentListService = async (page?: number, limit?: number): Promise<any> => {
    var rows: StudentListRecord[] = [];
    var value: getStudentResponse;
    if (page == undefined || limit == undefined) {
        page = 1;
        limit = 20;
    }

    return await getService(`students?page=${page}&limit=${limit}`).then(function (response: AxiosResponse) {
        value = response.data.data;
        //console.log(value)

    }).catch(function (error) {
        // handle error
        console.log(error);
    }).then(function () {

        const json: Student[] = value.students;

        const calculateJoinTime = (joinTime: string): string => {
            const now = new Date();
            const then = new Date(joinTime);
            var Difference_In_Time: number = now.getTime() - then.getTime();

            // To calculate the no. of days between two dates
            var years: number = Difference_In_Time / (1000 * 3600 * 24 * 30 * 12);

            const almostYear: number = parseInt(years.toString()) + 1;

            if (parseInt((years % 1).toFixed(2).substring(2)) >= 50) {
                return "Almost " + almostYear + " years ago"
            } else if (parseInt((years % 1).toFixed(2).substring(2)) < 50) {
                return "Over " + parseInt(years.toString()) + " years ago"
            }
            return "No record."
        }

        json.forEach(e => {
            const obj: StudentListRecord = {
                key: e.id,
                id: e.id,
                name: e.name,
                area: e.country,
                email: e.email,
                selectedCurriculum: e.courses.map(item => item.name).join(","),
                studentType: e.type != null ? e.type.name : "null",
                joinTime: calculateJoinTime(e.createdAt)
            }
            rows.push(obj);

        })
        return { data: rows, total: value.total };
    })
};


export const logOutService = async (): Promise<any> => {


    return await postService("logout").then(function (response: AxiosResponse) {
        const status = response.data.msg;
        if (status === "success") {
            localStorage.removeItem("token")
            alert(`You have ${status}fully logout.`)
            //router.push("/")
        }
        return true;
    })
        .catch(function (error) {
            console.log(error);
        });
};

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
        const json: Teacher[] = value.teachers;
        json.forEach(e => {
            const obj: TeacherListRecord = {
                id: e.id,
                name: e.name,
                country: e.country,
                email: e.email,
                skill: e.skills.map(item => item.name).join(","),
                courseAmount: e.courseAmount,
                phone: e.phone
            }
            console.log(obj)
            rows.push(obj);
        })
        return { data: rows, total: value.total }
    }
    )
};