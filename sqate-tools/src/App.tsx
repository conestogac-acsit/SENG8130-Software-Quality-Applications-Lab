import React, { useState } from 'react';
import UploadCsv from './components/UploadCsv';
import EvaluationCalendar from './components/EvaluationCalendar';

type Evaluation = {
  Course: string;
  Title: string;
  Type: string;
  Weight: string;
  Date: string;
  Time: string;
};

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

const App: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleCsvUpload = (data: Evaluation[]) => {
    const calendarEvents = data.map((evalItem) => {
      const start = new Date(`${evalItem.Date}T${evalItem.Time}`);
      const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour
      return {
        title: `${evalItem.Course} - ${evalItem.Title}`,
        start,
        end,
      };
    });

    setEvents(calendarEvents);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Centralized Evaluation Calendar</h1>
      <UploadCsv onUpload={handleCsvUpload} />
      <EvaluationCalendar events={events} />
    </div>
  );
};

export default App;
