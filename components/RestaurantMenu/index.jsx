import React, { useEffect, useState } from 'react'
import './restaurantMenu.style.scss'
import { get, isEmpty, isEqual, map, set } from 'lodash'
import { ratingIcon, starIcon, offIcon } from '../../assets/Icons'
import RestaurantMenuPreloader from './RestaurantMenuPreloader'
import { useParams } from 'react-router-dom'

const RestaurantMenu = () => {
    const [restaurants, setRestaurants] = useState([])
    const { resId } = useParams()
    console.log(resId);
    useEffect(() => {
        fetchRestaurants()
    }, [])

    const fetchRestaurants = async () => {
        const URL = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.5940947&lng=85.1375645&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTERs`)
        const json = await URL.json();
        // console.log(json.data.cards);
        setRestaurants(get(json, 'data.cards', []))
    }
    const restaurantDetails = get(restaurants[2], 'card.card.info', {})
    const items = get(restaurants[4], 'groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards', [])
    return (
        isEmpty(restaurants) ? <RestaurantMenuPreloader /> : <div className='restaurants-menu'>
            <div className='restaurants-menu__details'>
                <div className='restaurants-menu__details__name'>{get(restaurantDetails, 'name', '')}</div>
                <div className='restaurants-menu__details__additionalInfo'>
                    <div className='restaurants-menu__details__additionalInfo__heading'>
                        <span className='restaurants-menu__details__additionalInfo__heading__ratingIcon'>{ratingIcon}</span>
                        <span className='restaurants-menu__details__additionalInfo__heading__rating'>{get(restaurantDetails, 'avgRatingString', '')}</span>
                        <span className='restaurants-menu__details__additionalInfo__heading__separator'></span>
                        <span className='restaurants-menu__details__additionalInfo__costForTwo'>{get(restaurantDetails, 'costForTwoMessage', '')}</span>
                    </div>
                    <div className='restaurants-menu__details__additionalInfo__cuisines'>{get(restaurantDetails, 'cuisines', []).join(', ')}</div>
                    <div className='restaurants-menu__details__additionalInfo__endPoint'></div>
                    <div className='restaurants-menu__details__additionalInfo__areaName'>
                        <span className='restaurants-menu__details__additionalInfo__areaName__separator'></span>
                        <span className='restaurants-menu__details__additionalInfo__areaName__title'>Outlet{' '}</span>
                        <span className='restaurants-menu__details__additionalInfo__areaName__subTitle'>{get(restaurantDetails, 'areaName', '')}</span>
                    </div>
                    <div className='restaurants-menu__details__additionalInfo__estimatedDelivery'>
                        <span className='restaurants-menu__details__additionalInfo__estimatedDelivery__separator'></span>
                        <span className='restaurants-menu__details__additionalInfo__estimatedDelivery__title'>{`${get(restaurantDetails, 'sla.minDeliveryTime')} - ${get(restaurantDetails, 'sla.maxDeliveryTime')} mins`}</span>
                    </div>
                </div>
            </div>
            <div className='restaurants-menu__sectionSeparator'></div>
            {isEmpty(items) ? <div className='restaurants-menu__error'>Sorry we have no items for your choice ! ! !</div> : <div className='restaurants-menu__listItems' >
                {map(items, (_items, index) => {
                    const info = get(_items, 'card.info', {})
                    console.log(info);
                    const indicatorClassName = isEqual(get(_items, 'card.info.itemAttribute.vegClassifier', ''), 'VEG') ? 'restaurants-menu__listItems__items__left__indicator--veg' : 'restaurants-menu__listItems__items__left__indicator--nonVeg'
                    return (
                        <div className='restaurants-menu__listItems__items' key={index}>
                            <div className='restaurants-menu__listItems__items__left'>
                                <div className={indicatorClassName}>
                                    <div className={`${indicatorClassName}--outer`}>
                                        <div className={`${indicatorClassName}--outer__inner`}></div>
                                    </div>
                                </div>
                                <div className='restaurants-menu__listItems__items__left__name'>{get(info, 'name', '')}</div>
                                <div className='restaurants-menu__listItems__items__left__priceSection'>
                                    <span className='restaurants-menu__listItems__items__left__priceSection__price'>{!get(info, 'defaultPrice') ? `₹ ${get(info, 'price', 0) / 100}.00` : `₹ ${get(info, 'defaultPrice', 0) / 100}.00`}</span>
                                    <span className='restaurants-menu__listItems__items__left__priceSection__icon'>{offIcon}</span>
                                    <span className='restaurants-menu__listItems__items__left__priceSection__offer'>40% OFF USE TRYNEW</span>
                                </div>
                                {!isEmpty(get(info, 'ratings.aggregatedRating')) && <div className='restaurants-menu__listItems__items__left__ratingSection'>
                                    <span className='restaurants-menu__listItems__items__left__ratingSection__icon'>{starIcon}</span>
                                    <span className='restaurants-menu__listItems__items__left__ratingSection__rating'>{get(info, 'ratings.aggregatedRating.rating', '')}</span>
                                    <span className='restaurants-menu__listItems__items__left__ratingSection__count'>{`(${get(info, 'ratings.aggregatedRating.ratingCountV2', '')})`}</span>
                                </div>}
                                <div className='restaurants-menu__listItems__items__left__description'>{get(info, 'description', '')}</div>
                            </div>
                            <div className='restaurants-menu__listItems__items__right'>
                                <div className='restaurants-menu__listItems__items__right__banner'><img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${get(info, 'imageId', '')}`} /></div>
                                <button className='restaurants-menu__listItems__items__right__action'>ADD</button>
                            </div>
                        </div>
                    )
                })}
            </div>}
        </div>

    )
}

export default RestaurantMenu
