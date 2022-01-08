
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
    teacherName: string,
    type: CourseType[],
    uid: string,
    updatedAt: string
}