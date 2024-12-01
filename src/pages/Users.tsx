import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import UserForm from '../components/users/UserForm';
import { User, DaySchedule } from '../types/user';
import { Role } from '../types/role';

interface Facility {
  id: string;
  code: string;
  name: string;
}

const facilities: Facility[] = [
  {
    id: '1',
    code: 'MCC001',
    name: 'MedClinic Central',
  },
  {
    id: '2',
    code: 'MCN001',
    name: 'MedClinic North',
  },
];

const defaultWorkingHours: DaySchedule[] = [
  { day: 'monday', isWorking: true, shifts: [{ startTime: '09:00', endTime: '17:00' }], breaks: [{ startTime: '12:00', endTime: '13:00' }] },
  { day: 'tuesday', isWorking: true, shifts: [{ startTime: '09:00', endTime: '17:00' }], breaks: [{ startTime: '12:00', endTime: '13:00' }] },
  { day: 'wednesday', isWorking: true, shifts: [{ startTime: '09:00', endTime: '17:00' }], breaks: [{ startTime: '12:00', endTime: '13:00' }] },
  { day: 'thursday', isWorking: true, shifts: [{ startTime: '09:00', endTime: '17:00' }], breaks: [{ startTime: '12:00', endTime: '13:00' }] },
  { day: 'friday', isWorking: true, shifts: [{ startTime: '09:00', endTime: '17:00' }], breaks: [{ startTime: '12:00', endTime: '13:00' }] },
  { day: 'saturday', isWorking: false, shifts: [], breaks: [] },
  { day: 'sunday', isWorking: false, shifts: [], breaks: [] },
];

const initialUsers: User[] = [
  {
    id: '1',
    code: 'USR001',
    username: 'johndoe',
    password: '',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@medclinic.com',
    roleId: '1',
    facilityIds: ['1'],
    status: 'active',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    workingHours: defaultWorkingHours,
    appointmentDuration: 30,
  },
  {
    id: '2',
    code: 'USR002',
    username: 'janesmith',
    password: '',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@medclinic.com',
    roleId: '2',
    facilityIds: ['1', '2'],
    status: 'active',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    workingHours: defaultWorkingHours,
    appointmentDuration: 30,
  },
];

const roles: Role[] = [
  {
    id: '1',
    code: 'ADMIN',
    name: 'Administrator',
    description: 'Full system access',
    status: 'active',
    permissions: [],
  },
  {
    id: '2',
    code: 'DOCTOR',
    name: 'Doctor',
    description: 'Medical staff',
    status: 'active',
    permissions: [],
  },
];

const emptyUser: User = {
  id: '',
  code: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  roleId: '',
  facilityIds: [],
  status: 'active',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  workingHours: defaultWorkingHours,
  appointmentDuration: 30,
};

const Users = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(emptyUser);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (user?: User) => {
    if (user) {
      setCurrentUser(user);
      setIsEditing(true);
    } else {
      setCurrentUser(emptyUser);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(emptyUser);
    setIsEditing(false);
  };

  const handleSubmit = (updatedUser: User) => {
    if (isEditing) {
      setUsers(prev => prev.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
    } else {
      const newUser = {
        ...updatedUser,
        id: Date.now().toString(),
      };
      setUsers(prev => [...prev, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const getFacilityNames = (facilityIds: string[]) => {
    return facilityIds
      .map(id => facilities.find(f => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getRoleName = (roleId: string) => {
    return roles.find(role => role.id === roleId)?.name || '';
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`flex-1 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Users
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              Manage system users
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add User
          </button>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow flex-1 flex flex-col overflow-hidden`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Search users..."
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
            <table className="w-full">
              <thead>
                <tr className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    User
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Code
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Role
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Facilities
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="ml-3">
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                            {user.firstName} {user.lastName}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {user.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {getRoleName(user.roleId)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {getFacilityNames(user.facilityIds)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleOpenModal(user)}
                          className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
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
        </div>

        {isModalOpen && (
          <UserForm
            user={currentUser}
            roles={roles}
            facilities={facilities}
            isEditing={isEditing}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default Users;