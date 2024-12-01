import React, { useState } from 'react';
import { Plus, Calendar, Pencil, Trash2, X } from 'lucide-react';
import { Holiday } from '../../types/facility';

interface HolidayFormProps {
  holiday: Holiday;
  onSubmit: (holiday: Holiday) => void;
  onClose: () => void;
  isDark: boolean;
  isEditing: boolean;
}

interface HolidaysSectionProps {
  holidays: Holiday[];
  onChange: (holidays: Holiday[]) => void;
  isDark: boolean;
}

const HolidayForm = ({ holiday: initialHoliday, onSubmit, onClose, isDark, isEditing }: HolidayFormProps) => {
  const [formData, setFormData] = useState<Holiday>(initialHoliday);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md`}>
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit Holiday' : 'Add Holiday'}
          </h3>
          <button
            onClick={onClose}
            className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Holiday Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const HolidaysSection = ({ holidays, onChange, isDark }: HolidaysSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHoliday, setCurrentHoliday] = useState<Holiday | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddClick = () => {
    setCurrentHoliday({
      id: '',
      name: '',
      date: '',
      description: ''
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (holiday: Holiday) => {
    setCurrentHoliday(holiday);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    onChange(holidays.filter(h => h.id !== id));
  };

  const handleSubmit = (holiday: Holiday) => {
    if (isEditing) {
      onChange(holidays.map(h => h.id === holiday.id ? holiday : h));
    } else {
      onChange([...holidays, { ...holiday, id: Date.now().toString() }]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className={`w-5 h-5 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            Holidays
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddClick}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Holiday
        </button>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Holiday Name
              </th>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Date
              </th>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Description
              </th>
              <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {holidays.map((holiday) => (
              <tr key={holiday.id} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {holiday.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    {new Date(holiday.date).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    {holiday.description}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEditClick(holiday)}
                      className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(holiday.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentHoliday && (
        <HolidayForm
          holiday={currentHoliday}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentHoliday(null);
          }}
          isDark={isDark}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default HolidaysSection;