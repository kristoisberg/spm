type ErrorContainerProps = {
  error: string | null;
};

const ErrorContainer = ({ error }: ErrorContainerProps) =>
  error === null ? null : (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );

export default ErrorContainer;
