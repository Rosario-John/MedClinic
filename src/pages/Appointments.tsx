import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AppointmentForm from '../components/appointments/AppointmentForm';
import { Appointment } from '../types/appointment';

const initialAppointments: Appointment[] = [
  // Add sample appointments if needed
];

const Appointments = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (appointment: Appointment) => {
    setAppointments(prev => [...prev, { ...appointment, id: Date.now().toString() }]);
    handleCloseModal();
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.appointmentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`flex-1 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Appointments
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              Manage patient appointments
            </p>
          </div>
          <button 
            onClick={handleOpenModal}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Appointment
          </button>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow flex-1 flex flex-col overflow-hidden`}>
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Search appointments..."
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
                    Appointment Number
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Patient
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Date & Time
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Doctor
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider text-left`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {appointment.appointmentNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                          {appointment.patient.firstName} {appointment.patient.lastName}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {appointment.patient.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                          {new Date(appointment.date).toLocaleDateString()}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {appointment.time}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                          Dr. {appointment.doctorId}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {appointment.speciality}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        appointment.status === 'scheduled'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : appointment.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <AppointmentForm
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default Appointments;