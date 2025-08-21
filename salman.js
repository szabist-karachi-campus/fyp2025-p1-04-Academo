const date = new Date().toLocaleDateString("en-US", { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' })

console.log(date)

// Array of subjects taught by teachers
// const teacherSubjects = [
//     { teacherId: 1, name: "Mr. Smith", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"] },
//     { teacherId: 2, name: "Ms. Johnson", subjects: ["Chemistry", "History", "Physics", "Mathematics", "Biology"] },
//     { teacherId: 3, name: "Mr. Brown", subjects: ["Mathematics", "Biology", "English", "History", "Physics"] },
//     { teacherId: 4, name: "Ms. Davis", subjects: ["Physics", "Chemistry", "Mathematics", "English", "History"] },
//     { teacherId: 5, name: "Mr. Wilson", subjects: ["English", "History", "Mathematics", "Physics", "Chemistry"] },
//     { teacherId: 6, name: "Ms. Taylor", subjects: ["Biology", "Chemistry", "Mathematics", "Physics", "English"] },
//     { teacherId: 7, name: "Mr. Anderson", subjects: ["Physics", "Mathematics", "History", "English", "Biology"] },
//     { teacherId: 8, name: "Ms. Martinez", subjects: ["History", "English", "Mathematics", "Physics", "Chemistry"] }
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

 const teacherSubjects = [
    {name: 't1', subjects: ['s1, s3, s5']},
    {name: 't2', subjects: ['s1, s2, s4']},
    {name: 't3', subjects: ['s3, s5, s6']},
 ]

 const classSubjects = [
    {grade: 'c1', subjects: ['s2', 's4, s5']},
    {grade: 'c2', subjects: ['s3', 's1, s5']},
    {grade: 'c3', subjects: ['s1', 's6, s3']},
 ]

// Mapping of classrooms with their subjects and assigned teachers
const timetable = []

for (let i = 0; i < classSubjects.length; i++) {
    timetable.push({
        grade: classSubjects[i].grade,
        timetable: []
    })

    for (let i = 0; i < classSubjects.length; i++) {
        console.log(`Creating timetable for class index ${i} with subjects:`, classSubjects[i].subjects);
    
        for (let j = 0; j < classSubjects[i].subjects.length; j++) {
            const subject = classSubjects[i].subjects[j];
            console.log(`Assigning subject "${subject}" for period ${j} in class index ${i}`);
    
            const teacherName = (() => {
                // Find a teacher who can teach this subject
                const potentialTeacher = teacherSubjects.find(t => {
                    // Check if this teacher teaches the subject
                    if (!t.subjects.includes(subject)) {
                        // Teacher does not teach this subject
                        return false;
                    }
    
                    // Check if this teacher is already assigned in the same period
                    for (let k = 0; k < timetable.length; k++) {
                        for (let l = 0; l < timetable[k].timetable.length; l++) {
                            if (timetable[k].timetable[l].period === j &&
                                timetable[k].timetable[l].teacher === t.name) {
                                // Teacher already busy in this period
                                console.log(`Teacher "${t.name}" is busy at period ${j} for class index ${k}`);
                                return false;
                            }
                        }
                    }
                    return true; // Teacher is available
                });
    
                if (!potentialTeacher) {
                    console.warn(`No available teacher found for subject "${subject}" at period ${j} in class index ${i}`);
                } else {
                    console.log(`Assigned teacher "${potentialTeacher.name}" for subject "${subject}" at period ${j} in class index ${i}`);
                }
    
                return potentialTeacher ? potentialTeacher.name : "Not Assigned";
            })();
    
            timetable[i].timetable.push({
                subject: subject,
                teacher: teacherName,
                period: j,
            });
        }
    }
    
    console.log("Final timetable:", JSON.stringify(timetable, null, 2));
    
}


// const classroomMapping = [
//     {
//         classroomId: classSubjects[0].classId,
//         grade: classSubjects[0].grade,
//         schedule: [
//             { subject: "Mathematics", teacher: "Mr. Smith", time: "9:00 AM" },
//             { subject: "Physics", teacher: "Mr. Smith", time: "10:00 AM" },
//             { subject: "English", teacher: "Ms. Johnson", time: "11:00 AM" }
//         ]
//     },
//     {
//         classroomId: 102,
//         grade: "11th",
//         schedule: [
//             { subject: "Chemistry", teacher: "Mr. Brown", time: "9:00 AM" },
//             { subject: "Biology", teacher: "Mr. Brown", time: "10:00 AM" },
//             { subject: "History", teacher: "Ms. Johnson", time: "11:00 AM" }
//         ]
//     },
//     {
//         classroomId: 103,
//         grade: "12th",
//         schedule: [
//             { subject: "Mathematics", teacher: "Mr. Smith", time: "9:00 AM" },
//             { subject: "Physics", teacher: "Mr. Smith", time: "10:00 AM" },
//             { subject: "Chemistry", teacher: "Mr. Brown", time: "11:00 AM" }
//         ]
//     }
// ];

// // Function to display classroom schedule
// function displayClassroomSchedule(classroomId) {
//     const classroom = classroomMapping.find(room => room.classroomId === classroomId);
//     if (classroom) {
//         console.log(`\nSchedule for Classroom ${classroomId} (${classroom.grade}):`);
//         classroom.schedule.forEach(session => {
//             console.log(`${session.time}: ${session.subject} - ${session.teacher}`);
//         });
//     } else {
//         console.log(`Classroom ${classroomId} not found.`);
//     }
// }

// // Example usage
// displayClassroomSchedule(101);
