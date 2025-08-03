import { useNavigate } from "react-router-dom";

const EnrollmentCard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-xl bg-white shadow p-6 text-center cursor-pointer hover:bg-blue-100 transition"
      onClick={() => navigate("/enrollment")}
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Student Enrollment
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        Manage student registration
      </p>
    </div>
  );
};

export default EnrollmentCard;
