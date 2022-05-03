import React, { useEffect, useState } from "react";
import { isAccesed } from "../authentication/auth";
import Base from "./Base";
import Card from "./Card";
import { loadCartPage } from "./helper/cartStorageHelper";
import PaymentComponent from "./Payment";


const Cart = () =>{
    const [products, setProducts] = useState([]); 
    const [reload, setReload] = useState(false); 
    //loading the products 

    useEffect(()=>{
        setProducts(loadCartPage())
    }, [reload])
    const loadAddedProducts = ()=>{
        return(
          <div>
              <h2>Loading the products</h2>
            {products && (products?.map((prod, index)=>(
                  <Card key = {index}
                  product={prod}
                  removeCart={true}
                  addtoCart={false}
                  setReload={setReload}
                  reload={reload}
                  
                  >
                    
                  </Card>
              ))
            )}
          </div>
        )
    }
 
    return (
        <Base title= "Cart Page" description= "Check out your favorites">
        <div className="row text-center">
            {products ? <div className="col-lg-6">{loadAddedProducts()}</div> : <div className="col-lg-6"><h2>No products😢</h2></div>}
              <div className="col-6">
              {isAccesed() ? <PaymentComponent products = {products}  reload = {reload} setReload= {setReload} /> :
              <button className="btn btn-warning">sign to checkout</button> }
              
            </div>
        </div>
        </Base>
    )
}

export default Cart; 