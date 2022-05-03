import React, {useEffect, useState} from "react";
import  Base  from "./Base";
import "../style.css"
import { getProducts, getcategories } from "../admin/helper/adminApiRequest.js";
import Card from "./Card";



function Home (){
const [products, setProducts] = useState([]); 
const [categories, setCategories] = useState([]); 
    useEffect(()=>{
      getProducts().then(data=>{
          if(data.error){
              console.log(data.error)
          }else {
              setProducts(data);
          }
      }).catch(err=>console.log(err))
      getProducts();
    }, []); 

    useEffect(()=>{
        getcategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
               setCategories(data);
            }
        }).catch(err=>console.log(err))
        getcategories();
    }, [])

  const allCategory =  categories.map((cateId)=>(cateId._id)); 
 
    return (
      
        <Base title = "Fitness-Fiber" description="Your only store for all your fitness needs">
        <div className="row">

            <div className="col-12">
                <div className="row">
                <div className="col-12">
                         <h2 className="text-warning">Dumbbles</h2>
                     </div>
                         {products
                         .filter((product)=>product.category._id === allCategory[0])
                         .map((prod, id)=><div key = {id} className=" text-center col-2-xs col-md-3 col-lg-2">
                 <Card product = {prod}/>
                 </div>
                 )}
                 </div>
                
                 <div className="row">
                     <div className="col-12">
                         <h2 className="text-warning">Plates and Barbells</h2>
                     </div>
                 {products
                 .filter((product)=>product.category._id === allCategory[1])
                 .map((prod, id)=><div key = {id} className="text-white text-center col-xs-4 col-md-3 col-lg-2">
                 <Card product = {prod}/>
                 </div>
                 )}
                 </div>
            </div>

        </div>

        </Base>
    )
}

export default Home;