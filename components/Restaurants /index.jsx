import React, { useState } from 'react'
import RestaurantsCard from './RestaurantsCard'
import { get } from 'lodash'
import './restaurants.style.scss'

const Restaurants = (props) => {
    const { data, setCartValue, cartValue } = props
    const [restaurantList, setRestaurantList] = useState(data)
    const handleFilter = () => {
        const filteredData = (data.filter((res) => get(res, 'info.avgRating') > 4))
        setRestaurantList(filteredData)
    }
    
    const handleReset = () => {
        setRestaurantList(data)
    }

    return (
        <div className='restaurant-component'>
            <div className='restaurant-component__title'>Our top rated restaurants for you</div>
            <button className='restaurant-component__button'
                onClick={() => handleFilter()}
            >
                Tap to Filter
            </button>
            <button className='restaurant-component__button'
                onClick={() => handleReset()}
            >
                Reset
            </button>
            <div className='restaurant-component__cards'>
                {restaurantList.map((_products, index) => {
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
