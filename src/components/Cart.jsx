import React from 'react'
import styles from './Cart.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../features/cartSlice';
import Navbar from './Navbar';

const Cart = (props) => {
  const cart = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTotals());
  },[cart, dispatch]);

  const hanldeRemoveFromCart = (cartItem)=> {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseCart =(cartItem)=> {
    dispatch(decreaseCart(cartItem));
  };

  const hanldeIncrease =(cartItem)=>{
    dispatch(addToCart(cartItem))
  }

  const clearAllCart = ()=> {
    dispatch(clearCart())
  }
  return (
    <div className='cart-container'>
      <Navbar />
      <p className='status'>Status: {props.loggedInStatus}</p>
      <h2 className='shop-cart'>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='start-shopping'>
          <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
          </svg>
          <span>Start Shopping</span>
          </Link>
        </div>  
      ):(<div>
        <div className="titles">
          <h3 className='product-title'>Product</h3>
          <h3 className='prices'>Price</h3>
          <h3 className='Qualtity'>Qualtity</h3>
          <h3 className='total'>Total</h3>
        </div>
        <div className='cart-items'>
          {cart.cartItems?.map(cartItem =>(
            <div className='cart-item' key={cartItem.id}>
              <div className="cart-product">
              <img src={`http://localhost:3000${cartItem.image.url}`} alt={`Image of ${cartItem.name}`} />
                <div className='details'>
                  <h3>{cartItem.name}</h3>
                  <button onClick={()=>hanldeRemoveFromCart(cartItem)}>Remove</button>
                </div>
              </div>
              <div className="cart-product-price">
                Rs.{cartItem.price}
              </div>
              <div className="cart-product-qualtity">
                <button onClick={()=> handleDecreaseCart(cartItem)}>-</button>
                <div className="count">{cartItem.cartQuantity}</div>
                <button onClick={()=> hanldeIncrease(cartItem)}>+</button>
              </div>
              <div className="cart-product-total-price">
                Rs.{cartItem.price * cartItem.cartQuantity}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <button className='clear-cart' onClick={()=> clearAllCart()}>Clear Cart</button>
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Subtotal</span>
              <span className='amount'>Rs.{cart.cartTotalAmount}</span>
            </div>
            <p>Free shipping Available</p>
            <button>Payment</button>
            <div className='continue-shopping'>
              <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
                <span>Continue Shopping</span>
              </Link>
        </div>  
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Cart