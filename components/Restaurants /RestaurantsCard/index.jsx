import React from 'react'
import { get } from 'lodash';
import { ratingIcon } from '../../../assets/Icons';
import './restaurantCard.style.scss'
import { Link } from 'react-router-dom';

const RestaurantsCard = (props) => {
    const { name, cloudinaryImageId, areaName, avgRating, sla, cuisines, aggregatedDiscountInfoV3 } = props
    const bannerImageLink = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`
    return (
        <div className='restaurant-card'>
            <div className='restaurant-card__banner'>
                <img className='restaurant-card__banner__image' src={bannerImageLink} />
                {(get(aggregatedDiscountInfoV3, 'header', '') && get(aggregatedDiscountInfoV3, 'subHeader', '')) && <div className='restaurant-card__banner__imageTitle'>{`${get(aggregatedDiscountInfoV3, 'header', '')} ${get(aggregatedDiscountInfoV3, 'subHeader', '')}`}</div>}
            </div>
            <div className='restaurant-card__additionalInfo'>
                <div className='restaurant-card__additionalInfo__restName'>{name}</div>
                <div className='restaurant-card__additionalInfo__secondaryColumn'>
                    <span className='restaurant-card__additionalInfo__secondaryColumn__icon'>{ratingIcon}</span>
                    <span className='restaurant-card__additionalInfo__secondaryColumn__rating'>{avgRating}</span>
                    <div className='restaurant-card__additionalInfo__secondaryColumn__seprator'></div>
                    <span className='restaurant-card__additionalInfo__secondaryColumn__time'>{get(sla, 'slaString', '')}</span>
                </div>
                <div className='restaurant-card__additionalInfo__cuisine'>{cuisines.join(', ')}</div>
                <div className='restaurant-card__additionalInfo__location'>{areaName}</div>
            </div>
        </div>
    )
}

export default RestaurantsCard
