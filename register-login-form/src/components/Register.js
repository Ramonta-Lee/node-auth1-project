import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
    axios
      .post("http://localhost:5000/api/auth/register", data)
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

export default Register;
