import { useNavigate } from "react-router-dom";
const CalendarCard = () => {
const navigate = useNavigate();
return (
<div
className="rounded-xl bg-white shadow p-6 text-center cursor-pointer hover:bg-purple-100 transition"
onClick={() => navigate("/calendar")}
>
<h2 className="text-xl font-semibold text-gray-800">Evaluation Calendar</h2>
<p className="text-gray-500 text-sm mt-2">
View exam schedule
</p>
</div>
);
};
export default CalendarCard;