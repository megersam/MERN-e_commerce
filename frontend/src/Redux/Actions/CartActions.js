 import axios from 'axios';
 import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../Constants/CardConstants.js";

 export const addToCart = (id, qty) => async (dispatch, getState)=>{
      
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({

        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.productName,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },

    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

 };

//  Remove items from cart funx exported.

export const removefromcart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
         payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};