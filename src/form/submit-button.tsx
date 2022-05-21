import { ReactNode } from "react";
import { useFormikContext } from "formik";

export type SubmitButtonProps = {
  id?: string;
  children?: ReactNode;
};

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { isSubmitting } = useFormikContext();

  return (
    <div className="d-grid mt-2">
      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} {...props}>
        {children || "Submit"}
      </button>
    </div>
  );
};

export default SubmitButton;
