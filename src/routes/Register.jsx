import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate;
  const { registerUser } = useContext(UserContext);

  const {
    setError,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      console.log("Usuario creado");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            message: "Usuario ya registrado",
          });
          break;
        case "auth/invalid-email":
          setError("email", {
            message: "Formato email no valido",
          });
          break;
        default:
          console.log("Ocurrio un error en el server");
      }
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo Obligatorio",
            },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "Formato de Email Incorrecto",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese Password"
          {...register("password", {
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "Minimo 6 caracteres",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) {
                  return "No seas payaso, escribe algo";
                }
                return true;
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Ingrese Password Nuevamente"
          {...register("repassword", {
            setValueAs: (v) => v.trim(),
            validate: {
              equals: (v) =>
                v === getValues("password") || "No Coinciden los Passwords",
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
