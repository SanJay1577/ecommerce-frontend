import React from "react";
import NavBar from "./Nav"

 function Base({
  title,
  description,
  Styles = "bg-dark text-white p-4",
  children,
}) {
    return (
  <div>
     <NavBar/>
    <div className="container-fluid parent-base">

      <div className="jumbotron bg-dark text-white text-center p-1 m-2">
        <h2 className="display-4=2">{title}</h2>
        <p className="lead">{description}</p>
      </div>
        
        <div className={Styles}>{children}</div>
 
    </div>

    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-primary text-white text-center py-3">
        <h4>Please fell free to reach us in case of any help</h4>
        <button className="btn btn-success btn-lg">Contact Us</button>
      </div>

      <div className="container text-center">
        <span className="text-white-50">
          An amazing Store for all your personal and professional fitness needs
        </span>
      </div>
    </footer>
  </div>
    );   
}
 export default Base; 