import React, { useEffect, useState } from "react";
import "./ProductCategories.css";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { HiOutlineTrash } from "react-icons/hi";
import Loader from "../../components/Loader/Loader";
import { categoriesApi } from "../../api/definitions";

const ProductCategories = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState([]);

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getProductCategories = () => {
    setLoading(true);
    axios.get(categoriesApi).then((res) => {
      setProductCategories(res.data);
      setLoading(false);
    });
  };

  const createNewCategory = () => {
    if (!newCategory) {
      setErrorHandler("Category name is required");
      return;
    }
    setLoading(true);
    const newData = {
      name: newCategory,
    };
    axios
      .post(categoriesApi, newData)
      .then((res) => {
        getProductCategories();
        setNewCategory("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error.response.data.error);
      });
  };

  const deleteCategory = (_id) => {
    setLoading(true);
    axios
      .delete(categoriesApi + _id)
      .then((res) => {
        getProductCategories();
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  const createNewSubcategory = (e, category) => {
    const newSubcategory = e.target.value;
    if (!newSubcategory) {
      setErrorHandler("Subcategory name is required");
      return;
    }

    setLoading(true);
    const included = category.subcategory.some((item) => item === newSubcategory);

    if (included) {
      setLoading(false);
      setErrorHandler("Subcategory with the same name allready exists");
      return;
    }

    category.subcategory.push(newSubcategory);

    axios
      .patch(categoriesApi, category)
      .then((res) => {
        getProductCategories();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorHandler(error.response.data.error);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  const deleteSubcategory = (category, subcategory) => {
    setLoading(true);
    category.subcategory = category.subcategory.filter((sub) => {
      return sub !== subcategory;
    });
    axios
      .patch(categoriesApi, category)
      .then((res) => {
        getProductCategories();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  return (
    <div className="category">
      <Loader loading={loading} />
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="category_controls">
        <input
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createNewCategory();
            }
          }}
          value={newCategory}
          placeholder="Create New Product Category"
          name="productCategory"
        />
        <button onClick={createNewCategory}>Submit</button>
      </div>
      <div className="category_container">
        {productCategories.map((category) => {
          return (
            <div key={category._id} className="category_category">
              <div className="category_category_header">
                <p>{category.name}</p>
                <HiOutlineTrash className="category_trash" onClick={() => deleteCategory(category._id)} />
              </div>

              <div className="category_subcategory_container">
                {category.subcategory.map((sub) => {
                  return (
                    <div key={sub} className="category_subcategory">
                      <span>{sub}</span>
                      <HiOutlineTrash className="subcategory_trash" onClick={() => deleteSubcategory(category, sub)} />
                    </div>
                  );
                })}
                <div className="category_subcategory_addNew">
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        createNewSubcategory(e, category);
                        e.target.value = "";
                      }
                    }}
                    placeholder="Add New"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategories;
