import React from 'react'
import RestaurantsCard from './RestaurantsCard'
import { get } from 'lodash'
import './restaurants.style.scss'

const Restaurants = (props) => {
    const { data, setCartValue, cartValue } = props
    return (
        <div className='restaurant-component'>
            <div className='restaurant-component__title'>Our top rated restaurants for you</div>
            <div className='restaurant-component__cards'>
                {data.map((_products, index) => {
                    const productDetails = get(_products, 'info', {})
                    return (
                        <RestaurantsCard
                            {...productDetails}
                            key={`${index}-${get(productDetails, 'id', '')}`}
                            setCartValue={setCartValue}
                            cartValue={cartValue}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Restaurants 
