import React, { useEffect, useState } from "react";
import "./ProductForm.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Select from "../Select/Select";
import { IoClose } from "react-icons/io5";

function ProductForm({ setProductForm, productClasses, setLoading, productData, formType, getData }) {
  const [productSubClasses, setProductSubClasses] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
    watch,
  } = useForm({ defaultValues: productData });

  const setImageHandler = (e) => {
    setSelectedFile([...e.target.files]);
  };

  const onSubmit = (data) => {
    if (formType === "add") {
      setLoading(true);
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
          setLoading(false);
          getData();
          setProductForm(false);
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
      const fd = new FormData();
      for (let key in data) {
        fd.append(key, data[key]);
      }
      for (let i = 0; i < selectedFile.length; i++) {
        fd.append("file", selectedFile[i]);
      }
      axios
        .patch(`http://localhost:8000/products/`, fd)
        .then((res) => {
          setLoading(false);
          getData();
          setProductForm(false);
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

  console.log(item);

  return (
    <div className="add">
      {error && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="addContainer">
        <div className="add_header">
          <h1>{formType.toUpperCase()} PRODUCT</h1>
          <IoClose onClick={() => setProductForm(false)} />
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} className="add_form">
          <div className="add_inputContainer">
            <input placeholder="Product Name" {...register("name", { required: true })} />
            {errors.name && <p>Product name is required.</p>}
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
            {errors.productClass && <p>Product Class is required.</p>}
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
            {errors.productSubclass && <p>Product Subclass is required.</p>}
          </div>
          <div className="add_inputContainer">
            <input min="0" placeholder="Price" type="number" {...register("price", { required: true })} />
            {errors.price && <p>Price is required.</p>}
          </div>
          <div className="add_inputContainer">
            <input min="0" placeholder="Quantity" type="number" {...register("quantity")} />
          </div>

          <div className="add_inputContainer">
            <textarea rows="10" placeholder="Description" {...register("description")}></textarea>
          </div>
          <div className="add_inputContainer">
            <input type="number" min="0" placeholder="Purchase Price" {...register("purchasePrice")} />
          </div>
          <div className="add_inputContainer">
            <input onChange={(e) => setImageHandler(e)} type="file" multiple accept=".jpeg, .png, .jpg" />
          </div>
          <input className="add_submit" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
