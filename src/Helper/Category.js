import React from "react";
import { NavLink } from "react-router-dom";

export default function Category(props) {
    const {slug,name,url} = props.value;
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2 text-center">
            <div className="card">
                <div className="card-body text-white bg-secondary text-wrap rounded-2">
                    <NavLink to={`/products/${slug}`} className="btn border-0">{name}</NavLink>
                {/* Here value is not built-in keyword.. */}
                </div>
            </div>
        </div>
    )
}