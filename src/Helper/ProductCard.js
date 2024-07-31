import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from '../ProductContext'
import { toast } from "react-toastify";

function ProductCard(props) {

    const context = useContext(ProductContext)
    const addToCart = context.productApi.addToCart

    let outstockWarning = () => {
        toast.warning("out of stock")
    }

    let btnChecking = () => {
        if (props.stock <= 0) {
            outstockWarning(); // Show warning if out of stock
            } else {
            addToCart(props); // Add to cart if in stock
            }
    }

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">
            <div className="card">
                <img src={props.thumbnail} alt="no image" className="card-img-top" width={300} height={250}/>
                <div className="card-body">
                    <h4 className="text-center text-success text-capitalize" style={{width:"100%",overflow: "hidden",textOverflow: "ellipsis",whiteSpace: "nowrap"}}> {props.title} </h4>
                    <h6 className="text-warning"> &#8377; {props.price} </h6>
                    <details>
                        <summary className="text-primary">Product Description</summary>
                        <p className="card-text text-justify text-secondary"> {props.description} </p>
                    </details>
                </div>

                <div className="card-footer">
                    <NavLink to={`/product/${props.id}/category/${props.category}`} className="btn btn-sm btn-outline-primary"
                    title="product details">
                        <i className="bi bi-info-circle-fill"></i>
                    </NavLink>
                    <button 
                        onClick={() => {btnChecking()}} className="btn btn-outline-success btn-sm float-end" title="Add to Cart" 
                     >
                    <i className="bi bi-cart"></i>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ProductCard