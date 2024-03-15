import React from 'react'
import { useGetAllProductsQuery } from '../features/productApi';

const Home = () => {
  const {data,error,isLoading} = useGetAllProductsQuery();
  return (
    <div className='home-container'>
      {isLoading ? <p>Loading...</p> : error? <p>An error occur...</p>:
      <>
        <h2>New Arrivals</h2>
        <div className='products'>
          {data?.map(product=> <div key={product.id} className='product'>
            <h3>{product.name}</h3>
            {product.image && (
              <img src={`http://localhost:3000${product.image.url}`} alt={`Image of ${product.name}`} />
            )}
            <div className='details'>
              <span>{product.description}</span>
              <span className='price'>{product.price}</span>
            </div>
            <button>Add to Cart</button>
          </div>)}
        </div>
      </>}
    </div>
  )
}

export default Home;