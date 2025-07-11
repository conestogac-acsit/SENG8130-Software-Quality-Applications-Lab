import React from "react";
import Button from "../Button/Button";

interface CalendarNavigationProps {
    label: string;
    onPrev: () => void;
    onNext: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
    label,
    onPrev,
    onNext,
}) => (
    <div>
        <Button onClick={onPrev} label="Prev" />
        <span>{label}</span>
        <Button onClick={onNext} label="Next" />
    </div>
);

export default CalendarNavigation;
