import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent } from "react";

interface InputFormProps {
  //-
  id: string; //-
  label: string; //-
  type: string; //-
  placeholder: string; //-
  value: string; //-
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; //-
}

export const InputForm: React.FC<InputFormProps> = ({ id, label, type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};
