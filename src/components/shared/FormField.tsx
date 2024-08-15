import { Label } from "@/components/ui/label";

type FormFieldProps = {
  htmlFor?: string;
  label: string;
  children: React.ReactNode;
}

function FormField({ htmlFor, label, children }: FormFieldProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {htmlFor ? <Label htmlFor={htmlFor}>{label}</Label> : <span>{label}</span>}
      {children}
    </div>
  );
}

export default FormField