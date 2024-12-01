export interface Organization {
  id: string;
  code: string;
  name: string;
  facilityIds: string[];
  status: 'active' | 'inactive';
}