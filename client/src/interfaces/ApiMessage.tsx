export interface ApiMessage {
  Result?: {
    Resources?: Array<{
      Title?: string;
      Description?: string;
      ContentURL?: string;
    }>;
  };
}
