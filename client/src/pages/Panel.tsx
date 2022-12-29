import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
type Props = {
  isLogged: boolean | undefined;
};

const Panel = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      {props.isLogged ? (
        <div className="admin-panel">
          <button
            style={{ padding: "10px" }}
            onClick={() => navigate("/panel/add-new")}
          >
            Add new item
          </button>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Panel;
