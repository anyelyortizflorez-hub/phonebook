export enum ContactType {
  Person = 0,
  PublicOrganization = 1,
  PrivateOrganization = 2
}

// asi se ve un contacto que llega desde la API 
export interface Contact {
  id: number;
  contactType: ContactType;
  name: string;
  phoneNumber: string;
  comments?: string;

  // Campos extra de Person
  birthDate?: string;
  jobTitle?: string;

  // Campos extra de PublicOrganization
  registrationNumber?: string;
  department?: string;

  // Campos extra de PrivateOrganization
  taxId?: string;
  industry?: string;
}

// auxiliar solo para mostrar las etiquetas en español en el html
export const CONTACT_TYPE_LABELS: { [key: number]: string } = {
  [ContactType.Person]: 'Persona',
  [ContactType.PublicOrganization]: 'Organización pública',
  [ContactType.PrivateOrganization]: 'Organización privada'
};
