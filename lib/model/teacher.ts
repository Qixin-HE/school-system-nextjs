import { ResponsePaginator } from './response'

export interface Skill {
    name: string,
    level: number
}

export interface TeacherResponse {
    total: number,
    teachers: Teacher[],
    paginator: ResponsePaginator

}
export interface TeacherListRecord {
    
    key: number,
    id: number,
    name: string,
    country: string,
    email: string,
    skills: Skill[],
    courseAmount: number,
    phone: string
}

export interface postTeacher {
    name:string,
    country:string,
    phone:string,
    skills?:Skill[],
    email:string
}
export interface Teacher {
    createdAt: string,
    updatedAt: string,
    id: number,
    country: string,
    courseAmount: number,
    email: string,
    name: string,
    phone: string,
    skills?: Skill[]
    profileId?:number //for course.ts - model to use in course detail
}
export interface getTeacherDetailResponse extends Teacher{
profileId:number,
profile: TeacherProfile,
code:number,
msg:string
}
interface TeacherProfile {
    createdAt: string,
    updatedAt: string,
    id: number,
    address: string[],
    gender: number,
    birthday: string,
    avatar:string,
    description:string
}