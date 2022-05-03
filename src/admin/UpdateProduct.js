/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { isAccesed } from "../authentication/auth";
import Base from "../core/Base";
import { GoBack } from "./Addcategory";
import { getcategories, getProduct, updateProduct } from "./helper/adminApiRequest";


const UpdateProductForm = () => {
  const { user, token } = isAccesed();
  const history = useHistory();
  const param = useParams();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
    category: false,
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
    category,
  } = values;

  const loadCategory = () => {
    getcategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            error: "",
            categories: data,
            formData: new FormData(),
          });
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadCategory();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    const productDetails = () => {
      getProduct(param.productId).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            formData: new FormData(),
            photo:data.photo,
            category:true,
          });
        }
      });
    };

    productDetails();
  }, []);


  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(param.productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, loading: false, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
          getaRedirect: true,
        });
      }
    });
  };

  //getting the categories for he select form

  const succesMsg = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} updated succesfully redirecting to home...</h4>
      </div>
    );
  };

  //error message
  const errMsg = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };
  //loading message
  const loadingMsg = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: loading ? "" : "none" }}
      >
        <h4>Please wait loading.... </h4>
      </div>
    );
  };

  const redirectMethod = () => {
    if (getaRedirect) {
      setTimeout(() => {
        history.push("/admin/products");
      }, 2000);
    }
  };

  return (
    <div>
      {succesMsg()}
      {errMsg()}
      {loadingMsg()}
      {redirectMethod()}
      <form onSubmit={handleSubmit}>
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-success">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Select</option>
            {categories.map((list, index) => (
              <option key={index} value={list._id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={stock}
          />
        </div>

        <button type="submit" className="btn btn-outline-success">
          Update Product
        </button>
      </form>
    </div>
  );
};

const UpdateProduct = () => {
  return (
    <Base
      title="Add Product"
      description="Add All your Product here"
      Styles="container"
    >
      <div className="row bg-dark text-white rounded mb-5">
        <div className="col-md-6 offset-md-3">
          <UpdateProductForm />
          <br />
          <GoBack />
        </div>
      </div>
    </Base>
  );
};
export default UpdateProduct;
