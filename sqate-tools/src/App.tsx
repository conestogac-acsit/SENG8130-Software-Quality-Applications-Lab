// File: src/App.tsx
import React, { useState } from 'react';
import './App.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

const App: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate] = useState(new Date()); // fixed date

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const lines = csv.trim().split('\n').slice(1); // skip header
      const parsedEvents = lines.map(line => {
        const [title, dateStr, startStr, endStr] = line.split(',');
        const start = new Date(`${dateStr} ${startStr}`);
        const end = new Date(`${dateStr} ${endStr}`);
        return { title: title.trim(), start, end };
      });
      setEvents(parsedEvents);
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-container" style={{ padding: '20px' }}>
      <h2>Centralized Evaluation Calendar</h2>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="csv-upload">Upload Evaluation CSV</label>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '6px',
            borderRadius: '6px',
            width: '250px',
            marginTop: '5px',
          }}
        />
      </div>

      {/* Buttons shown but non-functional */}
      <div style={{ marginBottom: '10px' }}>
        <button style={{ marginRight: '10px' }}>Today</button>
        <button style={{ marginRight: '10px' }}>Back</button>
        <button>Next</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button className="add-eval">Add Evaluation</button>
      </div>

      <div style={{ height: '600px' }} className="calendar-slide">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          defaultView="month"
          views={{ month: true }}
          toolbar={false}
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default App;
