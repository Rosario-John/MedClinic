export interface Country {
  id: string;
  code: string;
  name: string;
}

export interface State {
  id: string;
  countryId: string;
  code: string;
  name: string;
}

export interface City {
  id: string;
  stateId: string;
  code: string;
  name: string;
}

export interface Speciality {
  id: string;
  code: string;
  name: string;
}

export interface BloodGroup {
  id: string;
  code: string;
  name: string;
}

export interface IdentificationType {
  id: string;
  code: string;
  name: string;
}

export interface Insurer {
  id: string;
  code: string;
  name: string;
}</content>