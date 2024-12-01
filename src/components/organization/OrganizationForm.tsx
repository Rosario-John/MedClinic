import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Organization } from '../../types/organization';
import { useTheme } from '../../context/ThemeContext';

interface OrganizationFormProps {
  organization: Organization;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: (organization: Organization) => void;
}

const facilities = [
  { id: '1', code: 'MCC001', name: 'MedClinic Central' },
  { id: '2', code: 'MCN001', name: 'MedClinic North' },
];

const OrganizationForm = ({ organization: initialOrganization, isEditing, onClose, onSubmit }: OrganizationFormProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [organization, setOrganization] = useState<Organization>(initialOrganization);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(organization);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrganization(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setOrganization(prev => ({
      ...prev,
      facilityIds: selectedOptions
    }));
  };

  const inputClasses = `w-full px-3 py-2 rounded-lg border ${
    isDark
      ? 'bg-gray-700 border-gray-600 text-gray-200'
      : 'bg-white border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  const labelClasses = `block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl`}>
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit Organization' : 'Add New Organization'}
          </h2>
          <button
            onClick={onClose}
            className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className={labelClasses}>Organization Code</label>
              <input
                type="text"
                name="code"
                value={organization.code}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Organization Name</label>
              <input
                type="text"
                name="name"
                value={organization.name}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Facilities</label>
              <select
                multiple
                name="facilityIds"
                value={organization.facilityIds}
                onChange={handleFacilityChange}
                className={`${inputClasses} h-32`}
              >
                {facilities.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name} ({facility.code})
                  </option>
                ))}
              </select>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Hold Ctrl (Windows) or Command (Mac) to select multiple facilities
              </p>
            </div>

            <div>
              <label className={labelClasses}>Status</label>
              <select
                name="status"
                value={organization.status}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
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
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationForm;