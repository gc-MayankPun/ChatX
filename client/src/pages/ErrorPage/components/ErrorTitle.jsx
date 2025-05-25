const ErrorTitle = ({is404Error}) => {
  return (
    <div className="error__type">
      <h1>{is404Error ? "404 page error" : "Something went wrong"}</h1>
    </div>
  );
};

export default ErrorTitle;
