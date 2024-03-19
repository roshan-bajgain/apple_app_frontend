import React from 'react'
import { useGetAllProductsQuery } from '../features/productApi';
import styles from './Home.css';

const Home = () => {
  const {data,error,isLoading} = useGetAllProductsQuery();
  return (
    <div className='home-container'>
      {isLoading ? <p>Loading...</p> : error? <p>An error occur...</p>:
      <>
        <h2>New Arrivals</h2>
        <div className='products'>
          {data?.map(product=> <div key={product.id} className='product'>
            {product.image && (
              <img src={`http://localhost:3000${product.image.url}`} alt={`Image of ${product.name}`} />
            )}
            <h3>{product.name}</h3>
            <div className='details'>
              {/* <span>{product.description}</span> */}
              <h4 className='price'>Price: {product.price}</h4>
            </div>
            <button className='btn'>Add to Cart</button>
          </div>)}
        </div>
      </>}
    </div>
  )
}

export default Home;