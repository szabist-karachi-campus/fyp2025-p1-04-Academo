import { useEffect, useState } from 'react';
import { Tabs, Tab } from "@heroui/react";
import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { BiPlus, BiTrash } from 'react-icons/bi';
import TimeTable from './BuildTimetable';
import { ClassTimetable, generateTimetable } from './timetableAlgorithms';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setTimetable } from "../../redux/user/userSlice";
import { api } from '../../api';

export interface Teacher {
    name: string;
    subjects: string[];
}

export interface Class {
    grade: string;
    subjects: string[];
}

const InputForm = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([{ name: '', subjects: [''] }]);
    const [classes, setClasses] = useState<Class[]>([{ grade: '', subjects: [''] }]);
    const [slots, setSlots] = useState<number>(0);
    const [selected, setSelected] = useState("input");
    const dispatch = useDispatch<AppDispatch>();
    const { role } = useSelector((state: RootState) => state.user);


    const addTeacher = () => {
        setTeachers([...teachers, { name: '', subjects: [''] }]);
    };

    const addSubjectToTeacher = (teacherIndex: number) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[teacherIndex].subjects.push('');
        setTeachers(updatedTeachers);
    };

    const addClass = () => {
        setClasses([...classes, { grade: '', subjects: [''] }]);
    };

    const addSubjectToClass = (classIndex: number) => {
        const updatedClasses = [...classes];
        updatedClasses[classIndex].subjects.push('');
        setClasses(updatedClasses);
    };

    const updateTeacherName = (index: number, name: string) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[index].name = name;
        setTeachers(updatedTeachers);
    };

    const updateTeacherSubject = (teacherIndex: number, subjectIndex: number, subject: string) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[teacherIndex].subjects[subjectIndex] = subject;
        setTeachers(updatedTeachers);
    };

    const updateClassName = (index: number, grade: string) => {
        const updatedClasses = [...classes];
        updatedClasses[index].grade = grade;
        setClasses(updatedClasses);
    };

    const updateClassSubject = (classIndex: number, subjectIndex: number, subject: string) => {
        const updatedClasses = [...classes];
        updatedClasses[classIndex].subjects[subjectIndex] = subject;
        setClasses(updatedClasses);
    };

    const removeTeacher = (index: number) => {
        setTeachers(teachers.filter((_, i) => i !== index));
    };

    const removeClass = (index: number) => {
        setClasses(classes.filter((_, i) => i !== index));
    };

    const removeSubjectFromTeacher = (teacherIndex: number, subjectIndex: number) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[teacherIndex].subjects.splice(subjectIndex, 1);
        setTeachers(updatedTeachers);
    };

    const removeSubjectFromClass = (classIndex: number, subjectIndex: number) => {
        const updatedClasses = [...classes];
        updatedClasses[classIndex].subjects.splice(subjectIndex, 1);
        setClasses(updatedClasses);
    };

    const handleGenerate = () => {
        const timetable = generateTimetable(teachers, classes);
        dispatch(setTimetable(timetable));
        setSelected('timetable')
    }

    const [DBTimetable, setDBTimetable] = useState<ClassTimetable[]>([])

    // console.log(timetable[0].timetable)

    useEffect(() => {
        const response = api.get('/timetable')
        response.then((res) => {
            setDBTimetable(res.data)
        })

    }, [DBTimetable])

    return (
        <div className="w-full">
            {DBTimetable.length > 0 && selected === 'input' &&
                DBTimetable.map((classTimetable) => (
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
                ))
            }
            {role === "Admin" &&
                <form action="" onSubmit={(e) => (
                    e.preventDefault()

                )}>
                    <Tabs
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key.toString())}
                        className="w-full"
                    >
                        <Tab key="input" title="Input Details">
                            <div className="space-y-8 mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold">Teachers</h2>
                                            <Button
                                                size="sm"
                                                color="primary"
                                                onClick={addTeacher}
                                                className="flex items-center gap-2"
                                            >
                                                <BiPlus className="w-4 h-4" /> Add Teacher
                                            </Button>
                                        </div>

                                        {teachers.map((teacher, teacherIndex) => (
                                            <div key={teacherIndex} className="p-4 border rounded-lg space-y-3">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-medium">Teacher Name</label>
                                                    <Button
                                                        size="sm"
                                                        color="danger"
                                                        variant="light"
                                                        onClick={() => removeTeacher(teacherIndex)}
                                                    >
                                                        <BiTrash className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                                <Input
                                                    value={teacher.name}
                                                    onChange={(e) => updateTeacherName(teacherIndex, e.target.value)}
                                                    placeholder="Enter teacher name"
                                                />

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Subjects</label>
                                                    {teacher.subjects.map((subject, subjectIndex) => (
                                                        <div key={subjectIndex} className="flex gap-2">
                                                            <Input
                                                                value={subject}
                                                                onChange={(e) => updateTeacherSubject(teacherIndex, subjectIndex, e.target.value)}
                                                                placeholder="Enter subject"
                                                            />
                                                            <Button
                                                                size="sm"
                                                                color="danger"
                                                                variant="light"
                                                                onClick={() => removeSubjectFromTeacher(teacherIndex, subjectIndex)}
                                                            >
                                                                <BiTrash className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        size="sm"
                                                        variant="bordered"
                                                        onClick={() => addSubjectToTeacher(teacherIndex)}
                                                    >
                                                        <BiPlus className="w-4 h-4 mr-2" /> Add Subject
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold">Classes</h2>
                                            <Button
                                                size="sm"
                                                color="primary"
                                                onClick={addClass}
                                            >
                                                <BiPlus className="w-4 h-4 mr-2" /> Add Class
                                            </Button>
                                        </div>

                                        {classes.map((cls, classIndex) => (
                                            <div key={classIndex} className="p-4 border rounded-lg space-y-3">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-medium">Grade/Class</label>
                                                    <Button
                                                        size="sm"
                                                        color="danger"
                                                        variant="light"
                                                        onClick={() => removeClass(classIndex)}
                                                    >
                                                        <BiTrash className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                                <Input
                                                    value={cls.grade}
                                                    onChange={(e) => updateClassName(classIndex, e.target.value)}
                                                    placeholder="Enter grade/class"
                                                />

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Subjects</label>
                                                    {cls.subjects.map((subject, subjectIndex) => (
                                                        <div key={subjectIndex} className="flex gap-2">
                                                            <Input
                                                                value={subject}
                                                                onChange={(e) => updateClassSubject(classIndex, subjectIndex, e.target.value)}
                                                                placeholder="Enter subject"
                                                            />
                                                            <Button
                                                                size="sm"
                                                                color="danger"
                                                                variant="light"
                                                                onClick={() => removeSubjectFromClass(classIndex, subjectIndex)}
                                                            >
                                                                <BiTrash className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        size="sm"
                                                        variant="bordered"
                                                        onClick={() => addSubjectToClass(classIndex)}
                                                    >
                                                        <BiPlus className="w-4 h-4 mr-2" /> Add Subject
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full  mx-auto flex justify-between">
                                    <div className='flex flex-col'>

                                        <label className="text-sm font-medium">Number of Slots/Periods</label>
                                        <Input
                                            type="number"
                                            value={slots.toString()}
                                            onChange={(e) => setSlots(Number(e.target.value))}
                                            min="1"
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className='justify-end'>
                                        <Button type='submit' onClick={handleGenerate}>Generate</Button>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab key="timetable" title="View Timetable">
                            <TimeTable />
                        </Tab>
                    </Tabs>
                </form>
            }

        </div>
    );
};

export default InputForm;