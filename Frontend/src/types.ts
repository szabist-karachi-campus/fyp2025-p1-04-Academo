export type Student = {
    username: string;
    darja: number;
    attendance: Attendance[];
    percentage: number;
};

export type Attendance = {
    attendance: string;
    dateToday: string;
};

export type singleStudent = {
    username: string;
    darja: number;
    attendance: Attendance;
};

export type date = {
    dateToday: string;
    dayToday: string;
}

export type Darja = {
    darjaID: string;
    admin: string
}

export type percentage = {
    percentage: number
}

export type Courses = {
    courseTitle: string;
    teacher: string;
    description: string;
    darja: number;
    availability: string;
    image: string;
}

export type Teacher = {
    fullName: string;
    admin: string;
}

export type Events = {
    eventName: string,
    eventDate: string,
    eventDescription: string,
    eventImage: string,
}

export interface teacherCourse {
    _id: string
    course: string,
    darja: number,
    totalStudents: number,
    teacher: string
}

export interface adminCourse {
    _id: string
    course: string,
    darja: number,
    totalStudents: number,
    teacher: string
}

export type studentMarks = {
    _id: string,
    username: string;
    fullname: string;
    darja: number
    marks: number;
};