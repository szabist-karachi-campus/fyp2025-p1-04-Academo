import { Class, Teacher } from "./InputForm";

// const teacherSubjects = [
//     { teacherId: 1, name: "Mr. Smith", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
//     { teacherId: 2, name: "Ms. Johnson", subjects: ["Chemistry", "History", "Physics", "Mathematics", "Biology"] },
//     { teacherId: 3, name: "Mr. Brown", subjects: ["Mathematics", "Biology", "English", "History", "Physics"] },
//     { teacherId: 4, name: "Ms. Davis", subjects: ["Physics", "Chemistry", "Mathematics", "English", "History"] },
//     { teacherId: 5, name: "Mr. Wilson", subjects: ["English", "History", "Mathematics", "Physics", "Chemistry"] },
//     { teacherId: 6, name: "Ms. Taylor", subjects: ["Biology", "Chemistry", "Mathematics", "Physics", "English"] },
//     { teacherId: 7, name: "Mr. Anderson", subjects: ["Physics", "Mathematics", "History", "English", "English"] },
//     { teacherId: 8, name: "Ms. Martinez", subjects: ["History", "Biology", "Mathematics", "Physics", "Chemistry"] }
// ];

// // Array of subjects required for each class
// const classSubjects = [
//     { classId: 1, grade: "10th", subjects: ["Mathematics", "Physics", "English", "Chemistry", "Biology"] },
//     { classId: 2, grade: "11th", subjects: ["Chemistry", "Biology", "History", "Mathematics", "Physics"] },
//     { classId: 3, grade: "12th", subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"] },
//     { classId: 4, grade: "9th", subjects: ["English", "History", "Mathematics", "Physics", "Chemistry"] },
//     { classId: 5, grade: "8th", subjects: ["Biology", "Chemistry", "Mathematics", "Physics", "English"] },
//     { classId: 6, grade: "7th", subjects: ["Physics", "Mathematics", "History", "English", "Biology"] },
//     { classId: 7, grade: "6th", subjects: ["History", "English", "Mathematics", "Physics", "Chemistry"] },
//     { classId: 8, grade: "5th", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] }
// ];

export interface ClassTimetable {
    grade: string,
    timetable: subjects[],
}

export interface subjects {
    subject: string,
    teacher: string,
    period: number,
}

export function generateTimetable(teachers: Teacher[], classes: Class[]) {
    // const timetable: ClassTimetable[] = [];

    const totalPeriods = classes[0].subjects.length; // or define total periods per day

    const timetable: ClassTimetable[] = [];

    for (let i = 0; i < classes.length; i++) {
        timetable.push({
            grade: classes[i].grade,
            timetable: []
        });

        // Track which periods are already assigned for this class
        const assignedPeriods = new Set<number>();

        for (let subjIndex = 0; subjIndex < classes[i].subjects.length; subjIndex++) {
            const subjectObj = classes[i].subjects[subjIndex];
            const subjectName = typeof subjectObj === "string" && subjectObj;
            const classroom = typeof subjectObj === "string" && null;

            let assignedPeriod = -1;
            let assignedTeacherName = "Not Assigned";

            // Try to assign this subject to any free period
            for (let period = 0; period < totalPeriods; period++) {
                if (assignedPeriods.has(period)) {
                    // This period is already assigned for this class
                    continue;
                }

                // Find a teacher who can teach this subject and is free at this period
                const potentialTeacher = teachers.find(t => {
                    if (!t.subjects.includes(subjectName)) return false;

                    // Check if teacher busy at this period in any class
                    for (let c = 0; c < timetable.length; c++) {
                        for (const entry of timetable[c].timetable) {
                            if (entry.period === period && entry.teacher === t.name) {
                                return false; // teacher busy
                            }
                        }
                    }
                    return true; // teacher available
                });

                if (!potentialTeacher) {
                    // No teacher available at this period, try next period
                    continue;
                }

                // Check classroom availability if classroom info exists
                const classroomAvailable = true;
                if (!classroomAvailable) {
                    continue;
                }

                // Found a free period with available teacher and classroom
                assignedPeriod = period;
                assignedTeacherName = potentialTeacher.name;
                break;
            }

            if (assignedPeriod === -1) {
                console.warn(`Could not assign subject "${subjectName}" for class "${classes[i].grade}"`);
            } else {
                assignedPeriods.add(assignedPeriod);
                console.log(`Assigned subject "${subjectName}" to period ${assignedPeriod} with teacher "${assignedTeacherName}" for class "${classes[i].grade}"`);
            }

            timetable[i].timetable.push({
                subject: subjectName,
                teacher: assignedTeacherName,
                period: assignedPeriod === -1 ? -1 : assignedPeriod,
            });
        }
    }

    console.log("Final timetable:", timetable);


    return timetable;
}

