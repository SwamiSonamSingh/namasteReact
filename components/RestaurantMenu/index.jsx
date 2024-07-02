import React, { useEffect, useState } from 'react'
import './restaurantMenu.style.scss'
import { find, get, isEmpty, isEqual, map, reverse, set } from 'lodash'
import { ratingIcon, starIcon, offIcon } from '../../assets/Icons'
import RestaurantMenuPreloader from './RestaurantMenuPreloader'
import { Link, useParams } from 'react-router-dom'

const RestaurantMenu = () => {
    const [restaurants, setRestaurants] = useState([])
    const { resId } = useParams()
    useEffect(() => {
        fetchRestaurants()
    }, [])

    const fetchRestaurants = async () => {
        try {
            const URL = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.5940947&lng=85.1375645&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTERs`)
            const json = await URL.json();
            setRestaurants(get(json, 'data.cards', []))
        } catch (error) {
            <Error/>
        }
    }
    const restaurantDetails = get(restaurants[2], 'card.card.info', {})
    const items = get(restaurants[4], 'groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards', [])
    
    const RestaurantCardsView = (props) => {
        const {info, indicatorClassName,index}=props
        const [length, setLength] = useState(100)
        const [count, setCount] = useState(0)
        const [toggleMore, setToggleMore]=useState(true)
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
                    <div className='restaurants-menu__listItems__items__left__description'>{get(info, 'description', '').slice(0, length)} {toggleMore && <span onClick={() => { setLength(get(info, 'description', '').length), setToggleMore(false) }} className='restaurants-menu__listItems__items__left__description__showMore'>...more</span>}</div>
            </div>
            <div className='restaurants-menu__listItems__items__right'>
                <div className='restaurants-menu__listItems__items__right__banner'><img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${get(info, 'imageId', '')}`} /></div>
                <button className='restaurants-menu__listItems__items__right__action'>{isEqual(count, 0) ? <span className='restaurants-menu__listItems__items__right__action__text' onClick={() => setCount((prev)=> prev + 1)}>ADD</span> : <div className='restaurants-menu__listItems__items__right__action__count'><div className='restaurants-menu__listItems__items__right__action__count__minus' onClick={() => setCount((prev)=> prev - 1)}>-</div><div className='restaurants-menu__listItems__items__right__action__count__value'>{count}</div><div className='restaurants-menu__listItems__items__right__action__count__plus' onClick={() => setCount((prev)=> prev + 1)}>+</div></div>}</button>
            </div>
        </div>
        )
    }

    return (
        isEmpty(restaurants) ? <RestaurantMenuPreloader /> : <div className='restaurants-menu'>
            <Link to='/'><div className='restaurants-menu__back'>{'<'}</div></Link>
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
                    const indicatorClassName = isEqual(get(_items, 'card.info.itemAttribute.vegClassifier', ''), 'VEG') ? 'restaurants-menu__listItems__items__left__indicator--veg' : 'restaurants-menu__listItems__items__left__indicator--nonVeg'
                    return (
                        <RestaurantCardsView
                            info={info}
                            indicatorClassName={indicatorClassName}
                            index={index}
                        />
                    )
                })}
            </div>}
        </div>

    )
}

export default RestaurantMenu
