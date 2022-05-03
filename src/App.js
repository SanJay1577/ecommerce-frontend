import Home from "./core/Homepage";
import {Switch, Route} from "react-router-dom"
import SignupPage from "./user/Signup.js";
import SiginPage from "./user/Signin";
import AdminRoute from "./authentication/adminRoutes";
import PersonalRoute from "./authentication/personalRoutes";
import UserDashBoard from "./user/UserDashboard";
import AdminDashBoard from "./user/AdminDashboard";
import AddCategory from "./admin/Addcategory";
import ManageCategory from "./admin/ManageCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProduct";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import ManageOrders from "./admin/ManageOrder";

function App(){
  return (
     <Switch>
       
       <Route  exact path ="/">
        <Home/>
       </Route>

       <Route path ="/signup">
        <SignupPage/>
       </Route>

       <Route path ="/signin">
          <SiginPage/>
       </Route>

       <Route path ="/signout">
       <h2 className="text-white">I'm Signout</h2>
       </Route>

       <Route path ="/cart">
       <Cart/>
       </Route>
       
       <PersonalRoute path = "/user/dashboard" exact component={UserDashBoard}/>

       <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>

       <AdminRoute path="/admin/add/category" exact component={AddCategory}/>
       <AdminRoute path="/admin/categories" exact component={ManageCategory}/>
       <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>

       <AdminRoute path="/admin/add/products" exact component={AddProduct}/>
       <AdminRoute path="/admin/products" exact component={ManageProduct}/>
       <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
       <AdminRoute path="/admin/orders" exact component={ManageOrders}/>

   

     </Switch>
  );
}

export default App;
