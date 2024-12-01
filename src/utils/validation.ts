export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

export interface ValidationSchema {
  [key: string]: {
    [subKey: string]: FieldValidation;
  };
}

// Example validation schemas
export const patientValidationSchema: ValidationSchema = {
  root: {
    firstName: { required: true },
    lastName: { required: true },
    dateOfBirth: { required: true },
    gender: { required: true },
    email: { 
      required: false, // Changed from true to false
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
  },
  contact: {
    mobile: { required: true },
  },
  identification: {
    type: { required: true },
    number: { required: true },
    issuingCountry: { required: true },
    expiryDate: { required: true },
  },
  address: {
    country: { required: true },
    state: { required: true },
    city: { required: true },
  }
};

export const appointmentValidationSchema: ValidationSchema = {
  root: {
    date: { required: true },
    time: { required: true },
    speciality: { required: true },
    doctorId: { required: true },
    reason: { required: true },
  }
};