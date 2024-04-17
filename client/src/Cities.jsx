import { addNewCity, getAllCities } from "./apiManager";
import { useEffect, useState } from "react";

export default function Cities() {

    const [allCities, setAllCities] = useState([])
    const [newCityName, setNewCityName] = useState("")


    const getAndResetAllCities = () => {
        getAllCities().then(citiesArray => {
            setAllCities(citiesArray)
        })
    }

    useEffect(() => {
        getAndResetAllCities()
    }, [])

    const handleSubmitClick = () => {
        const newCity = {
            name: newCityName,
        }
        addNewCity(newCity).then(() => {
            setNewCityName("")
            getAndResetAllCities()
        })
    }

    return <>
        <div className="cityListContainer">
            <h2>Current Cities:</h2>
            {
                allCities.map((city) => (
                    <div className="walkerListItem" key={city.id}>
                        <p>{city.name}</p>
                    </div>
                ))
            }
        </div >
        <div className="cityAddContainer">
            <h3>Add a City</h3>
            <input className="city-input"
                placeholder={newCityName === "" ? "City Name" : newCityName}
               value={newCityName} 
                onChange={(event) => { 
                    setNewCityName(event.target.value)
                }}
            ></input>
            <button onClick={handleSubmitClick}>Submit</button>
        </div>
    </>

}
