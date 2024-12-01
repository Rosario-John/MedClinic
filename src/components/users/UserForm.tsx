import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { User, DaySchedule } from '../../types/user';
import { Role } from '../../types/role';
import { useTheme } from '../../context/ThemeContext';
import WorkingHoursTab from './WorkingHoursTab';
import LeaveManagementTab from './LeaveManagementTab';

interface UserFormProps {
  user: User;
  roles: Role[];
  facilities: { id: string; code: string; name: string; }[];
  isEditing: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

type TabType = 'details' | 'workingHours' | 'leaves';

const specialities = [
  { id: 'CARD', name: 'Cardiology' },
  { id: 'DERM', name: 'Dermatology' },
  { id: 'NEUR', name: 'Neurology' },
  { id: 'ORTH', name: 'Orthopedics' },
  { id: 'PEDI', name: 'Pediatrics' },
];

const UserForm = ({ user: initialUser, roles, facilities, isEditing, onClose, onSubmit }: UserFormProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [user, setUser] = useState<User>(initialUser);
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [showSpeciality, setShowSpeciality] = useState(false);

  useEffect(() => {
    const role = roles.find(r => r.id === user.roleId);
    setShowSpeciality(role?.code === 'DOCTOR');
  }, [user.roleId, roles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setUser(prev => ({
      ...prev,
      facilityIds: selectedOptions
    }));
  };

  const handleWorkingHoursChange = (workingHours: DaySchedule[]) => {
    setUser(prev => ({
      ...prev,
      workingHours
    }));
  };

  const handleAppointmentDurationChange = (duration: number) => {
    setUser(prev => ({
      ...prev,
      appointmentDuration: duration
    }));
  };

  const handleLeavesChange = (leaves: User['leaves']) => {
    setUser(prev => ({
      ...prev,
      leaves
    }));
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'details', label: 'User Details' },
    { id: 'workingHours', label: 'Working Hours' },
    { id: 'leaves', label: 'Leave Management' },
  ];

  const inputClasses = `w-full px-3 py-2 rounded-lg border ${
    isDark
      ? 'bg-gray-700 border-gray-600 text-gray-200'
      : 'bg-white border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  const labelClasses = `block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden`}>
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit User' : 'Add New User'}
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

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>User Code</label>
                  <input
                    type="text"
                    name="code"
                    value={user.code}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>

                {!isEditing && (
                  <div>
                    <label className={labelClasses}>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      required={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                )}

                <div>
                  <label className={labelClasses}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Role</label>
                  <select
                    name="roleId"
                    value={user.roleId}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  >
                    <option value="">Select a role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {showSpeciality && (
                  <div>
                    <label className={labelClasses}>Speciality</label>
                    <select
                      name="speciality"
                      value={user.speciality || ''}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="">Select a speciality</option>
                      {specialities.map(speciality => (
                        <option key={speciality.id} value={speciality.id}>
                          {speciality.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className={labelClasses}>Facilities</label>
                  <select
                    multiple
                    name="facilityIds"
                    value={user.facilityIds}
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
                    value={user.status}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workingHours' && (
            <WorkingHoursTab
              workingHours={user.workingHours}
              appointmentDuration={user.appointmentDuration}
              onChange={handleWorkingHoursChange}
              onDurationChange={handleAppointmentDurationChange}
              isDark={isDark}
            />
          )}

          {activeTab === 'leaves' && (
            <LeaveManagementTab
              leaves={user.leaves || []}
              onChange={handleLeavesChange}
              isDark={isDark}
            />
          )}

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

export default UserForm;