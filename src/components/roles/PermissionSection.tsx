import React from 'react';
import { Permission } from '../../types/role';

interface PermissionSectionProps {
  permissions: Permission[];
  onChange: (permissions: Permission[]) => void;
  isDark: boolean;
}

const PermissionSection = ({ permissions, onChange, isDark }: PermissionSectionProps) => {
  const screens = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'appointments', name: 'Appointments' },
    { id: 'patients', name: 'Patient Management' },
    { id: 'records', name: 'Medical Records' },
    { id: 'facility', name: 'Facility Management' },
    { id: 'roles', name: 'Role Management' },
    { id: 'users', name: 'User Management' },
  ];

  const handlePermissionChange = (screenId: string, action: 'view' | 'create' | 'edit' | 'delete', checked: boolean) => {
    const updatedPermissions = [...permissions];
    const permissionIndex = updatedPermissions.findIndex(p => p.screenId === screenId);

    if (permissionIndex === -1 && checked) {
      updatedPermissions.push({
        screenId,
        actions: [action],
      });
    } else if (permissionIndex !== -1) {
      const currentActions = updatedPermissions[permissionIndex].actions;
      if (checked && !currentActions.includes(action)) {
        updatedPermissions[permissionIndex].actions = [...currentActions, action];
      } else if (!checked && currentActions.includes(action)) {
        updatedPermissions[permissionIndex].actions = currentActions.filter(a => a !== action);
      }

      if (updatedPermissions[permissionIndex].actions.length === 0) {
        updatedPermissions.splice(permissionIndex, 1);
      }
    }

    onChange(updatedPermissions);
  };

  const hasPermission = (screenId: string, action: string) => {
    const permission = permissions.find(p => p.screenId === screenId);
    return permission?.actions.includes(action as 'view' | 'create' | 'edit' | 'delete') || false;
  };

  return (
    <div className="space-y-4">
      {screens.map((screen) => (
        <div key={screen.id} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-3`}>
            {screen.name}
          </h4>
          <div className="flex flex-wrap gap-4">
            {['view', 'create', 'edit', 'delete'].map((action) => (
              <label key={action} className="flex items-center">
                <input
                  type="checkbox"
                  checked={hasPermission(screen.id, action)}
                  onChange={(e) => handlePermissionChange(screen.id, action as 'view' | 'create' | 'edit' | 'delete', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {action.charAt(0).toUpperCase() + action.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionSection;