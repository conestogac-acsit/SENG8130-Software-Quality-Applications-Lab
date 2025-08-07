import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { EvaluationService } from "../Evaluation/EvaluationService/EvaluationService";
import { LocalStorage } from "../localStorageService";
import { FileCheck2 } from "lucide-react";
import type { StorageService } from "../localStorageService";
import { Evaluation } from "../Evaluation/EvaluationService/EvaluationService";
import { Heatmap } from "../Evaluation/Heatmap";
import SuggestedEvaluation from "../Evaluation/SuggestedEvaluation/SuggestedEvaluation";

const EvaluationCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const service = new EvaluationService(new LocalStorage());

  useEffect(() => {
    const data = service.loadEvaluations();
    setEvaluations(data);
  }, []);

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isEvaluationRoute = location.pathname === "/evaluation";

  if (!isEvaluationRoute) {
    return (
      <div
        className="max-w-[350px] mx-auto rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 shadow p-6 text-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => navigate("/evaluation")}
      >
        <FileCheck2 className="mx-auto text-purple-600 mb-4" size={36} />
        <h2 className="text-xl font-semibold">Evaluation Service</h2>
        <p className="text-sm mt-2 text-purple-700">
          {evaluations.length > 0
            ? `${evaluations.length} evaluations available`
            : "No evaluations yet"}
        </p>
      </div>
    );
  }
  return (
    <div
      className="mx-auto p-6 bg-white rounded-lg shadow mt-10 text-purple-900"
      style={{ width: "70%", minWidth: "320px" }}
    >
      <h1 className="text-3xl font-bold mb-6">Evaluations Details</h1>

      {evaluations.length === 0 ? (
        <p className="text-gray-600 text-lg">No evaluations available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-purple-300">
            <thead className="bg-purple-100 text-purple-900">
              <tr>
                <th className="border border-purple-300 px-4 py-2 text-left">Title</th>
                <th className="border border-purple-300 px-4 py-2 text-left">Course</th>
                <th className="border border-purple-300 px-4 py-2 text-left">Type</th>
                <th className="border border-purple-300 px-4 py-2 text-center">Weight (%)</th>
                <th className="border border-purple-300 px-4 py-2 text-left">Due Date</th>
                <th className="border border-purple-300 px-4 py-2 text-left">Instructor</th>
                <th className="border border-purple-300 px-4 py-2 text-left">Campus</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evalItem, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-purple-50" : "bg-white"}
                >
                  <td className="border border-purple-300 px-4 py-2">{evalItem.title}</td>
                  <td className="border border-purple-300 px-4 py-2">{evalItem.course}</td>
                  <td className="border border-purple-300 px-4 py-2">{evalItem.type}</td>
                  <td className="border border-purple-300 px-4 py-2 text-center">{evalItem.weight}</td>
                  <td className="border border-purple-300 px-4 py-2">{formatDate(evalItem.dueDate)}</td>
                  <td className="border border-purple-300 px-4 py-2">{evalItem.instructor}</td>
                  <td className="border border-purple-300 px-4 py-2">{evalItem.campus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="mt-8 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        onClick={() => navigate("/")}
      >
        ← Back to Homepage
      </button>
    <div className="rounded-xl bg-white shadow p-6 text-center">
      <div
        className="cursor-pointer hover:bg-green-100 transition mb-6"
        onClick={() => navigate("/evaluation")}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Evaluation Service
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          {evaluations.length > 0
            ? `${evaluations.length} evaluations available`
            : "No evaluations yet"}
        </p>
      </div>

      <div className="mb-6">
        <SuggestedEvaluation evaluations={evaluations} />
      </div>

      <div className="cursor-pointer hover:bg-green-100 transition">
        <h2 className="text-xl font-semibold text-gray-800">
          Evaluation Heatmap
        </h2>
        <div className="text-gray-500 text-sm mt-2">
          {evaluations.length > 0 ? <Heatmap /> : "No evaluations yet"}
        </div>
      </div>
    </div>
  );
};

export default EvaluationCard;
