import React from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { startOfWeek } from 'date-fns';
import { getDay } from 'date-fns';
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
  onView: (view: View) => void;
}

const EvaluationCalendar: React.FC<Props> = ({
  events,
  date,
  onNavigate,
  view,
  onView,
}) => {
  const getDayClass = (date: Date) => {
    const count = events.filter(
      (event) => event.start.toDateString() === date.toDateString()
    ).length;

    if (count >= 3) {
      return {
        className: 'bg-red-100',
      };
    }
    return {};
  };

  return (
    <div className="h-[600px] border rounded p-4 shadow bg-white">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={onNavigate}
        view={view}
        onView={onView}
        views={['week', 'month']}
        dayPropGetter={getDayClass}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default EvaluationCalendar;
