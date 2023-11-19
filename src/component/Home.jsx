import React, { useContext, useState } from 'react'
import Category from '../Helper/Category'
import ProductCard from '../Helper/ProductCard'
import {ProductContext} from '../ProductContext'//typed import
import ReactPaginate from 'react-paginate'


function Home(props) {
  const context = useContext(ProductContext)
  const [categoryData] = context.categoryApi.category || []   //we are wrapped "categoryData" with it in array because the data is in the form of array.
  const [productsData] = context.productApi.products.value || [] //here we write empty array because of whenever we don't have data,it load the empty array.

  // pagination
  const [itemOffset,setItemOffset] = useState(0)

  let endOffset = itemOffset + props.itemsPerPage
  let currentItems = productsData.slice(itemOffset,endOffset);
  let pageCount = Math.ceil(productsData.length / props.itemsPerPage)

  const handleClick = (event) => {
    let newOffset = ( event.selected * props.itemsPerPage ) % productsData.length;
    setItemOffset(newOffset)
  }
  
  return (
    <div className="container">

      <div className="row">
          {
            categoryData.length === 0 ? (
              <div className="col-md-12">
                <div className="row text-center">
                  <h5 className="text-secondary display-5">No Categories Found</h5>
                </div>
              </div>
            ) : (
              <div className="col-md-12 text-center">
                <h5 className="display-5 text-success">Categories</h5>
              </div>
              )
          }
      </div>


        <div className="row">
          {
            categoryData.map((item,index) => {
              return <Category key={index} value={item} />
            })
          }
        </div>

        <div className="row">

          {
            productsData.length === 0 ? (
              <div className="col-md-12">
                <div className="row text-center">
                  <h5 className="text-secondary display-5">No Products Found</h5>
                </div>
              </div>
            ) : (
                    <div className="col-md-12 text-center">
                      <h5 className="display-5 text-success">Featured Products</h5>
                    </div>
                )
          }

        </div>

        <div className="row">
          {
            currentItems && currentItems.map((item,index) => {
              return <ProductCard key={index} {...item} />  //spread operator is used for destructuring the array of objects
            })
          }
        </div>

        <div className="row">
          <div className="col-md-12 mb-4 mt-3">
            <ReactPaginate
                pageCount={pageCount}
                className={`pagination justify-content-center`}
                pageClassName={`page-item`}
                pageLinkClassName={'page-link'}
                activeClassName={'active'}
                activeLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                onPageChange={handleClick}
            />
          </div>
        </div>
    </div>
  )
}

export default Home
