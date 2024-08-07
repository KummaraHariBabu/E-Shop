import React, {useState, useEffect, useCallback, useContext} from 'react'
import axios from 'axios'
import { useParams, NavLink } from 'react-router-dom'
import { ProductContext } from '../ProductContext'
import { toast } from 'react-toastify'

const url = 'https://dummyjson.com'

export default function ProductDetails() {

  const params = useParams()
  const context = useContext(ProductContext)

  const [product,setProduct] = useState([])

  const addToCart = context.productApi.addToCart

  const getSingle = async () => {
    const res = await axios.get(`${url}/products/${params.id}`)
    setProduct(res.data)
  }

  const styles = {
    fullStar: {
      color: 'gold'
    },
    halfStarContainer: {
      display: 'inline-block',
      position: 'relative',
      color: 'gold'
    },
    halfStarAfter: {
      content: '"⭐"',
      color: 'gold',
      position: 'absolute',
      left: 0,
      width: '50%',
      overflow: 'hidden',
      transform: 'scaleX(-1)',
      transformOrigin: 'left'
    }
  };
  

  //for stars 
    const generateStars = ( rating ) => {
      let stars = [];
      let wholeStars = Math.floor(rating);
      let halfStar = rating - wholeStars >= 0.5 ? true : false;
    
      for (let i = 1; i <= wholeStars; i++) {
        stars.push(<span key={i} style={styles.fullStar}>⭐</span>);
      }

      if (halfStar) {
        stars.push(
          <span key="half" style={styles.halfStarContainer}>
            ⭐
            <span style={styles.halfStarAfter}></span>
          </span>
        );
      }
      return stars;
    }

    let outstockWarning = () => {
      toast.warning("out of stock")
  }

  let btnChecking = (product) => {
      if (product.stock <= 0) {
          outstockWarning(); // Show warning if out of stock
          } else {
          addToCart(product); // Add to cart if in stock
          }
  }


  const fetchProduct = useCallback(() => {
    getSingle()
  })

  useEffect(() => {
    fetchProduct()
  })

  return (
    <div className="container">
        <div className="row mt-4 mb-3">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Product details</h3>
            </div>
        </div>

        <div className="row">
          <div className="col-md-6  mt-2 mb-2">
            <div className="card">
              <div className="card-body">
                {/* start */}
                <div className="carousel slide" data-bs-ride="carousel" id="pro">
                  {/* indicators */}
                  <div className="carousel-indicators">
                    <button type='button' data-bs-target="#pro" data-bs-slide-to="0" className="active"></button>
                    <button type='button' data-bs-target="#pro" data-bs-slide-to="1"></button>
                    <button type='button' data-bs-target="#pro" data-bs-slide-to="2"></button>
                    <button type='button' data-bs-target="#pro" data-bs-slide-to="3"></button>
                    <button type='button' data-bs-target="#pro" data-bs-slide-to="4"></button>
                    <button type='button' data-bs-target="#pro" data-bs-slide-to="5"></button>
                  </div>

                  {/* carousel images */}
                  <div className="carousel-inner" style={{ height: "300px"}}>
                    <div className="carousel-item active">
                      <img src={product.thumbnail} className="d-block w-100" alt="no image found"  style={{height:"300px"}}/>
                    </div>
                    {
                      product.images && product.images.map((item,index) => {
                        return (
                          <div className="carousel-item" key={index}>
                            <img src={item} className="d-block w-100" alt="no image found"/>
                          </div>
                        )
                      })
                    }
                  </div>
                  {/* left and right control  */} 
                  <button className="carousel-control-prev" type='button' data-bs-target='#pro' 
                   data-bs-slide='prev'>
                    <span className="carousel-control-prev-icon text-success" aria-hidden="true"/>
                    <span className="visually-hidden text-success">Previous</span>
                  </button>

                  <button className="carousel-control-next" type='button' data-bs-target='#pro'
                   data-bs-slide='next'>
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              {/* end */}
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-2 mb-2">
            <strong className="text-secondary text-info"> {product.category} </strong>

            <h4 className="display-4 text-success" > {product.title} </h4>

            <div className="mt-2 mb-2">
              <h5 className="text-success"> &#8377; {product.price} </h5>
              <p className="text-warning mt-2 mb-2"> Discount :{product.discountPercentage}% </p>
            </div>

            <h6 className="text-danger">Description</h6>
          <p className="text-secondary text-justify">{product.description} </p>

          <div className="mt-2 mb-2">
            <p className="float-end">
              <strong className="text-primary">Stock</strong>
              <span className='text-success'> {product.stock} items</span>
            </p>
          </div>
          
          <div className="mb-2 mt-2">
            <p className="text-warning"> Rating <strong className="text-success"> 
            {product.rating} </strong> {generateStars(product.rating)}  </p>
          </div>

          <p className="text-info">Brand: <span className="text-dark"> {product.brand} </span></p>

          <div className="mt-2 mb-2">
            <NavLink to={`/products/${product.category}`} className="btn btn-outline-info">
              Similar Products
            </NavLink>

            <button onClick={() => btnChecking(product)} className="btn btn-outline-success 
            float-end"> Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

