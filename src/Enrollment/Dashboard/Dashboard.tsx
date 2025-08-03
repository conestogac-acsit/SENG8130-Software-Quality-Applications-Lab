import React from "react";
import { Link } from "react-router-dom";
import EnrollStatusVisual from "./EnrollStatusVisual/EnrollStatusVisual";


const Dashboard: React.FC = () => {
  const [showVisualization, setShowVisualization] = useState(false);
  if (showVisualization) {
    return (
      <div className="p-6">
        <EnrollStatusVisual />
        <div className="text-center mt-6">
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setShowVisualization(false);
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard!</h1>
      <p className="text-gray-700 mb-2">
        You can check enrollment of all your students here.
      </p>
      <p className="text-gray-700 mb-2">
        If there's no data, please{" "}
        <Link to={`/upload-student`} className="text-blue-600 font-medium hover:underline">
          upload
        </Link>{" "}
        first.
      </p>
      
      <p className="text-gray-700 mb-2">
        back to <Link to={`/`} className="text-blue-600 font-medium hover:underline">
          home page
        </Link>{" "}
      </p>
      
      <div className="mt-6">
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setShowVisualization(true);
          }}
          className="text-blue-600 font-medium hover:underline"
        >
          Show Enrollment Visualization
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
