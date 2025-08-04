import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { EvaluationService } from "../Evaluation/EvaluationService/EvaluationService";
import { LocalStorage } from "../localStorageService";
import type { StorageService } from "../localStorageService";
import type { Evaluation } from "../Evaluation/EvaluationService/EvaluationService";

const Heatmap = lazy(() =>
  import("../Evaluation/Heatmap").then(module => ({ default: module.Heatmap }))
);

const SuggestedEvaluation = lazy(() =>
  import("../Evaluation/SuggestedEvaluation/SuggestedEvaluation").then(module => ({
    default: module.default,
  }))
);

const EvaluationCard = () => {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  const service = useMemo(() => new EvaluationService(new LocalStorage() as StorageService), []);

  useEffect(() => {
    const loaded = service.loadEvaluations();
    setEvaluations(loaded);
  }, [service]);

  return (
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
        <Suspense fallback={<div>Loading suggested evaluations…</div>}>
          <SuggestedEvaluation evaluations={evaluations} />
        </Suspense>
      </div>

      <div className="cursor-pointer hover:bg-green-100 transition">
        <h2 className="text-xl font-semibold text-gray-800">
          Evaluation Heatmap
        </h2>
        <div className="text-gray-500 text-sm mt-2">
          <Suspense fallback={<div>Loading heatmap…</div>}>
            {evaluations.length > 0 ? <Heatmap /> : "No evaluations yet"}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default EvaluationCard;
