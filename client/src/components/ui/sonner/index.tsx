import { toast, Toaster as ToasterPrimitive, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return <ToasterPrimitive richColors {...props} />;
};

export { Toaster, toast };
