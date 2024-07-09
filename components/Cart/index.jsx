import { find, get, isEmpty, map } from 'lodash';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../utils/cartSlice';
import './cart.style.scss'
import { Link } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items)
    const dispatch = useDispatch()
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    let total = 0
    let resId =''
    {
        map(cartItems, (_items) => {
            total = parseInt(total) + parseInt(_items.price)
            resId=_items.resId
        })
    }
    return (
        <div className='cart-item'>
            {!isEmpty(cartItems)&&<div className='cart-item__heading'>
                <div className='cart-item__heading__text'>Order Summary</div>
                {!isEmpty(cartItems) && <button
                    className='cart-item__heading__button'
                    onClick={handleClearCart}
                >Clear Cart
                </button>}
            </div>}
            <div className='cart-item__container'>
                {isEmpty(cartItems) ?
                    <div className='cart-item__container__noData'>
                        <img className='cart-item__container__noData__image' src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0'} />
                        <div className='cart-item__container__noData__text'>Your cart is empty</div>
                    </div> :
                    <div className='cart-item__container__body'>
                        {map(cartItems, (_items, index) => {
                            return (
                                <div className='cart-item__container__body__items' key={index}>
                                    <div className='cart-item__container__body__items__left'>
                                        <div className='cart-item__container__body__items__left__name'>{get(_items, 'name', '')}</div>
                                        <div className='cart-item__container__body__items__left__quantity'>{`Quantity: ${get(_items, 'quantity', 1)}`}</div>
                                    </div>
                                    <div className='cart-item__container__body__items__right'>
                                        <img className='cart-item__container__body__items__right__image' src={get(_items, 'image', '')} />
                                        <div className='cart-item__container__body__items__right__price'>{`₹ ${get(_items, 'price', '')}`}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                {!isEmpty(cartItems) && <div className='cart-item__container__bill'>
                    <div className='cart-item__container__bill__content'>
                        <span>Item Cost</span>
                        <span className='cart-item__container__bill__content__price'>{`₹ ${Number(total).toFixed(2)}`}</span>
                    </div>
                    <div className='cart-item__container__bill__content'>
                        <span>GST ( 18% )</span>
                        <span className='cart-item__container__bill__content__price'>{`₹ ${Number(total * 0.18).toFixed(2)}`}</span>
                    </div>
                    <div className='cart-item__container__bill__content'>
                        <span>SGST ( 12% )</span>
                        <span className='cart-item__container__bill__content__price'>{`₹ ${Number(total * 0.12).toFixed(2)}`}</span>
                    </div>
                    <div className='cart-item__container__bill__content'>
                        <span>Restaurant Charge</span>
                        <span className='cart-item__container__bill__content__price'>{'₹ 56.00'}</span>
                    </div>
                    <div className='cart-item__container__bill__content'>
                        <span>Delivery Charge</span>
                        <span className='cart-item__container__bill__content__price'>{'₹ 19.00'}</span>
                    </div>
                    <div className='cart-item__container__bill__content'>
                        <span>Total Payable Amount</span>
                        <span className='cart-item__container__bill__content__price'>{`₹ ${parseInt(Number(total).toFixed(2)) + parseInt(Number(total * 0.18).toFixed(2)) + parseInt(Number(total * 0.12).toFixed(2)) + 56 + 19}`}</span>
                    </div>
                    <div className='cart-item__container__bill__buttons'>
                        <Link to={`/restaurants/${resId}`}><button className='cart-item__container__bill__buttons__back'>Back To Add Item</button></Link>
                        <button className='cart-item__container__bill__buttons__payment'>Procced To Payment</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Cart
