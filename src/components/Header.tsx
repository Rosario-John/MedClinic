import React, { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, Search, User, LogOut, X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Appointment',
      message: 'Dr. Smith has a new appointment request',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      title: 'System Update',
      message: 'System maintenance scheduled for tonight',
      time: '1 hour ago',
      read: false,
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                  : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
              } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              isDark 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border overflow-hidden z-50`}>
                <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 ${
                        !notification.read
                          ? isDark ? 'bg-gray-700' : 'bg-blue-50'
                          : ''
                      } ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b last:border-b-0`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {notification.title}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <button className="text-blue-500 hover:text-blue-600">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                John Doe
              </span>
            </button>

            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border overflow-hidden z-50`}>
                <div className={`p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navigate to profile page
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm ${
                      isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                </div>
                <div className={`p-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center px-3 py-2 text-sm ${
                      isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;