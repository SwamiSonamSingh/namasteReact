import React, { useEffect, useState } from 'react'
import RestaurantsCard from './RestaurantsCard'
import { cloneDeep, get, includes, isEmpty } from 'lodash'
import './restaurants.style.scss'
import RestaurantsCardPreloader from './RestaurantsCardPreloader'
import noData from './noData.png'
import { Link } from 'react-router-dom'

const Restaurants = (props) => {
    const { setCartValue, cartValue } = props
    const [restaurantList, setRestaurantList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [serachKey, setSearchKey] = useState('')
    const [fetching, setFetching] = useState(false)
    const handleFilter = () => {
        const filteredData = (restaurantList.filter((res) => get(res, 'info.avgRating') > 4.5))
        setFilteredList(filteredData)
    }

    const handleReset = () => {
        fetchData()
    }

    const handleSearchInput = (value) => {
        setSearchKey(value)
        const _filteredData = restaurantList.filter((res) => {
            if (includes(res.info.name.toLowerCase(), value.toLowerCase())) {
                return res
            }
        })
        setFilteredList(_filteredData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setFetching(true)
        const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.5940947&lng=85.1375645&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
        setFetching(false)
        const restaurantData = await data.json();
        setRestaurantList(restaurantData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
        setFilteredList(restaurantData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    }

    if (isEmpty(restaurantList) || fetching) {
        return (
            <RestaurantsCardPreloader />
        )
    }
    return (
        <div className='restaurant-component'>
            <input className='restaurant-component__input' placeholder='Type restaurant Name' type='text' value={serachKey} onChange={(event) => handleSearchInput(event.target.value)} />
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
            {isEmpty(filteredList) ? <div className='restaurant-component__noData'><img src={noData} /></div> : <div className='restaurant-component__cards'>
                {filteredList.map((_products ) => {
                    const productDetails = get(_products, 'info', {})
                    return (
                        <Link to={`/restaurants/${get(productDetails, 'id', '')}`} key={get(productDetails, 'id', '')}>
                            <RestaurantsCard
                                {...productDetails}
                                setCartValue={setCartValue}
                                cartValue={cartValue}
                            />
                        </Link>
                    )
                })}
            </div>}

        </div>
    )
}

export default Restaurants 
