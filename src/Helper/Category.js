import React from "react";
import { NavLink } from "react-router-dom";

export default function Category(props) {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2 text-center">
            <div className="card">
                <div className="card-body text-white text-wrap">
                    <NavLink to={`/products/${props.value}`} className="btn">{props.value}</NavLink>
                {/* Here value is not built-in keyword.. */}
                </div>
            </div>
        </div>
    )
}