import { API } from "../../backend";

//category Backend Connection
const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}category/add/${userId}`, {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//all categories for product addition
const getcategories = async () => {
  try {
    const response = await fetch(`${API}categories`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//get specific category

const getCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API}categories/${categoryId}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//update and category
const updateCategory = async (categoryId, userId, token, category) => {
  try {
    const response = await fetch(`${API}category/${categoryId}/${userId}`, {
      method: "PUT",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//delete a category
const deleteCategory = async (categoryId, userId, token) => {
  try {
    const response = await fetch(`${API}category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Product backend Connection
//create a product

const createProduct = async (userId, token, product) => {
  try {
    const response = await fetch(`${API}product/add/${userId}`, {
      method: "POST",
      body: product,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//find all products..,
const getProducts = async () => {
  try {
    const response = await fetch(`${API}products`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//get a specific product
const getProduct = async (productId) => {
  try { 
    const response = await fetch(`${API}product/${productId}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Update the specific order..
const updateProduct = async (productId, userId, token, product) => {
  try {
    const response = await fetch(`${API}product/${productId}/${userId}`, {
      method: "PUT",
      body: product,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Delete a Specific Order

const deleteProduct = async (productId, userId, token) => {

  try {
    const response = await fetch(`${API}product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
//get all Orders 

const getAllOrders = async (userId, token) =>{
  const response = await fetch(`${API}order/all/${userId}`, {
    method:"GET",
    headers:{
      Authorization: `Bearer ${token}`
    },
  }); 
  const data = await response.json(); 
  return data;
}

//updating the current order

const updateOrder = async (userId, token, orderId, status)=>{
  const response = await fetch(`${API}order/${orderId}/status/${userId}`, {
    method:"PUT", 
    body:JSON.stringify({status}),
    headers:{
      Authorization:`Bearer ${token}`,
      "Content-Type":"Application/json"
    },
  }); 
  const data = await response.json(); 
  return data; 
}

export {
  createCategory,
  getcategories,
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  updateCategory,
  getCategory,
  deleteCategory,
  getAllOrders, 
  updateOrder,
};
