import React, { Dispatch, SetStateAction, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  isLogged: boolean | undefined;
  setIsLogged: Dispatch<SetStateAction<boolean | undefined>>;
  setUserType: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Login = (props: Props) => {
  const [pw, setPw] = useState("");
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pw === "" || props.id === "") return;
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.id,
        password: pw,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setIsLogged(data);
        if (data === true) {
          if (props.id === "1") props.setUserType("admin");
          else props.setUserType("user");
        }
      })
      .then(() => setPw(""));
  };
  return (
    <div className="container">
      {!props.isLogged ? (
        <>
          <h1>Welcome to CheapMarkt!</h1>
          <form className="login" onSubmit={handleLogin}>
            <label htmlFor="id">Username:</label>
            <input
              autoComplete="off"
              value={props.id}
              onChange={(e) => props.setId(e.target.value)}
              id="id"
              type="text"
              name=""
            />
            <label htmlFor="pw">Password:</label>
            <input
              autoComplete="off"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              id="pw"
              type="text"
              name=""
            />
            <button>Login</button>
          </form>
        </>
      ) : (
        <Navigate to="/store" />
      )}
    </div>
  );
};

export default Login;
