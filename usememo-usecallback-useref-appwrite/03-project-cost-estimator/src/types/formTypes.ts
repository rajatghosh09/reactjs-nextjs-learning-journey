
export interface FormData {
  projectName: string;
  clientName: string;
  hourlyRate: number;
  hoursEstimated: number;
  softwareCost: number;
  marketingBudget: number;
}
export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}