export interface Response<Data> {
  data: Data | null;
  error?: string;
  status?: number;
}