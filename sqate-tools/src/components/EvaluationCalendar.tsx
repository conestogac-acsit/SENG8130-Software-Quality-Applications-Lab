import React from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isSameDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Event = {
  title: string;
  start: Date;
  end: Date;
};

interface Props {
  events: Event[];
  date: Date;
  onNavigate: (newDate: Date) => void;
  view: View;
  onView: (view: string) => void;
}

const EvaluationCalendar: React.FC<Props> = ({
  events,
  date,
  onNavigate,
  view,
  onView,
}) => {
  const getDayClass = (date: Date) => {
    const count = events.filter((event) => isSameDay(event.start, date)).length;

    if (count >= 3) {
      return {
        className: 'bg-red-100',
      };
    }
    return {};
  };

  return (
    <div className="h-[600px] border rounded p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={onNavigate}
        dayPropGetter={getDayClass}
        view={view}
        onView={onView}
        views={['week', 'month']}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default EvaluationCalendar;
