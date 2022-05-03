/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { API } from "../../backend";

const ImageComponent = ({product}) =>{
    const imageUrl  = product ? `${API}product/photo/${product._id}` : ""; 
    return (
        <div className="rounded p-2">
        <img
          src={imageUrl}
          alt="photo"
          style={{ minHeight: "150px", maxWidth: "150px", objectFit:"cover" }}
          className="mb-3 rounded"
        />
      </div>

    ); 
}; 

export default ImageComponent; 