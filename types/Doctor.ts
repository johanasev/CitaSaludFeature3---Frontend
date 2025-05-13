export interface Doctor {
  id: string;
  name: string;
  documentType: string;
  documentNumber: string;
  specialty: string;
  days?: string;
  schedule?: string;
}
