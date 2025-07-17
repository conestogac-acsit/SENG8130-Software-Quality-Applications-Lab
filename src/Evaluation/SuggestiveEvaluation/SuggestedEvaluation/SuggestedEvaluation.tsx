export const SuggestedEvaluation: React.FC<{ suggestions: string[] }> = ({ suggestions }) => (
  <div className="bg-white shadow p-4 rounded-2xl mb-4">
    <h2 className="text-xl font-bold mb-2">📝 Suggested Evaluation Windows</h2>
    {suggestions.length === 0 ? (
      <p className="text-gray-500 italic">No suggestions available</p>
    ) : (
      <ul className="list-disc ml-6">
        {suggestions.map((slot, idx) => (
          <li key={idx} className="text-gray-700">{slot}</li>
        ))}
      </ul>
    )}
  </div>
);