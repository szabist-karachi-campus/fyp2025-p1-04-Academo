import React, { useState } from 'react';
// import { GraduationCap } from 'lucide-react';
import ClassList from './ClassList';
import MarksUpload from './MarksUpload';

const MarksPage = () => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          {/* <GraduationCap className="w-8 h-8 text-primary" /> */}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
              Marks Management
            </h1>
            <p className="text-gray-500 mt-1">
              Upload and manage student marks by class
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {selectedClassId ? (
            <MarksUpload 
              classId={selectedClassId} 
              onBack={() => setSelectedClassId(null)}
            />
          ) : (
            <ClassList onSelectClass={setSelectedClassId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarksPage;