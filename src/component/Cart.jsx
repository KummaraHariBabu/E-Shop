import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../ProductContext';
import "./cart.css"
function Cart() {
  const context = useContext(ProductContext);
  const [cart, setCart] = context.productApi.cart;

  // States to handle subtotal, discount, delivery charge, tax
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0)
  const [dc, setDc] = useState(0);
  const [gst, setGst] = useState(5);

  const getTotal = () => {
    let total = cart.reduce((prev, item) => {
      return prev + (Math.floor(item.price * item.quantity * 100) / 100);
    }, 0);

    const discountTotal = cart.reduce((prev, item) => {
      let discount = (item.price* (item.discountPercentage/100))
      return Math.floor((prev + (discount * item.quantity))*100)/100;
    },0);

    // Update subtotal
    setSubTotal(total);

    // Calculate delivery charge and discount
    if (total >= 1000) {
      setDc(0); // No delivery charge for orders above 1000
      setDiscount(discountTotal); // Apply 10% discount
    } else {
      setDc(50); // Set default delivery charge
      setDiscount(0); // No discount
    }

    // Optionally, you can update gst if needed
    setGst(5); // Assuming gst is constant
  };

  useEffect(() => {
    getTotal();
  }, [cart]);

  // Increment item quantity
  const increment = (id) => {
    cart.forEach(item => {
      if (item.id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
  };

  // Decrement item quantity
  const decrement = (id) => {
    cart.forEach(item => {
      if (item.id === id) {
        item.quantity = item.quantity === 1 ? 1 : item.quantity - 1;
      }
    });
    setCart([...cart]);
  };

  // Delete item
  const delItem = (id) => {
    if (window.confirm(`Do you want to remove the product?`)) {
      setCart(cart.filter(item => item.id !== id));
    }
  };


  return (
    <div className="container-fluid">
      {cart.length === 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="display-3 text-success">Cart is Empty</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="display-3 text-success">Cart</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 col-lg-9 col-sm-12 mobile-scroll" >
              <table className="table table-bordered table-striped">
                <thead className='text-center'>
                  <tr>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Discount %</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className='text-center'>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>
                        <img src={item.thumbnail} alt="no image" width={80} height={80} />
                      </td>
                      <td>&#8377; {item.price}</td>
                      <td>{item.discountPercentage}</td>
                      <td>
                        <div className="d-flex justify-content-evenly">
                          <i onClick={() => decrement(item.id)} className="bi bi-dash-circle text-danger pointer"></i>
                          <strong> {item.quantity} </strong>
                          <i onClick={() => increment(item.id)} className="bi bi-plus-circle text-success pointer"></i>
                        </div>
                      </td>
                      <td>&#8377; {Math.floor(item.price * item.quantity * 100) / 100}</td>
                      <td>
                        <i onClick={() => delItem(item.id)} className="bi bi-trash text-danger pointer"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-md-4 col-lg-3 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="text-center">Cart Info</h4>
                </div>

                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>SubTotal</strong>
                      <span className="text-success float-end">
                        + &#8377; {Math.floor(subTotal*100)/100}
                      </span>
                    </li>
                    <li className="list-group-item">
                      <strong>Discount</strong>
                      <span className="text-danger float-end"> 
                        - &#8377; {discount}
                      </span>
                    </li>
                    <li className="list-group-item">
                      <strong>Delivery Charge</strong>
                      <span className="text-danger float-end"> + &#8377; {dc}</span>
                    </li>
                  </ul>

                  <ul className="list-group">
                    <li className="list-group-item mt-2 mb-2">
                      <strong>Total</strong>
                      <span className="text-success float-end">
                        = &#8377; {Math.floor((subTotal + dc) - discount)}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="card-footer d-grid">
                  <button className="btn btn-outline-success">Checkout</button>               
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
