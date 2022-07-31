import React, { useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../store/users/usersAction";
import Loader from "../../components/Loader/Loader";
import { loginApi } from "../../api/definitions";

const LoginPage = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .get(loginApi, { params: { ...data } })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        dispatch(handleLogin(res.data));
      })
      .catch((error) => {
        setLoading(false);
        setResponse(
          (error && error.response && error.response.data && error.response.data.error) || "No response from server."
        );
        setTimeout(() => {
          setResponse("");
        }, 7000);
      });
  };

  return (
    <div className="login">
      <Loader loading={loading} />
      {!loading && (
        <div className="login_container">
          <div className="login_header">
            <h1>Login</h1>
          </div>
          <div className="login_error">
            <p>{response}</p>
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
                <input {...register("password", { required: true })} placeholder="Password" type="password" />
              </div>
              <div className="login_error_small">{errors.password && <p>Password is required</p>}</div>
            </div>
            <input className="login_submit" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
