import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-100 p-10">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
        Building the Future of{" "} <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Learning</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Learn more about our LMS project and the team behind it
        </p>
      </div>

      {/* Project Description */}
      <section className="bg-white shadow-md rounded-lg p-8 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">Our Project</h2>
        <p className="text-gray-700 mt-4">
          Our Learning Management System (LMS) is designed to streamline and enhance the educational experience by providing a
          centralized platform for managing courses, attendance, and student progress. The system offers seamless navigation
          and easy access to essential tools, making it efficient for students, teachers, and administrators alike.
        </p>
      </section>

      {/* Key Features */}
      <section className="bg-white shadow-md rounded-lg p-8 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>Authentication for secure access</li>
          <li>Attendance tracking</li>
          <li>Automatic timetable scheduling</li>
          <li>Grading and marks management</li>
          <li>Event scheduling and invitations</li>
          <li>Informative About section</li>
        </ul>
      </section>

      {/* Team Members */}
      <section className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Team Member 1 */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 1"
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-gray-800">Muhammad Abrar</h3>
            <p className="text-gray-500">Project Lead & Frontend Developer</p>
          </div>
          {/* Team Member 2 */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 2"
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-500">Backend Developer</p>
          </div>
          {/* Team Member 3 */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 3"
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-500">UI/UX Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
