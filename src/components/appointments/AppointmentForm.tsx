import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Appointment, Patient } from '../../types/appointment';
import PatientDetailsSection from './PatientDetailsSection';
import AppointmentDetailsSection from './AppointmentDetailsSection';

interface AppointmentFormProps {
  onClose: () => void;
  onSubmit: (appointment: Appointment) => void;
}

const emptyPatient: Patient = {
  mrn: '',
  referenceNumber: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'male',
  nationality: '',
  bloodGroup: '',
  email: '',
  identification: {
    type: '',
    number: '',
    issuingCountry: '',
    expiryDate: '',
  },
  address: {
    street: '',
    country: '',
    state: '',
    city: '',
    postCode: '',
  },
  contact: {
    mobile: '',
    home: '',
    office: '',
  },
};

const AppointmentForm = ({ onClose, onSubmit }: AppointmentFormProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [appointmentNumber] = useState(`APT${Date.now()}`);
  const [patient, setPatient] = useState<Patient>(emptyPatient);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
    speciality: '',
    doctorId: '',
    reason: '',
    insurance: {
      insurerName: '',
      policyNumber: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointment: Appointment = {
      id: '',
      appointmentNumber,
      patient,
      date: appointmentDetails.date,
      time: appointmentDetails.time,
      status: 'scheduled',
      doctorId: appointmentDetails.doctorId,
      speciality: appointmentDetails.speciality,
      reason: appointmentDetails.reason,
      insurance: appointmentDetails.insurance,
    };
    onSubmit(appointment);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden`}>
        <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            New Appointment
          </h2>
          <button
            onClick={onClose}
            className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-8">
            <div className="mb-6">
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Appointment Number
              </label>
              <input
                type="text"
                value={appointmentNumber}
                readOnly
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <PatientDetailsSection
              patient={patient}
              onChange={setPatient}
              isDark={isDark}
            />

            <AppointmentDetailsSection
              appointmentDetails={appointmentDetails}
              onChange={setAppointmentDetails}
              isDark={isDark}
            />

            <div className="flex justify-end space-x-3 pt-6">
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
                Create Appointment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;