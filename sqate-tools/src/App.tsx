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
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  const handleCsvUpload = (data: Evaluation[]) => {
    const calendarEvents = data.map((evalItem) => {
      const start = new Date(`${evalItem.Date}T${evalItem.Time}`);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      return {
        title: `${evalItem.Course} - ${evalItem.Title}`,
        start,
        end,
      };
    });

    setEvents(calendarEvents);
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: string) => {
    setView(newView as 'week' | 'month');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Centralized Evaluation Calendar</h1>
      <UploadCsv onUpload={handleCsvUpload} />
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleViewChange('week')}
          className={`px-4 py-2 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Week
        </button>
        <button
          onClick={() => handleViewChange('month')}
          className={`px-4 py-2 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Month
        </button>
      </div>
      <EvaluationCalendar
        events={events}
        date={currentDate}
        onNavigate={handleNavigate}
        view={view}
        onView={handleViewChange}
      />
    </div>
  );
};

export default App;
