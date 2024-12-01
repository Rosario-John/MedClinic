export interface Patient {
  mrn: string;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  bloodGroup: string;
  email: string;
  identification: {
    type: string;
    number: string;
    issuingCountry: string;
    expiryDate: string;
  };
  address: {
    street: string;
    country: string;
    state: string;
    city: string;
    postCode: string;
  };
  contact: {
    mobile: string;
    home?: string;
    office?: string;
  };
}

export interface Doctor {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  speciality: string;
  workingHours: {
    day: string;
    slots: string[];
  }[];
}

export interface Appointment {
  id: string;
  appointmentNumber: string;
  patient: Patient;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  doctorId: string;
  speciality: string;
  reason: string;
  insurance?: {
    insurerName: string;
    policyNumber: string;
  };
}</content>