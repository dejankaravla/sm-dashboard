import React, { useEffect, useState } from "react";
import "./ProductForm.css";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Select from "../Select/Select";
import { productsApi, categoriesApi } from "../../api/definitions";

function ProductForm({ formType }) {
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [error, setError] = useState([]);

  const setImageHandler = (e) => {
    setSelectedFile([...e.target.files]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const item = watch();

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getProductData = () => {
    axios
      .get(productsApi + id)
      .then((res) => {
        reset({ ...res.data });
      })
      .catch((error) => {
        console.log(error);
        setErrorHandler(error.response.data.error);
      });
  };

  const getCategories = () => {
    axios
      .get(categoriesApi)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorHandler(error.response.data.error);
      });
  };

  useEffect(() => {
    if (id) {
      getProductData();
    }
    getCategories();
  }, []);

  const onSubmit = (data) => {
    if (formType === "add") {
      const newFormData = new FormData();
      for (let key in data) {
        newFormData.append(key, data[key]);
      }
      for (let i = 0; i < selectedFile.length; i++) {
        newFormData.append("file", selectedFile[i]);
      }

      axios
        .post(productsApi, newFormData)
        .then((res) => {
          navigate("/products");
        })
        .catch((error) => {
          console.log(error);
          setErrorHandler(error.response.data.error);
        });
    }
    if (formType === "edit") {
      const newFormData = new FormData();
      for (let key in data) {
        newFormData.append(key, data[key]);
      }
      if (selectedFile.length > 0) {
        for (let i = 0; i < selectedFile.length; i++) {
          newFormData.append("file", selectedFile[i]);
        }
      }

      axios
        .patch(productsApi, newFormData)
        .then((res) => {
          navigate(`/products/${id}`);
        })
        .catch((error) => {
          console.log(error);
          setErrorHandler(error.response.data.error);
        });
    }
  };

  return (
    <div className="add">
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="addContainer">
        <div className="add_header">
          <h1>{formType.toUpperCase()} PRODUCT</h1>
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="add_form">
          <div className="add_inputContainer">
            <input placeholder="Product Name" {...register("name", { required: true })} />
            {errors.name && <p className="error_message">Product name is required.</p>}
          </div>
          <div className="add_inputContainer">
            <Controller
              name="category"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, name, value } }) => {
                return (
                  <Select
                    value={value || item.category}
                    name={name}
                    placeholder="Select Product Category"
                    defaultValue={item.category}
                    onChange={onChange}
                    options={categories.map((item) => item.name)}
                  />
                );
              }}
            />
            {errors.category && <p className="error_message">Category is required.</p>}
          </div>
          <div className="add_inputContainer">
            <Controller
              name="subcategory"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  changeEvent={item.category}
                  name={name}
                  value={value}
                  placeholder="Select Product Subcategory"
                  onChange={onChange}
                  defaultValue={item.subcategory}
                  isDisabled={!item.category}
                  options={() => {
                    if (item && item.category && categories.length > 0) {
                      const [selectedCategory] = categories.filter((cat) => cat.name === item.category);
                      return selectedCategory.subcategory;
                    }
                  }}
                  disabled={!item.category && "disabled"}
                />
              )}
            />
            {errors.subcategory && <p className="error_message">Subcategory is required.</p>}
          </div>
          <div className="add_inputContainer">
            <input min="0" placeholder="Price" type="number" {...register("price", { required: true })} />
            {errors.price && <p className="error_message">Price is required.</p>}
          </div>
          <div className="add_inputContainer">
            <input min="0" placeholder="Quantity" type="number" {...register("quantity")} />
          </div>

          <div className="add_inputContainer">
            <textarea rows="5" placeholder="Description" {...register("description")}></textarea>
          </div>
          <div className="add_inputContainer">
            <input type="number" min="0" placeholder="Purchase Price" {...register("purchasePrice")} />
          </div>
          <div className="add_inputContainer">
            <input
              {...register("images")}
              onChange={(e) => setImageHandler(e)}
              type="file"
              multiple
              accept=".jpeg, .png, .jpg"
            />
          </div>
          <input className="add_submit" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
