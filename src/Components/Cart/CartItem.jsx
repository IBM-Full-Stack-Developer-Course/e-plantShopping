/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem, selectTotalItems, updateQuantity} from '../../features/cart/CartSlice.jsx';
import './CartItem.css';

const CartItem = ({onContinueShopping}) => {
    const cart = useSelector(state => state.cart.items); // Accessing the cart contents from the store
    const totalCartItems = useSelector(selectTotalItems);   // Keeping track of the total number of items
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    // Not the same as totalCartItems, since the same item can be added multiple times,
    // although, come to think of it, the two of them are a bit redundant
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        if (cart.length > 0) {
            console.log("in calculate total, cart is: ", cart);
            cart.forEach(item => {
                totalAmount += parseFloat(item.cost.substring(1)) * item.quantity;
            });
        }
        return totalAmount;

    };

    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };


    const handleIncrement = (item) => {
        dispatch(updateQuantity({name: item.name, newQuantity: item.quantity + 1}));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({name: item.name, newQuantity: item.quantity - 1}));
        } else {
            dispatch(removeItem(item));
        }

    };

    const handleRemove = (item) => {
        dispatch(removeItem(item));
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        const cost = parseFloat(item.cost.substring(1));
        return cost * item.quantity;
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
        console.log('I need to do something about the event for the linter warning to go away, so here it is: ', e);
    };

    return (
        <div className="cart-container">
            <h2 style={{color: 'black'}}>{totalCartItems === 0 ? 'Your Cart is Empty' : `Total Cart Amount: $${calculateTotalAmount()}`}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name}/>
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec"
                                        onClick={() => handleDecrement(item)}>-
                                </button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc"
                                        onClick={() => handleIncrement(item)}>+
                                </button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{marginTop: '20px', color: 'black'}} className='total_cart_amount'></div>
            <div className="cart-buttons-container">
                <button className="cart-button"
                        onClick={(e) => handleContinueShopping(e)}
                >
                    Continue Shopping
                </button>
                <br/>
                <button className="cart-button"
                        disabled={totalCartItems === 0}
                        onClick={(e) => handleCheckoutShopping(e)}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;


