import React from "react";
import { evaluationCalendarStyles as styles } from "../../Evaluation/EvaluationCalendar/Styles/evaluationCalendarStyles";

const CalendarDayCard: React.FC<{
    date: string;
    evaluations: {
        course: string;
        title: string;
        type: "Assignment" | "Mid Exam" | "Quiz" | "Project" | "Practical Lab" | "Final Exam";
        weight: number;
        dueDate: Date;
    }[];
}> = ({ date, evaluations }) => {
    return (
        <div className={styles.dayCard}>
            <h2 className={styles.dayCardHeader}>{date}</h2>

            {evaluations.length === 0 ? (
                <p className={styles.dayCardEmpty}>No evaluations scheduled for this day.</p>
            ) : (
                <ul className={styles.dayCardList}>
                    {evaluations.map((ev, idx) => (
                        <li
                            key={idx}
                            className={styles.dayCardItem}
                        >
                            <div className={styles.dayCardItemTitle}>
                                {ev.title} ({ev.type})
                            </div>
                            <div className={styles.dayCardItemMeta}>
                                Course: {ev.course} | Weight: {ev.weight}%
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CalendarDayCard;
