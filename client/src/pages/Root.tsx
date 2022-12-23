import React from "react";
import { Navigate } from "react-router-dom";
type Props = {};

const Root = (props: Props) => {
  return <Navigate to="/store" />;
};

export default Root;
