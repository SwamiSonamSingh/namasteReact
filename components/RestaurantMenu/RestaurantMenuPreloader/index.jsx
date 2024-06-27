import React from 'react'
import './restaurantMenuPreloader.style.scss'
import { map } from 'lodash'

const RestaurantMenuPreloader = () => {
    return (
        <div className='restaurant-menu-preloader'>
            <div className='restaurant-menu-preloader__heading'></div>
            <div className='restaurant-menu-preloader__info'>
                {map([...Array(4).keys()], (items) => {
                    return (
                        <div
                            key={items}
                            className='restaurant-menu-preloader__info__text'
                        />
                    )
                })}
            </div>
            {map([...Array(10).keys()], (index) => {
                return (
                    <div className='restaurant-menu-preloader__body'>
                        <div className='restaurant-menu-preloader__body__left'>
                            {map([...Array(6).keys()], (items) => {
                                return (
                                    <div
                                        key={items}
                                        className='restaurant-menu-preloader__body__left__title'
                                    />
                                )
                            })}
                        </div>
                        <div className='restaurant-menu-preloader__body__right'></div>
                    </div>
                )
            })}
        </div>
    )
}

export default RestaurantMenuPreloader
