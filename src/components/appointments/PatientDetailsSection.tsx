import React from 'react';
import { Patient } from '../../types/appointment';
import { useLocationMasters } from '../../hooks/useLocationMasters';
import FormField from '../common/FormField';
import { patientValidationSchema } from '../../utils/validation';

interface PatientDetailsSectionProps {
  patient: Patient;
  onChange: (patient: Patient) => void;
  isDark: boolean;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const identificationTypes = ['Passport', 'National ID', 'Driver License'];

const PatientDetailsSection = ({ patient, onChange, isDark }: PatientDetailsSectionProps) => {
  const { countries, states, cities } = useLocationMasters(
    patient.address.country,
    patient.address.state
  );

  const handleChange = (section: string, field: string, value: string) => {
    if (section === 'root') {
      onChange({ ...patient, [field]: value });
    } else {
      onChange({
        ...patient,
        [section]: {
          ...patient[section as keyof Patient],
          [field]: value,
        },
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
      {/* Basic Information */}
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-4`}>
          Basic Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="MRN"
            validation={patientValidationSchema.root.mrn}
            isDark={isDark}
          >
            <input
              type="text"
              value={patient.mrn}
              onChange={(e) => handleChange('root', 'mrn', e.target.value)}
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Reference Number"
            validation={patientValidationSchema.root.referenceNumber}
            isDark={isDark}
          >
            <input
              type="text"
              value={patient.referenceNumber}
              onChange={(e) => handleChange('root', 'referenceNumber', e.target.value)}
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="First Name"
            validation={patientValidationSchema.root.firstName}
            isDark={isDark}
          >
            <input
              type="text"
              value={patient.firstName}
              onChange={(e) => handleChange('root', 'firstName', e.target.value)}
              required
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Last Name"
            validation={patientValidationSchema.root.lastName}
            isDark={isDark}
          >
            <input
              type="text"
              value={patient.lastName}
              onChange={(e) => handleChange('root', 'lastName', e.target.value)}
              required
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Date of Birth"
            validation={patientValidationSchema.root.dateOfBirth}
            isDark={isDark}
          >
            <input
              type="date"
              value={patient.dateOfBirth}
              onChange={(e) => handleChange('root', 'dateOfBirth', e.target.value)}
              required
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Gender"
            validation={patientValidationSchema.root.gender}
            isDark={isDark}
          >
            <select
              value={patient.gender}
              onChange={(e) => handleChange('root', 'gender', e.target.value)}
              required
              className={inputClasses}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </FormField>

          <FormField 
            label="Email"
            validation={patientValidationSchema.root.email}
            isDark={isDark}
          >
            <input
              type="email"
              value={patient.email}
              onChange={(e) => handleChange('root', 'email', e.target.value)}
              required
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Blood Group"
            validation={patientValidationSchema.root.bloodGroup}
            isDark={isDark}
          >
            <select
              value={patient.bloodGroup}
              onChange={(e) => handleChange('root', 'bloodGroup', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {/* Identification Details */}
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-4`}>
          Identification Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Identification Type"
            validation={patientValidationSchema.identification.type}
            isDark={isDark}
          >
            <select
              value={patient.identification.type}
              onChange={(e) => handleChange('identification', 'type', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select Type</option>
              {identificationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </FormField>

          <FormField 
            label="Identity Number"
            validation={patientValidationSchema.identification.number}
            isDark={isDark}
          >
            <input
              type="text"
              value={patient.identification.number}
              onChange={(e) => handleChange('identification', 'number', e.target.value)}
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Issuing Country"
            validation={patientValidationSchema.identification.issuingCountry}
            isDark={isDark}
          >
            <select
              value={patient.identification.issuingCountry}
              onChange={(e) => handleChange('identification', 'issuingCountry', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
          </FormField>

          <FormField 
            label="Date of Expiry"
            validation={patientValidationSchema.identification.expiryDate}
            isDark={isDark}
          >
            <input
              type="date"
              value={patient.identification.expiryDate}
              onChange={(e) => handleChange('identification', 'expiryDate', e.target.value)}
              className={inputClasses}
            />
          </FormField>
        </div>
      </div>

      {/* Address Details */}
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-4`}>
          Address Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormField 
              label="Address"
              validation={patientValidationSchema.address.street}
              isDark={isDark}
            >
              <input
                type="text"
                value={patient.address.street}
                onChange={(e) => handleChange('address', 'street', e.target.value)}
                className={inputClasses}
              />
            </FormField>
          </div>

          <FormField 
            label="Country"
            validation={patientValidationSchema.address.country}
            isDark={isDark}
          >
            <select
              value={patient.address.country}
              onChange={(e) => handleChange('address', 'country', e.target.value)}
              className={inputClasses}
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
          </FormField>

          <FormField 
            label="State"
            validation={patientValidationSchema.address.state}
            isDark={isDark}
          >
            <select
              value={patient.address.state}
              onChange={(e) => handleChange('address', 'state', e.target.value)}
              className={inputClasses}
              disabled={!patient.address.country}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.id} value={state.id}>{state.name}</option>
              ))}
            </select>
          </FormField>

          <FormField 
            label="City"
            validation={patientValidationSchema.address.city}
            isDark={isDark}
          >
            <select
              value={patient.address.city}
              onChange={(e) => handleChange('address', 'city', e.target.value)}
              className={inputClasses}
              disabled={!patient.address.state}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </FormField>

          <FormField 
            label="Post Code"
            validation={patientValidationSchema.address.postCode}
            isDark={isDark}
          >
            <input
              type="text"
              value={patient.address.postCode}
              onChange={(e) => handleChange('address', 'postCode', e.target.value)}
              className={inputClasses}
            />
          </FormField>
        </div>
      </div>

      {/* Contact Details */}
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-4`}>
          Contact Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Mobile"
            validation={patientValidationSchema.contact.mobile}
            isDark={isDark}
          >
            <input
              type="tel"
              value={patient.contact.mobile}
              onChange={(e) => handleChange('contact', 'mobile', e.target.value)}
              required
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Home Phone"
            validation={patientValidationSchema.contact.home}
            isDark={isDark}
          >
            <input
              type="tel"
              value={patient.contact.home}
              onChange={(e) => handleChange('contact', 'home', e.target.value)}
              className={inputClasses}
            />
          </FormField>

          <FormField 
            label="Office Phone"
            validation={patientValidationSchema.contact.office}
            isDark={isDark}
          >
            <input
              type="tel"
              value={patient.contact.office}
              onChange={(e) => handleChange('contact', 'office', e.target.value)}
              className={inputClasses}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsSection;