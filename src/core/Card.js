import React, {useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addProductToCart, removeProductFromCart } from "./helper/cartStorageHelper";
import ImageComponent from "./helper/getImagehelper";

const Card =({product, addtoCart = true, removeCart = false, reload = undefined, setReload = s=>s})=>{
    const history = useHistory(); 

    const [count, setCount] = useState(product.count);


    const addCart = ()=>{
        addProductToCart(product, ()=> history.push("/cart"))
    }

    const showAdd = addtoCart => {
        return (
            addtoCart && (
                <button onClick = {addCart} className="btn btn-block btn-outline-success mb-2 ">
                    Add to Cart
                </button>
            )
        )
    }

    const showRemove = removeCart => {
        return (
            removeCart && (
                <button onClick = {()=>{
                    removeProductFromCart(product._id); 
                    setReload(!reload); 
                    }}
                className="btn btn-block btn-outline-danger mb-2">
                    Remove cart
                </button>
            )
        )
    }


    return (
        <div className="card-sm text-white bg-dark border border-warning rounded">
      <div className="card-header-sm lead font-weight-normal">{product.name}</div>
      <div className="card-body-sm">
        <ImageComponent product={product} />
        <p className="lead-sm text-wrap description">
          {product.description}
        </p>
        <p className="btn btn-warning rounded  btn-sm px-2 ">Rs.{product.price}</p>
        <div className="row">
          <div className=" col-8 offset-2 cart-button">{showAdd(addtoCart)}</div>
          <div className="col-8 offset-2 cart-button">{showRemove(removeCart)}</div>
        </div>
      </div>
    </div>
    )
}
export default Card; 