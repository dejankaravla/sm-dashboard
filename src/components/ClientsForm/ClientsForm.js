import React, { useState, useEffect } from "react";
import "./ClientsForm.css";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Select from "../Select/Select";


const ClientsForm = ({ formType }) => {
  const [clientData, setClientData] = useState([])
  const [error, setError] = useState([]);
  const [resetUsernamePassword, setResetUsernamePassword] = useState(() => formType === 'edit')

  const clientTypes = [
    { label: "Special", value: "special" },
    { label: "Regular", value: "regular" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset
  } = useForm();

  const item = watch();

  const { id } = useParams()
  const navigate = useNavigate()

  const getClientData = () => {
    axios.get(`http://localhost:8000/clients/${id}`).then((res) => {
      setClientData(res.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    if (id) {
      getClientData()
    }
  }, [])

  useEffect(() => {
    reset({ ...clientData })
  }, [clientData])



  const onSubmit = (data) => {
    if (formType === "add") {
      axios
        .post(`http://localhost:8000/clients/`, data)
        .then((res) => {
          navigate('/clients')
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }

    if (formType === "edit") {
      if (resetUsernamePassword) {
        data.username = ''
        data.password = ''
      }
      axios
        .patch(`http://localhost:8000/clients/`, data)
        .then((res) => {
          navigate(`/clients/${id}`)
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };

  return (
    <div className="client_form">
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="client_form_container">
        <div className="client_form_header">
          <h1>{formType.toUpperCase()} CLIENT</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="client_form_form">
          <div className="client_form_inputContainer">
            <input placeholder="Name" {...register("name", { required: true })} />
            {errors.name && <p className="error_message">Clients name is required.</p>}
          </div>
          {!resetUsernamePassword ? <>  <div className="client_form_inputContainer">
            <input placeholder="Username" {...register("username", { required: true })} />
            {errors.username && <p className="error_message">Clients username is required.</p>}
          </div>
            <div className="client_form_inputContainer">
              <input placeholder="Password" {...register("password", { required: true })} />
              {errors.name && <p className="error_message">Clients password is required.</p>}
            </div></> : <button type="button" onClick={() => setResetUsernamePassword(false)} className="client_form_reset">Reset Username/Password</button>}
          <div className="client_form_inputContainer">
            <Controller
              name="clientType"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, name, value } }) => {
                return (
                  <Select
                    value={value || item.clientType}
                    name={name}
                    placeholder="Select Client Type"
                    defaultValue={item.clientType}
                    onChange={onChange}
                    options={clientTypes}
                  />
                );
              }}
            />
            {errors.clientType && <p className="error_message">Client Type is required.</p>}
          </div>
          <div className="client_form_inputContainer">
            <input placeholder="Address" {...register("address")} />
          </div>
          <div className="client_form_inputContainer">
            <input placeholder="City" {...register("city")} />
          </div>
          <div className="client_form_inputContainer">
            <input placeholder="Mobile" {...register("mobile")} />
          </div>
          <input className="client_form_submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ClientsForm;
