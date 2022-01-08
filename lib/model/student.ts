import { Key } from "react";
import { BriefCourse } from "./course";
import { ResponsePaginator } from "./response";

export interface StudentListRecord {
    key: Key,
    id: number,
    name: string,
    area: string,
    email: string,
    selectedCurriculum: string,
    studentType: string,
    joinTime: string | undefined
}
type StudentTypeName = "tester" | "developer";

interface StudentType {
    id: number,
    name: StudentTypeName
}


export interface CourseStudentDetail extends BriefCourse {
    key: number,
    type: string,
    joinTime: string
}

export interface getStudentResponse {
    total: number,
    students: Student[],
    paginator: ResponsePaginator
}

// export interface getStudentDetailResponse extends Student {

// }

export interface postStudent {

    name: string,
    country: string,
    email: string,
    type: number
}
export interface editPutStudent extends postStudent {
    id: number
}

export interface Address {
    place: string
}

export interface Student {
    createdAt: string,
    updatedAt: string,
    id: number,
    email: string,
    name: string,
    country: string,
    profileId: number,
    type: StudentType,
    courses?: BriefCourse[],

}

interface StudentDetailCourseType {
    id: number,
    name: string
}
// interface Course {
//     id: number,
//     courseId?: number,
//     name: string,
// }

interface StudentDetailCourse extends BriefCourse {
    courseDate: string,
    createdAt: string,
    studentId: number,
    type: StudentDetailCourseType[],
    updatedAt: string
}

export interface StudentDetail extends Student {
    address: Address[],
    age: number,
    avatar: string,
    description: string,
    education: string,
    gender: number,
    interest: string[],
    memberEndAt: string,
    memberStartAt: string,
    phone: string,
    courses: StudentDetailCourse[]
}