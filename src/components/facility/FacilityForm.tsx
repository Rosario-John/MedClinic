import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Facility } from '../../types/facility';
import WorkingHoursSection from './WorkingHoursSection';
import HolidaysSection from './HolidaysSection';

interface FacilityFormProps {
  facility: Facility;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: (facility: Facility) => void;
}

type TabType = 'details' | 'workingHours' | 'holidays';

const tabs: { id: TabType; label: string }[] = [
  { id: 'details', label: 'Facility Details' },
  { id: 'workingHours', label: 'Working Hours' },
  { id: 'holidays', label: 'Holidays' },
];

const FacilityForm = ({ facility: initialFacility, isEditing, onClose, onSubmit }: FacilityFormProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [facility, setFacility] = useState<Facility>(initialFacility);
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(facility);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFacility(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkingHoursChange = (workingHours: Facility['workingHours']) => {
    setFacility(prev => ({
      ...prev,
      workingHours
    }));
  };

  const handleHolidaysChange = (holidays: Facility['holidays']) => {
    setFacility(prev => ({
      ...prev,
      holidays
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col`}>
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit Facility' : 'Add New Facility'}
          </h2>
          <button
            onClick={onClose}
            className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <nav className="flex px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? `${isDark ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600'}`
                    : `${isDark ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Facility Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={facility.code}
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
                    Facility Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={facility.name}
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
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={facility.email}
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
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={facility.phone}
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
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={facility.address}
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
                    Status
                  </label>
                  <select
                    name="status"
                    value={facility.status}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
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
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {isEditing ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'workingHours' && (
              <WorkingHoursSection
                workingHours={facility.workingHours}
                onChange={handleWorkingHoursChange}
                isDark={isDark}
              />
            )}

            {activeTab === 'holidays' && (
              <HolidaysSection
                holidays={facility.holidays}
                onChange={handleHolidaysChange}
                isDark={isDark}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityForm;