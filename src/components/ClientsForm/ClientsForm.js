import React, { useState, useEffect } from "react";
import "./ClientsForm.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Select from "../Select/Select";
import { IoClose } from "react-icons/io5";

const ClientsForm = ({ setClientsForm, setLoading, formType, getData, clientData }) => {
  const [error, setError] = useState("");

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
  } = useForm({ defaultValues: clientData });

  const item = watch();

  const onSubmit = (data) => {
    if (formType === "add") {
      axios
        .post(`http://localhost:8000/clients/`, data)
        .then((res) => {
          setLoading(false);
          getData();
          setClientsForm(false);
        })
        .catch((error) => {
          setError(error.response.data.error);
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }

    if (formType === "edit") {
      setLoading(true);
      axios
        .patch(`http://localhost:8000/clients/`, data)
        .then((res) => {
          setLoading(false);
          getData();
          setClientsForm(false);
        })
        .catch((error) => {
          setError(error.response.data.error);
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };

  return (
    <div className="client_form">
      {error && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="client_form_container">
        <div className="client_form_header">
          <h1>{formType.toUpperCase()} CLIENT</h1>
          <IoClose onClick={() => setClientsForm(false)} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="client_form_form">
          <div className="client_form_inputContainer">
            <input placeholder="Client Name" {...register("name", { required: true })} />
            {errors.name && <p className="error_message">Clients name is required.</p>}
          </div>
          <div className="client_form_inputContainer">
            <input placeholder="Client Password" {...register("password", { required: true })} />
            {errors.name && <p className="error_message">Clients password is required.</p>}
          </div>
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
