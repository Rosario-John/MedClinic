import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import RoleList from '../components/roles/RoleList';
import RoleForm from '../components/roles/RoleForm';
import { Role } from '../types/role';

const initialRoles: Role[] = [
  {
    id: '1',
    code: 'ADMIN',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    status: 'active',
    permissions: [
      {
        screenId: 'dashboard',
        actions: ['view'],
      },
      {
        screenId: 'facility',
        actions: ['view', 'create', 'edit', 'delete'],
      },
    ],
  },
  {
    id: '2',
    code: 'DOCTOR',
    name: 'Doctor',
    description: 'Medical staff with patient management access',
    status: 'active',
    permissions: [
      {
        screenId: 'dashboard',
        actions: ['view'],
      },
      {
        screenId: 'patients',
        actions: ['view', 'create', 'edit'],
      },
    ],
  },
];

const emptyRole: Role = {
  id: '',
  code: '',
  name: '',
  description: '',
  status: 'active',
  permissions: [],
};

const Roles = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>(emptyRole);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (role?: Role) => {
    if (role) {
      setCurrentRole(role);
      setIsEditing(true);
    } else {
      setCurrentRole(emptyRole);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRole(emptyRole);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Role, value: any) => {
    setCurrentRole(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setRoles(prev => 
        prev.map(r => r.id === currentRole.id ? currentRole : r)
      );
    } else {
      const newRole = {
        ...currentRole,
        id: Date.now().toString(),
      };
      setRoles(prev => [...prev, newRole]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setRoles(prev => prev.filter(r => r.id !== id));
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`flex-1 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Roles
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              Manage system roles and permissions
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Role
          </button>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow flex-1 flex flex-col overflow-hidden`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <RoleList
              roles={filteredRoles}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {isModalOpen && (
          <RoleForm
            role={currentRole}
            isEditing={isEditing}
            onClose={handleCloseModal}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default Roles;