import { ResponsePaginator } from "./response";

export interface StudentListRecord {
    key:number,
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
interface Course {
    id: number,
    courseId: number,
    name: string, 
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
    courses: Course[],

}
export interface getStudentResponse {
    total: number,
    students: Student[],
    paginator: ResponsePaginator
}