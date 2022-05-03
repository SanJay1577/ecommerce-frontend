import React, {  useState } from "react"; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isAccesed } from "../authentication/auth";
import Base from "../core/Base"; 
import { createCategory } from "./helper/adminApiRequest";


export function GoBack(){
  const history = useHistory(); 
  return (
    <button onClick={()=>history.push("/admin/dashboard")} 
    className="btn btn-success btn-sm mb-3">Admin Home</button>
  )
}

function AddCategory(){
  const [name, setName] = useState(""); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const {user, token} = isAccesed(); 

 const handlesubmit= (e)=>{
    e.preventDefault(); 
    createCategory(user._id, token, {name}).then(data=>{
      if(data.error){
        setError(data.error);
        setName("");
        setSuccess("");
        console.log(data);
      }
      else {
        setSuccess("Category added Succesfully")
        setName("")
        setError("")
      }
    }).catch(err=>console.log(err))
    }; 

  const categoryForm = ()=>{

    return(
    <form onSubmit={handlesubmit}>
      <div className="form-group">
        <p className="lead">Enter new category name</p>
        {error&&( <div className="alert alert-danger">{error}</div> )}
        {success&&( <div className="alert alert-success">{success}</div> )}
        <input 
        type="text" 
        className="form-control my-3"
        value = {name} 
        onChange={(event)=>setName(event.target.value)}
        autoFocus
        required
        placeholder="Ex. Dumbbles"/>
        <button type="sumbit" className="btn btn-outline-success">Add Category</button>
      </div>
    </form>
    )
  }
 
       return (

           <Base 
           title="Create a New Category"
            description="Add a new Category for your products">
          { categoryForm()}
          <GoBack/>
           </Base>
          
       )
   }

export default AddCategory; 