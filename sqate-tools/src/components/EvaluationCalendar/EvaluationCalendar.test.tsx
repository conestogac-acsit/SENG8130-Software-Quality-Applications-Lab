import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EvaluationCalendar from './EvaluationCalendar';
import { View } from 'react-big-calendar';

const mockEvents = [
    {
        title: 'Test Event 1',
        start: new Date(2025, 4, 31, 10, 0),
        end: new Date(2025, 4, 31, 11, 0),
    },
    {
        title: 'Test Event 2',
        start: new Date(2025, 5, 1, 12, 0),
        end: new Date(2025, 5, 1, 13, 0),
    },
];

describe('EvaluationCalendar', () => {
    test('renders calendar with events', () => {
        render(
            <EvaluationCalendar
                events={mockEvents}
                date={new Date(2025, 4, 31)}
                onNavigate={() => { }}
                view="week"
                onView={() => { }}
            />
        );

        // Check if event titles are rendered somewhere on the page
        expect(screen.getByText('Test Event 1')).toBeInTheDocument();
        expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    });
});
