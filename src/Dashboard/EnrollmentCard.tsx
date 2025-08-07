import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const EnrollmentCard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-[350px] mx-auto rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 shadow p-6 text-center cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => navigate("/enrollment")}
    >

      <UserPlus className="mx-auto text-blue-600 mb-4" size={36} />
      <h2 className="text-xl font-semibold">Student Enrollment</h2>
      <p className="text-sm mt-2 text-blue-700">
        Manage student registration
      </p>
    </div>
  );
};

export default EnrollmentCard;
