import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isAccesed } from "../authentication/auth";
import Base from "../core/Base"; 
import {GoBack}  from "./Addcategory";
import { deleteCategory, getcategories } from "./helper/adminApiRequest";

const ManageCategory =  ()=>{

         const history = useHistory();
        const [categories, setCategories] = useState([]);
        const [messages, setMessages] = useState("")
        const {user, token} = isAccesed();
    
        const loadProducts = () =>{
            getcategories().then(data=>{
                if(data.error){
                   setMessages(data.error)
                }else{
                    setCategories(data);
                }
            })
        }; 

useEffect(()=>{
    loadProducts()
}, []); 

const deleteACategory = (categoryId)=>{
    deleteCategory(categoryId, user._id, token).then(data=>{
       if(data.error){
           setMessages(data.error)
       }else{
      const newListCategory = categories.filter((category)=>category._id !== categoryId); 
       setCategories(newListCategory); 
       }
    })
}

const number = categories.length; 
    return (
        <Base title="Welcome admin" description="Manage products here">
        <h2 className="mb-4">All products:</h2>
        <GoBack/> {messages&&(
            <div className="alert alert-danger">{messages}</div>
        )}
        <div className="row">
          <div className="col-12">
            <h4 className="text-center text-white my-3"> You have {number} categories</h4>
            {categories.map((category, index) => {
              return (
                <div key={index} className="row text-center mb-2  ">
                  <div className="col-4">
                    <h5 className="text-white text-left manage-name">{category.name}</h5>
                  </div>
                  <div className="col-4 pl-4">
                    <button
                      className="btn btn-success"
                      onClick={()=>history.push(`/admin/category/update/${category._id}`)}
                    >
                      <span className="">Update</span>
                    </button>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteACategory(category._id);
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

export default ManageCategory; 