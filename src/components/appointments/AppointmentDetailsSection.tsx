import React, { useState, useEffect } from 'react';
import { Doctor } from '../../types/appointment';
import FormField from '../common/FormField';
import { appointmentValidationSchema } from '../../utils/validation';

interface AppointmentDetailsSectionProps {
  appointmentDetails: {
    date: string;
    time: string;
    speciality: string;
    doctorId: string;
    reason: string;
    insurance: {
      insurerName: string;
      policyNumber: string;
    };
  };
  onChange: (details: any) => void;
  isDark: boolean;
}

const specialities = [
  { id: '1', name: 'Cardiology' },
  { id: '2', name: 'Dermatology' },
  { id: '3', name: 'Neurology' },
  { id: '4', name: 'Orthopedics' },
  { id: '5', name: 'Pediatrics' },
];

const doctors: Doctor[] = [
  {
    id: '1',
    code: 'DOC001',
    firstName: 'John',
    lastName: 'Smith',
    speciality: 'Cardiology',
    workingHours: [
      {
        day: 'monday',
        slots: ['09:00', '09:30', '10:00', '10:30', '11:00']
      }
    ]
  },
  // Add more doctors
];

const insurers = [
  { id: '1', name: 'Health Insurance Co.' },
  { id: '2', name: 'Medical Insurance Ltd.' },
  { id: '3', name: 'Healthcare Insurance Inc.' },
];

const AppointmentDetailsSection = ({ appointmentDetails, onChange, isDark }: AppointmentDetailsSectionProps) => {
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    if (appointmentDetails.speciality) {
      const filtered = doctors.filter(d => d.speciality === appointmentDetails.speciality);
      setAvailableDoctors(filtered);
    } else {
      setAvailableDoctors([]);
    }
  }, [appointmentDetails.speciality]);

  useEffect(() => {
    if (appointmentDetails.doctorId && appointmentDetails.date) {
      const doctor = doctors.find(d => d.id === appointmentDetails.doctorId);
      if (doctor) {
        const dayOfWeek = new Date(appointmentDetails.date).toLocaleLowerCase();
        const slots = doctor.workingHours.find(wh => wh.day === dayOfWeek)?.slots || [];
        setAvailableSlots(slots);
      }
    } else {
      setAvailableSlots([]);
    }
  }, [appointmentDetails.doctorId, appointmentDetails.date]);

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [section, subfield] = field.split('.');
      onChange({
        ...appointmentDetails,
        [section]: {
          ...appointmentDetails[section as keyof typeof appointmentDetails],
          [subfield]: value,
        },
      });
    } else {
      onChange({
        ...appointmentDetails,
        [field]: value,
      });
    }
  };

  const inputClasses = `w-full px-3 py-2 rounded-lg border ${
    isDark
      ? 'bg-gray-700 border-gray-600 text-gray-200'
      : 'bg-white border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <div className="space-y-6">
      {/* Appointment Details */}
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-4`}>
          Appointment Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Date"
            validation={appointmentValidationSchema.root.date}
            isDark={isDark}
          >
            <input
              type="date"
              value={appointmentDetails.date}
              onChange={(e) => handleChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Speciality"
            validation={appointmentValidationSchema.root.speciality}
            isDark={isDark}
          >
            <select
              value={appointmentDetails.speciality}
              onChange={(e) => handleChange('speciality', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select Speciality</option>
              {specialities.map(speciality => (
                <option key={speciality.id} value={speciality.name}>
                  {speciality.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField 
            label="Doctor"
            validation={appointmentValidationSchema.root.doctorId}
            isDark={isDark}
          >
            <select
              value={appointmentDetails.doctorId}
              onChange={(e) => handleChange('doctorId', e.target.value)}
              className={inputClasses}
              disabled={!appointmentDetails.speciality}
            >
              <option value="">Select Doctor</option>
              {availableDoctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.firstName} {doctor.lastName}
                </option>
              ))}
            </select>
          </FormField>

          <FormField 
            label="Time"
            validation={appointmentValidationSchema.root.time}
            isDark={isDark}
          >
            <select
              value={appointmentDetails.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className={inputClasses}
              disabled={!appointmentDetails.doctorId || !appointmentDetails.date}
            >
              <option value="">Select Time</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </FormField>

          <div className="col-span-2">
            <FormField 
              label="Reason for Appointment"
              validation={appointmentValidationSchema.root.reason}
              isDark={isDark}
            >
              <textarea
                value={appointmentDetails.reason}
                onChange={(e) => handleChange('reason', e.target.value)}
                rows={3}
                className={inputClasses}
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Insurance Details */}
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-4`}>
          Insurance Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Insurer Name"
            isDark={isDark}
          >
            <select
              value={appointmentDetails.insurance.insurerName}
              onChange={(e) => handleChange('insurance.insurerName', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select Insurer</option>
              {insurers.map(insurer => (
                <option key={insurer.id} value={insurer.name}>
                  {insurer.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField 
            label="Policy Number"
            isDark={isDark}
          >
            <input
              type="text"
              value={appointmentDetails.insurance.policyNumber}
              onChange={(e) => handleChange('insurance.policyNumber', e.target.value)}
              className={inputClasses}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsSection;