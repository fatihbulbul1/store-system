import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
};

const Login = (props: Props) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pw == "1" && id == "1") props.setIsLogged(true);
    setId("");
    setPw("");
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
              value={id}
              onChange={(e) => setId(e.target.value)}
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
        ""
      )}
    </div>
  );
};

export default Login;
