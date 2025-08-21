import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { Button } from "@heroui/react";
import { api } from "../../api";




const TimeTable = () => {
    const { timetable } = useSelector((state: RootState) => state.user);

    const saveTimetable = () => {
        const response = api.post('/timetable', timetable)
        console.log(response)
    }

    return (
        <div className="p-4 w-full">
            <h1 className="text-2xl font-bold mb-4">Class Timetables</h1>
            {timetable.map((classTimetable) => (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Grade {classTimetable.grade}</h2>
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Period</th>
                                <th className="border border-gray-300 px-4 py-2">Subject</th>
                                <th className="border border-gray-300 px-4 py-2">Teacher</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classTimetable.timetable.map((item) => (
                                <tr key={item.period}>
                                    <td className="border border-gray-300 px-4 py-2">{item.period + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.teacher}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            <div className="w-full flex justify-end">
                <Button onClick={saveTimetable}>Save</Button>
            </div>
        </div>
    );
};

export default TimeTable;
