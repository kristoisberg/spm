import { ReactNode } from "react";
import { useFormikContext } from "formik";
import { Button } from "antd";

export type SubmitButtonProps = {
  id?: string;
  children?: ReactNode;
};

const SubmitButton = ({ id, children }: SubmitButtonProps) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button id={id} type="primary" size="large" block htmlType="submit" loading={isSubmitting}>
      {children || "Submit"}
    </Button>
  );
};

export default SubmitButton;
