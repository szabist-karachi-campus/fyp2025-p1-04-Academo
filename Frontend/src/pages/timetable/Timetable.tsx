import { generateTimetable } from "./timetableAlgorithms"
import InputForm from "./InputForm";

function Timetable() {
  // const timetable = generateTimetable();


  return (
    <div className="min-h-screen bg-gray-50 py-12 w-full px-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">School Timetable Planner</h1>
          <p className="text-gray-600">Enter your school's details to generate a timetable</p>
        </div>
        <InputForm />
      </div>
    </div>
    // <div className="p-4 w-full ">
    //   <h1 className="text-2xl font-bold mb-4">Class Timetables</h1>
    //   {timetable.map((classTimetable) => (
    //     <div key={classTimetable.classId} className="mb-8">
    //       <h2 className="text-xl font-semibold mb-2">Grade {classTimetable.grade}</h2>
    //       <table className="min-w-full border border-gray-300">
    //         <thead>
    //           <tr className="bg-gray-100">
    //             <th className="border border-gray-300 px-4 py-2">Period</th>
    //             <th className="border border-gray-300 px-4 py-2">Subject</th>
    //             <th className="border border-gray-300 px-4 py-2">Teacher</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {classTimetable.timetable.map((item) => (
    //             <tr key={item.period}>
    //               <td className="border border-gray-300 px-4 py-2">{item.period + 1}</td>
    //               <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
    //               <td className="border border-gray-300 px-4 py-2">{item.teacher}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   ))}
    // </div>
  )
}

export default Timetable