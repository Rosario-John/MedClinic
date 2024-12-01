import React from 'react';
import { Clock } from 'lucide-react';
import { WorkingHours } from '../../types/facility';

interface WorkingHoursSectionProps {
  workingHours: WorkingHours[];
  onChange: (workingHours: WorkingHours[]) => void;
  isDark: boolean;
}

const days: { value: WorkingHours['day']; label: string }[] = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

const WorkingHoursSection = ({ workingHours, onChange, isDark }: WorkingHoursSectionProps) => {
  const handleDayChange = (day: WorkingHours['day'], field: keyof WorkingHours, value: any) => {
    const updatedHours = workingHours.map(hours => {
      if (hours.day === day) {
        return { ...hours, [field]: value };
      }
      return hours;
    });
    onChange(updatedHours);
  };

  const inputClasses = `px-3 py-2 rounded-lg border ${
    isDark
      ? 'bg-gray-700 border-gray-600 text-gray-200'
      : 'bg-white border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Clock className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
          Working Hours
        </h3>
      </div>

      <div className="grid gap-4">
        {days.map(({ value: day, label }) => {
          const dayHours = workingHours.find(h => h.day === day)!;
          
          return (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-32">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {label}
                </span>
              </div>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={dayHours.isOpen}
                  onChange={(e) => handleDayChange(day, 'isOpen', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
                />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Open
                </span>
              </label>

              {dayHours.isOpen && (
                <>
                  <input
                    type="time"
                    value={dayHours.openTime}
                    onChange={(e) => handleDayChange(day, 'openTime', e.target.value)}
                    className={`${inputClasses} w-32`}
                  />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>to</span>
                  <input
                    type="time"
                    value={dayHours.closeTime}
                    onChange={(e) => handleDayChange(day, 'closeTime', e.target.value)}
                    className={`${inputClasses} w-32`}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkingHoursSection;