import React, { useEffect, useState } from "react";
import "./ProductForm.css";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Select from "../Select/Select";

function ProductForm({ formType }) {
  const [productData, setProductData] = useState({})
  const [productClasses, setProductClasses] = useState([])
  const [productSubClasses, setProductSubClasses] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [error, setError] = useState([]);

  const setImageHandler = (e) => {
    setSelectedFile([...e.target.files]);
  };


  const {
    register,
    handleSubmit,
    formState: { errors, },
    control,
    resetField,
    watch,
    reset
  } = useForm();

  const { id } = useParams()
  const navigate = useNavigate()

  const getProductData = () => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductClasses = () => {
    axios
      .get(`http://localhost:8000/productClasses`)
      .then((res) => {
        setProductClasses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      getProductData()
    }
    getProductClasses()
  }, [])

  useEffect(() => {
    reset({ ...productData })
  }, [productData])


  const onSubmit = (data) => {
    if (formType === "add") {
      const fd = new FormData();
      for (let key in data) {
        fd.append(key, data[key]);
      }
      for (let i = 0; i < selectedFile.length; i++) {
        fd.append("file", selectedFile[i]);
      }

      axios
        .post(`http://localhost:8000/products/`, fd)
        .then((res) => {
          navigate('/products')
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
    if (formType === "edit") {
      const fd = new FormData();
      for (let key in data) {
        fd.append(key, data[key]);
      }
      if (selectedFile.length > 0) {
        for (let i = 0; i < selectedFile.length; i++) {
          fd.append("file", selectedFile[i]);
        }
      }

      axios
        .patch(`http://localhost:8000/products/`, fd)
        .then((res) => {
          navigate(`/products/${id}`)
        })
        .catch((error) => {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };

  const item = watch();

  useEffect(() => {
    if (item && item.productClass) {
      for (let index = 0; index < productClasses.length; index++) {
        if (productClasses[index].name.label === item.productClass) {
          resetField("productSubclass");
          setProductSubClasses([...productClasses[index].subclass]);
        }
      }
    }
  }, [item.productClass]);

  // console.log('ITEM', item);
  // console.log('Product Data', productData);
  // console.log(id);

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
              name="productClass"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, name, value } }) => {
                return (
                  <Select
                    value={value || item.productClass}
                    name={name}
                    placeholder="Select Product Category"
                    defaultValue={item.productClass}
                    onChange={onChange}
                    options={productClasses.map((item) => item.name)}
                  />
                );
              }}
            />
            {errors.productClass && <p className="error_message">Product Class is required.</p>}
          </div>
          <div className="add_inputContainer">
            <Controller
              name="productSubclass"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  categoriesChange={productSubClasses}
                  name={name}
                  value={value}
                  placeholder="Select Product Subcategory"
                  onChange={onChange}
                  defaultValue={item.productSubclass}
                  isDisabled={!item.productClass}
                  options={productSubClasses}
                  disabled={!item.productClass && "disabled"}
                />
              )}
            />
            {errors.productSubclass && <p className="error_message">Product Subclass is required.</p>}
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
            <input {...register('images')} onChange={(e) => setImageHandler(e)} type="file" multiple accept=".jpeg, .png, .jpg" />
          </div>
          <input className="add_submit" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
