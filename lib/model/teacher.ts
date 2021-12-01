import { ResponsePaginator } from './response'

interface Skill {
    name: string,
    level: number
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
    skills: Skill[]
}
export interface TeacherResponse {
    total: number,
    teachers: Teacher[],
    paginator: ResponsePaginator

}
export interface TeacherListRecord {
    id: number,
    name: string,
    country: string,
    email: string,
    skill: string,
    courseAmount: number,
    phone: string
}