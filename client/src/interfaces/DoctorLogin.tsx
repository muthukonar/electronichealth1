// Interface definition for DoctorLogin
export interface DoctorLogin {
  name: string | null;  // Property for storing name, nullable
    email?: string | null; 
  password: string | null;  // Property for storing password, nullable
  //!----Added to doctor interface
  image_url?: string| null;
}
