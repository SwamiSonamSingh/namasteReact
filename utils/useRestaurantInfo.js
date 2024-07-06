import { useEffect, useState } from "react";
import { get } from "lodash";

const useRestaurantInfo = (resId) => {
    const [restaurantsDetails, setRestaurantsDetails]=useState([])
    useEffect(() => {
      fetchData()  
    }, [])
    const fetchData = async  () => {
        try {
            const URL = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.5940947&lng=85.1375645&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTERs`)
            const json = await URL.json();
            console.log(URL, 'dsut5ew46');
            setRestaurantsDetails(get(json, 'data.cards', []))
        } catch (error) {
            <Error/>
        }
    }
    return restaurantsDetails
}

export default useRestaurantInfo;