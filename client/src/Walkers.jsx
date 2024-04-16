import { useNavigate } from "react-router-dom";
import { getAllWalkers, getAllCities } from "./apiManager";
import { useEffect, useState } from "react";

export default function Walkers() {

    const [allWalkers, setAllWalkers] = useState([])
    const [allCities, setAllCities] = useState([])
    const navigate = useNavigate()


    const getAndResetAllWalkers = () => {
        getAllWalkers().then(walkersArray => {
            setAllWalkers(walkersArray)
        })
    }

    const getAndResetAllCities = () => {
        getAllCities().then(citiesArray => {
            setAllCities(citiesArray)
        })
    }

    useEffect(() => {
        getAndResetAllWalkers()
        getAndResetAllCities()
    }, [])


    return <>
        <div className="walkerListContainer">
           
            <h2>Current Walkers:</h2>
            {allWalkers.map((walker) => {
                return <div className="walkerListItem" key={walker.id}>
                    <p>{walker.name}</p>
                </div>
            })}
             <select
                className="walkerCity-input"
                value={0}
            >
                <option value="">Filter Walker By City</option>
                {allCities.map((city) => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </select>
        </div>
    </>

}
