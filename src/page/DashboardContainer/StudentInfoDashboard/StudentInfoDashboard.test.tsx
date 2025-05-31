import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainDashboard, { Student } from './StudentInfoDashboard';

describe('MainDashboard', () => {
  const mockData: Student[] = [
    {
      studentId: '1',
      name: 'John Doe',
      email: 'john@example.com',
      group: 'G1',
      role: 'student',
      loop: 'yes',
      github: 'no',
      status: 'unenrolled',
      loopStatus: 'unenrolled',
      githubStatus: 'unenrolled',
    },
    {
      studentId: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      group: 'G2',
      role: 'student',
      loop: 'no',
      github: 'yes',
      status: 'unenrolled',
      loopStatus: 'unenrolled',
      githubStatus: 'unenrolled',
    },
  ];

  it('renders correct number of student rows', () => {
    render(<MainDashboard data={mockData} onUpdate={() => {}} onDelete={() => {}} />);
    const nameInputs = screen.getAllByDisplayValue(/John Doe|Jane Smith/);
    expect(nameInputs).toHaveLength(2);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockData.length + 1);
  });
  it('calls onUpdate when name input is changed', () => {
    const onUpdateMock = jest.fn();
    render(<MainDashboard data={mockData} onUpdate={onUpdateMock} onDelete={() => {}} />);
    const johnNameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(johnNameInput, { target: { value: 'John Changed' } });
    expect(onUpdateMock).toHaveBeenCalledTimes(1);
    expect(onUpdateMock).toHaveBeenCalledWith(0, { name: 'John Changed' });
  });
});
