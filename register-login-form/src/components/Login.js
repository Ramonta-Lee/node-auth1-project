import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

axios.defaults.withCredentials = true;

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
    axios
      .post("http://localhost:5000/api/auth/login", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="username" ref={register} />
      <input name="password" type="password" ref={register} />
      <input type="submit" />
    </form>
  );
};

export default Login;
