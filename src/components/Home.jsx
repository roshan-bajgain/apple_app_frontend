import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from '../features/productApi';
import styles from './Home.css';
import { addToCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import Registration from './auth/Registration';
import Login from './auth/Login';

const Home = (props) => {
  const {data,error,isLoading} = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product)=>{
    dispatch(addToCart(product))
    navigate("./Cart"); // Navigate to the Cart page
  }
  const handleSuccessfulAuth = (data) => { // after login it redirect to cartpage 
    props.handleLogin(data);
    navigate('/Cart');
  };

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3000/logout", {withCredentials: true}).then(response=>{
      props.handleLogout();
    }).catch(error=>{
      console.log("logout error", error);
    });
  };

  return (
    <div className='home-container'>
      {isLoading ? <p>Loading...</p> : error? <p>An error occur...</p>:
      <>
      <p>Status: {props.loggedInStatus}</p>
      <button onClick={()=>handleLogoutClick()}>Logout</button>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth}/>
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
            <button className='btn' onClick={()=>handleAddToCart(product)}>Add to Cart</button>
          </div>)}
        </div>
      </>}
    </div>
  )
}

export default Home;