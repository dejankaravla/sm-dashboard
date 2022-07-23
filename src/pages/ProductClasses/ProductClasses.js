import React, { useEffect, useState } from "react";
import "./ProductClasses.css";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { HiOutlineTrash } from "react-icons/hi";

const ProductClasses = () => {
  const [productClasses, setProductClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newClass, setNewClass] = useState("");
  const [error, setError] = useState("");

  const getProductClasses = () => {
    setLoading(true);
    axios.get(`http://localhost:8000/productClasses`).then((res) => {
      setProductClasses(res.data);
      setLoading(false);
    });
  };

  const createNewClass = () => {
    setLoading(true);
    const newData = {
      name: { value: newClass.toLowerCase(), label: newClass.charAt(0).toUpperCase() + newClass.slice(1) },
    };
    axios
      .post(`http://localhost:8000/productClasses/`, newData)
      .then((res) => {
        getProductClasses();
        setNewClass("");
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

  const deleteClass = (_id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/productClasses/${_id}`)
      .then((res) => {
        getProductClasses();
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

  const createNewSubclass = (e, productClass) => {
    setLoading(true);
    const newSubclass = e.target.value;
    const productSubclass = {
      value: newSubclass.toLowerCase(),
      label: newSubclass.charAt(0).toUpperCase() + newSubclass.slice(1),
    };
    const included = productClass.subclass.some((item) => item.value === productSubclass.value);

    if (included) {
      setError("You allready have a Class with a same name.");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    productClass.subclass.push(productSubclass);

    axios
      .patch(`http://localhost:8000/productClasses/`, productClass)
      .then((res) => {
        getProductClasses();
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

  const deleteSubclass = (productClass, productSubclass) => {
    setLoading(true);
    productClass.subclass = productClass.subclass.filter((sub) => {
      return sub.value !== productSubclass.value;
    });
    axios
      .patch(`http://localhost:8000/productClasses/`, productClass)
      .then((res) => {
        getProductClasses();
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

  useEffect(() => {
    getProductClasses();
  }, []);

  return (
    <div className="productClasses">
      <div className="products_loader">
        <ClipLoader size={100} color="red" loading={loading} />
      </div>
      {error && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="productClasses_controls">
        <input
          onChange={(e) => {
            setNewClass(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createNewClass();
            }
          }}
          value={newClass}
          placeholder="Create New Product Category"
          name="productClass"
        />
        <button onClick={createNewClass}>Submit</button>
      </div>
      <div className="productClasses_container">
        {productClasses.map((pClass) => {
          return (
            <div className="productClass">
              <div className="productClass_header">
                <p>{pClass.name.label}</p>
                <HiOutlineTrash className="class_Trash" onClick={() => deleteClass(pClass._id)} />
              </div>

              <div className="productSubClass_container">
                {pClass.subclass.map((sub) => {
                  return (
                    <div className="productSubClass">
                      <span>{sub.label}</span>
                      {/* <button onClick={() => deleteSubclass(pClass, sub)}>Delete</button> */}
                      <HiOutlineTrash className="sub_Trash" onClick={() => deleteSubclass(pClass, sub)} />
                    </div>
                  );
                })}
                <div className="productSubClass_addNew">
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        createNewSubclass(e, pClass);
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

export default ProductClasses;