import React from 'react';
import { useTheme } from '../context/ThemeContext';

const RegisterPatient = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main className={`flex-1 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Register Patient
        </h1>
      </div>
    </main>
  );
}

export default RegisterPatient;