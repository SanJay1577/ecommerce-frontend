


//adding the products to the cart
const addProductToCart = (product, next)=>{
    let  cart = [];
    if(localStorage.getItem("products")){
        cart = JSON.parse(localStorage.getItem("products"))
    }
    cart.push({...product, count:1}); 
    localStorage.setItem("products", JSON.stringify(cart))
    next(); 
}

//loading the product details here
const loadCartPage = () =>{
   if( localStorage.getItem("products") ){
       return JSON.parse(localStorage.getItem("products"))
   }
}

//removing the product form the cart 

const removeProductFromCart = productId =>{
    let cart= []; 
    if(localStorage.getItem("products")){
        cart = JSON.parse(localStorage.getItem("products"));
    }

    cart.map((product, index) => {
        if(product._id === productId){
          cart.splice(index,1); 
        }
        return cart; 
    }); 
    localStorage.setItem("products", JSON.stringify(cart)); 
    return cart; 
} 

//clear the cart 
const clearCart = next =>{
        localStorage.removeItem("product"); 
        let cart = []; 
        localStorage.setItem("products", JSON.stringify(cart))
        next(); 
}

export {addProductToCart, loadCartPage, removeProductFromCart, clearCart}