import { map } from 'lodash'
import React from 'react'
import './restaurantsCardPreloader.style.scss'

const RestaurantsCardPreloader = () => {
    return (
        <div className='restaurant-card-preloader'>
            <div className='restaurant-card-preloader__heading'></div>
            <div className='restaurant-card-preloader__actions'>
                {map([...Array(2).keys()], (items) => {
                    return (
                        <div
                            key={items}
                            className='restaurant-card-preloader__actions__button'
                        />
                    )
                })}
            </div>
            <div className='restaurant-card-preloader__restaurants'>
                {map([...Array(12).keys()], (items) => {
                    return (
                        <div
                            key={items}
                            className='restaurant-card-preloader__restaurants__cards'
                        >
                            <div className='restaurant-card-preloader__restaurants__cards__banner'></div>
                            {map([...Array(4).keys()], (cardContent) => {
                                return (
                                    <div
                                        key={cardContent}
                                        className='restaurant-card-preloader__restaurants__cards__cardContent'
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RestaurantsCardPreloader
