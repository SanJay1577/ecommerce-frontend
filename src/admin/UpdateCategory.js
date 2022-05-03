import React, {useState} from "react";
import { GoBack } from "./Addcategory";
import { isAccesed } from "../authentication/auth";
import Base from "../core/Base"; 
import { updateCategory } from "./helper/adminApiRequest";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";





const UpdateCategory = ()=>{
  const [name, setName] = useState(""); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); 
  const {user, token} = isAccesed(); 
  const param = useParams(); 
  const history = useHistory(); 

 const handlesubmit= (e)=>{
    e.preventDefault(); 
    updateCategory(param.categoryId, user._id, token, {name}).then(data=>{
      if(data.error){
        setError(data.error);
        setName("");
        console.log(data);
      }
      else {
        setSuccess(true)
        setName("")
        setError("")
      }
    }).catch(err=>console.log(err))
    }; 

    const redirectMethod = () => {
        if (success) {
          setTimeout(() => {
            history.push("/admin/categories");
          }, 2000);
        }
        return(
         success&&( <div className="alert alert-success">Updated sucessfully redirecting...</div> )
        )
      };

  const categoryForm = ()=>{

    return(
       
    <form onSubmit={handlesubmit}>
      <div className="form-group">
        <p className="lead">Rename you category</p>
        {error&&( <div className="alert alert-danger">{error}</div> )}
        <input 
        type="text" 
        className="form-control my-3"
        value = {name} 
        onChange={(event)=>setName(event.target.value)}
        autoFocus
        required
        placeholder="New category name"/>
        <button type="sumbit" className="btn btn-outline-success">Update Category</button>
      </div>
    </form>
  
    )
  }
 



    return(
        <Base 
        title="Create a New Category"
         description="Add a new Category for your products">
          {redirectMethod()}
          { categoryForm()}
       <GoBack/>
        </Base>
    )
}
export default UpdateCategory; 