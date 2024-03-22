import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [],
    cartTotalQualtity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (item)=> item.id === action.payload.id
            );
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increase ${action.payload.name} cart quantity`,{
                    position: "bottom-left"
                })
            } else {
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct); //push(product) but we are getting product form action.payload
                toast.success(`${action.payload.name} is added to cart`,{
                    position: "bottom-left"
                })
            }   
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} is removed from cart`,{
                position: "bottom-left"
            })
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                cartItem=> cartItem.id === action.payload.id
            )
            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info(`Decrease ${action.payload.name} cart Quantity`,{
                    position: "bottom-left"
                });
            } else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.name} is removed from cart`,{
                    position: "bottom-left"
                })
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        clearCart(state, action){
            state.cartItems = [];
            toast.error(`All the cart is cleared`,{
                position: "bottom-left"
            })
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        getTotals(state, action){
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {price, cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;
                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal;
            }, 
            {
                total: 0,
                quantity: 0
            });
            state.cartTotalQualtity = quantity;
            state.cartTotalAmount = total;
        }
    },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;