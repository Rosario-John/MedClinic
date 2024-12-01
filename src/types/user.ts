// Previous interfaces remain...

export interface User {
  id: string;
  code: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  speciality?: string; // Added for doctors
  facilityIds: string[];
  status: 'active' | 'inactive';
  image: string;
  workingHours: DaySchedule[];
  appointmentDuration: number;
  leaves?: Leave[];
}