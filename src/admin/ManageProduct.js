import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isAccesed } from "../authentication/auth";
import Base from "../core/Base"; 
import {GoBack}  from "./Addcategory";
import { deleteProduct, getProducts } from "./helper/adminApiRequest";




const ManageProduct =  ()=>{
    const history = useHistory(); 
    const [products, setProducts] = useState([]);
    const [messages, setMessages] = useState("")
    const {user, token} = isAccesed(); 

    const loadProducts = () =>{
        getProducts().then(data=>{
            if(data.error){
               setMessages(data.error)
            }else{
                setProducts(data);
            }
        })
    }; 
    useEffect(()=>{
    loadProducts()
}, [])


const deleteAProduct = (productID)=>{
     deleteProduct(productID, user._id, token).then(data=>{
         if(data.error){
           setMessages(data.error)
         }
        else{
        const newList = products.filter((product)=>(product._id !== productID)); 
          setProducts(newList);
        }
     }).catch(err=>console.log(err)); 
}; 

const number = products.length

    return (
        <Base title="Welcome admin" description="Manage products here">
        <h2 className="mb-4">All products:</h2>
        <GoBack/> {messages&&(
            <div className="alert alert-danger">{messages}</div>
        )}
        <div className="row">
          <div className="col-12">
            <h4 className="text-center text-white my-3"> You have {number} products</h4>
            {products.map((product, index) => {
              return (
                <div key={index} className="row text-center mb-2  ">
                  <div className="col-4">
                    <p className="text-white text-left manage-name">{product.name}</p>
                  </div>
                  <div className="col-4 pl-4">
                    <button
                      className="btn btn-success"
                      onClick={()=>history.push(`/admin/product/update/${product._id}`)}
                    >
                      <span className="">Update</span>
                    </button>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteAProduct(product._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <br/>
      </Base>

 
    )
}

export default ManageProduct; 