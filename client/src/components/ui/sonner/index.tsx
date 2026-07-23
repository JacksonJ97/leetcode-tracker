import { toast, Toaster as ToasterPrimitive, type ToasterProps } from "sonner";
// TODO: Use base-ui toast
const Toaster = ({ ...props }: ToasterProps) => {
  return <ToasterPrimitive richColors {...props} />;
};

export { Toaster, toast };
