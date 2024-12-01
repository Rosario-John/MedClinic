import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Role } from '../../types/role';
import { useTheme } from '../../context/ThemeContext';

interface RoleListProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
}

const RoleList = ({ roles, onEdit, onDelete }: RoleListProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
            <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
              Role Code
            </th>
            <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
              Role Name
            </th>
            <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
              Description
            </th>
            <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
              Status
            </th>
            <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {roles.map((role) => (
            <tr key={role.id} className={isDark ? 'bg-gray-800' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {role.code}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  {role.name}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {role.description}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  role.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {role.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => onEdit(role)}
                    className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => onDelete(role.id)}
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
  );
};

export default RoleList;