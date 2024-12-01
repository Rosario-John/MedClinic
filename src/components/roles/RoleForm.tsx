import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Role } from '../../types/role';
import { useTheme } from '../../context/ThemeContext';
import PermissionSection from './PermissionSection';

interface RoleFormProps {
  role: Role;
  isEditing: boolean;
  onClose: () => void;
  onChange: (field: keyof Role, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

type TabType = 'details' | 'permissions';

const RoleForm = ({ role, isEditing, onClose, onChange, onSubmit }: RoleFormProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'details', label: 'Role Details' },
    { id: 'permissions', label: 'Permissions' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden`}>
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit Role' : 'Add New Role'}
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

        <form onSubmit={onSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-xl">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Role Code
                </label>
                <input
                  type="text"
                  value={role.code}
                  onChange={(e) => onChange('code', e.target.value)}
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
                  Role Name
                </label>
                <input
                  type="text"
                  value={role.name}
                  onChange={(e) => onChange('name', e.target.value)}
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
                  value={role.description}
                  onChange={(e) => onChange('description', e.target.value)}
                  rows={3}
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
                  value={role.status}
                  onChange={(e) => onChange('status', e.target.value)}
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
            </div>
          )}

          {activeTab === 'permissions' && (
            <div>
              <PermissionSection
                permissions={role.permissions}
                onChange={(permissions) => onChange('permissions', permissions)}
                isDark={isDark}
              />
            </div>
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

export default RoleForm;