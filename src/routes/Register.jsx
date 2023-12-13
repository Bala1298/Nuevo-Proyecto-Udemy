import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("user1@test.com");
  const [password, setPassword] = useState("123qwe");

  const navigate = useNavigate;

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Procesando form", email, password);
    try {
      await registerUser(email, password);
      console.log("Usuario creado");
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="ingrese Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="ingrese Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
