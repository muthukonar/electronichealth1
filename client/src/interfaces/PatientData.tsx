export interface PatientData {
  patient_id: number | null;
  patient_name: string | null;
  email: string | null;
  height: number | null; 
  weight: number | null;
  age: number | null;
  dr_id: number | null;
  //! adding image url to patient data
  image_url?: string | null;
}
