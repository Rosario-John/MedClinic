import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  UserPlus, 
  Users, 
  FileText, 
  Building2,
  Building,
  UserCog,
  User,
  ChevronDown,
  ChevronUp,
  Stethoscope
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(true);
  const { theme } = useTheme();

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/', color: 'text-blue-500' },
    { icon: Calendar, text: 'Appointments', path: '/appointments', color: 'text-purple-500' },
    { icon: UserPlus, text: 'Register Patient', path: '/register', color: 'text-green-500' },
    { icon: Users, text: 'Patient Management', path: '/patients', color: 'text-orange-500' },
    { icon: FileText, text: 'Medical Records', path: '/records', color: 'text-red-500' },
  ];

  const adminItems = [
    { icon: Building, text: 'Organization', path: '/organization', color: 'text-yellow-500' },
    { icon: Building2, text: 'Facility', path: '/facility', color: 'text-cyan-500' },
    { icon: UserCog, text: 'Roles', path: '/roles', color: 'text-pink-500' },
    { icon: User, text: 'Users', path: '/users', color: 'text-indigo-500' },
    { icon: Stethoscope, text: 'Doctor Specialities', path: '/specialities', color: 'text-emerald-500' },
  ];

  return (
    <div className={`w-64 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">MedClinic</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-blue-50'
              } ${
                isActive 
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-blue-50 text-blue-600'
                  : ''
              }`
            }
          >
            <item.icon className={`w-5 h-5 mr-3 ${item.color}`} />
            <span>{item.text}</span>
          </NavLink>
        ))}

        <div 
          className={`mt-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
        >
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="w-full px-6 py-3 flex items-center justify-between text-sm font-medium uppercase"
          >
            <span>Administration</span>
            {isAdminOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {isAdminOpen && adminItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-blue-50'
                } ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-blue-50 text-blue-600'
                    : ''
                }`
              }
            >
              <item.icon className={`w-5 h-5 mr-3 ${item.color}`} />
              <span>{item.text}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;