import React from 'react';
import { WorkingHours } from '../../types/facility';

interface WorkingHoursDisplayProps {
  workingHours: WorkingHours[];
  isDark: boolean;
}

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

const WorkingHoursDisplay = ({ workingHours, isDark }: WorkingHoursDisplayProps) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const today = days[new Date().getDay() - 1];
  const todayHours = workingHours.find(h => h.day === today);

  return (
    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
      {todayHours?.isOpen ? (
        <span>
          Today: {formatTime(todayHours.openTime)} - {formatTime(todayHours.closeTime)}
        </span>
      ) : (
        <span>Closed today</span>
      )}
    </div>
  );
};

export default WorkingHoursDisplay;