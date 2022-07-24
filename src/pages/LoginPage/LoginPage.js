import React, { useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const LoginPage = ({ setAuthenticate }) => {
  const [notAuthenticateMessage, setNotAuthenticateMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .get("http://localhost:8000/", { params: { ...data } })
      .then((res) => {
        if (res.data.login) {
          setAuthenticate(true);
        }
      })
      .catch((error) => {
        setAuthenticate(false);
        setNotAuthenticateMessage(error.response.data.error);
        setTimeout(() => {
          setNotAuthenticateMessage(false);
        }, 5000);
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <div className="login_header">
          <h1>Login</h1>
        </div>

        <div className="login_error">
          <p>{notAuthenticateMessage}</p>
        </div>

        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login_input_containe">
            <div className="login_input">
              <input {...register("userName", { required: true })} placeholder="Username" type="text" />
            </div>
            <div className="login_error_small">{errors.userName && <p>User Name is required</p>}</div>
          </div>
          <div className="login_input_containe">
            <div className="login_input">
              <input {...register("password", { required: true })} placeholder="Password" type="text" />
            </div>
            <div className="login_error_small">{errors.password && <p>Password is required</p>}</div>
          </div>
          <input className="login_submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
