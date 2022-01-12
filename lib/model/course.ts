import { Teacher } from "./teacher";

export interface BriefCourse {
    id: number,
    courseId?: number,
    name: string,
}
interface CourseType {
    id: number,
    name: string
}
export interface getCourseResponse extends BriefCourse {
    cover: string,
    createdAt: string,
    detail: string,
    duration: number,
    durationUnit: number,
    maxStudents: number,
    price: number,
    scheduleId: number,
    star: number,
    startTime: string,
    status: number,
    teacherId: number,
    teacherName?: string,
    type: CourseType[],
    uid: string,
    updatedAt: string
}

export interface CourseDetail extends getCourseResponse {
    teacher: Teacher,
    schedule: Schedule,
    sales: Sales
}

interface Schedule {
    createdAt: string,
    updatedAt: string,
    id: number,
    status: number,
    current: number,
    classTime: string[],
    chapters: Chapter[]
}

interface Chapter {
    createdAt: string,
    updatedAt: string,
    id: number,
    name: string,
    order: number,
    content: string
}

interface Sales {
    createdAt: string,
    updatedAt: string,
    id: number,
    batches: number,
    price: number,
    earnings: number,
    paidAmount: number,
    studentAmount: number,
    paidIds: string[]
}