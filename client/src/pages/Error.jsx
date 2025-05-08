import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  
  return <div>Error: {error?.message || "Something went wrong"}</div>;
};

export default Error;
