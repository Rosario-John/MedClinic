import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { DaySchedule, WorkingShift, Break } from '../../types/user';

interface WorkingHoursTabProps {
  workingHours: DaySchedule[];
  appointmentDuration: number;
  onChange: (workingHours: DaySchedule[]) => void;
  onDurationChange: (duration: number) => void;
  isDark: boolean;
}

const days: { value: DaySchedule['day']; label: string }[] = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

const WorkingHoursTab = ({ 
  workingHours, 
  appointmentDuration,
  onChange, 
  onDurationChange,
  isDark 
}: WorkingHoursTabProps) => {
  const handleDayChange = (day: DaySchedule['day'], field: keyof DaySchedule, value: any) => {
    const updatedHours = workingHours.map(hours => {
      if (hours.day === day) {
        return { ...hours, [field]: value };
      }
      return hours;
    });
    onChange(updatedHours);
  };

  const addShift = (day: DaySchedule['day']) => {
    const updatedHours = workingHours.map(hours => {
      if (hours.day === day) {
        return {
          ...hours,
          shifts: [...hours.shifts, { startTime: '09:00', endTime: '17:00' }]
        };
      }
      return hours;
    });
    onChange(updatedHours);
  };

  const removeShift = (day: DaySchedule['day'], index: number) => {
    const updatedHours = workingHours.map(hours => {
      if (hours.day === day) {
        const newShifts = [...hours.shifts];
        newShifts.splice(index, 1);
        return { ...hours, shifts: newShifts };
      }
      return hours;
    });
    onChange(updatedHours);
  };

  const addBreak = (day: DaySchedule['day']) => {
    const updatedHours = workingHours.map(hours => {
      if (hours.day === day) {
        return {
          ...hours,
          breaks: [...hours.breaks, { startTime: '12:00', endTime: '13:00' }]
        };
      }
      return hours;
    });
    onChange(updatedHours);
  };

  const removeBreak = (day: DaySchedule['day'], index: number) => {
    const updatedHours = workingHours.map(hours => {
      if (hours.day === day) {
        const newBreaks = [...hours.breaks];
        newBreaks.splice(index, 1);
        return { ...hours, breaks: newBreaks };
      }
      return hours;
    });
    onChange(updatedHours);
  };

  const updateShift = (day: DaySchedule['day'], index: number, field: keyof WorkingShift, value: string) => {
    const updatedHours = workingHours.map(hours => {
      if (hours.day === day) {
        const newShifts = hours.shifts.map((shift, i) => {
          if (i === index) {
            return { ...shift, [field]: value };
          }
          return shift;
        });
        return { ...hours, shifts: newShifts };
      }
      return hours;
    });
    onChange(updatedHours);
  };

  const updateBreak = (day: DaySchedule['day'], index: number, field: keyof Break, value: string) => {
    const updatedHours = workingHours.map(hours => {
      if (hours.day === day) {
        const newBreaks = hours.breaks.map((breakTime, i) => {
          if (i === index) {
            return { ...breakTime, [field]: value };
          }
          return breakTime;
        });
        return { ...hours, breaks: newBreaks };
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
    <div className="space-y-6">
      <div className="mb-4">
        <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
          Appointment Duration (minutes)
        </label>
        <input
          type="number"
          value={appointmentDuration}
          onChange={(e) => onDurationChange(parseInt(e.target.value))}
          min="5"
          step="5"
          className={`${inputClasses} w-32`}
        />
      </div>

      {days.map(({ value: day, label }) => {
        const daySchedule = workingHours.find(h => h.day === day)!;
        
        return (
          <div key={day} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={daySchedule.isWorking}
                    onChange={(e) => handleDayChange(day, 'isWorking', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
                  />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {label}
                  </span>
                </label>
              </div>
            </div>

            {daySchedule.isWorking && (
              <div className="space-y-4 ml-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Shifts
                    </span>
                    <button
                      type="button"
                      onClick={() => addShift(day)}
                      className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Shift
                    </button>
                  </div>
                  {daySchedule.shifts.map((shift, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={shift.startTime}
                        onChange={(e) => updateShift(day, index, 'startTime', e.target.value)}
                        className={`${inputClasses} w-32`}
                      />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>to</span>
                      <input
                        type="time"
                        value={shift.endTime}
                        onChange={(e) => updateShift(day, index, 'endTime', e.target.value)}
                        className={`${inputClasses} w-32`}
                      />
                      <button
                        type="button"
                        onClick={() => removeShift(day, index)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Breaks
                    </span>
                    <button
                      type="button"
                      onClick={() => addBreak(day)}
                      className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Break
                    </button>
                  </div>
                  {daySchedule.breaks.map((breakTime, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={breakTime.startTime}
                        onChange={(e) => updateBreak(day, index, 'startTime', e.target.value)}
                        className={`${inputClasses} w-32`}
                      />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>to</span>
                      <input
                        type="time"
                        value={breakTime.endTime}
                        onChange={(e) => updateBreak(day, index, 'endTime', e.target.value)}
                        className={`${inputClasses} w-32`}
                      />
                      <button
                        type="button"
                        onClick={() => removeBreak(day, index)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WorkingHoursTab;