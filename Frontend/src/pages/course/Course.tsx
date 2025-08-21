import { ExtractData } from "../../extractingDataFromCookies";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import Allcourses from "./Admin/AdminSection";
import { StudentCourseSelector } from "./Student/StudentSection";
import { TeacherCourseSelector } from "./Teacher/TeacherSections";



const CourseSelection = () => {
    ExtractData();
    const { role } = useSelector((state: RootState) => state.user);

    return (
        <div className="min-h-screen p-4 bg-gray-100 flex flex-col gap-8 w-full">
            <div className="bg-white p-6 shadow-md rounded-lg">
                {role === 'Admin' ?

                    <Allcourses />
                    : role === 'Student' ?
                    <StudentCourseSelector /> 
                    :
                    <TeacherCourseSelector />
                }
            </div>

        </div>
    );
};

export default CourseSelection;
