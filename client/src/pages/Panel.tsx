import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
type Props = {
  isLogged: boolean;
};

const Panel = (props: Props) => {
  return <div>{props.isLogged ? <p>Panel</p> : <Navigate to="/login" />}</div>;
};

export default Panel;
