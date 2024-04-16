
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewDog, getAllCities } from "./apiManager";

export default function AddADog() {
    const navigate = useNavigate()

    const [dogName, setDogName] = useState("")
    const [allCities, setAllCities] = useState([])
    const [dogCity, setDogCity] = useState(0)

    useEffect(() => {
        getAllCities().then(cityArray => {
            setAllCities(cityArray)
        })
    }, [])

    const handleSubmitClick = () => {
        const newDog = {
            name: dogName,
            walkerId: 0,
            cityId: parseInt(dogCity)
        }
        addNewDog(newDog)
        navigate("/")
    }

    return <>
        <div className="dogDetailsContainer">
            <h3>Add a Dog</h3>
            <input className="dog-input"

                placeholder="Dog's Name"
                onChange={(event) => {
        
                    const newDogName = event.target.value
                    setDogName(newDogName)
                }}
            ></input>
            <select
                className="dog-input"
                value={dogCity.city} // Assuming `dogCity.city` is the selected city
                onChange={(event) => {
                    
                    const newDogCity = event.target.value;
                    setDogCity(newDogCity);
                }}
            >
                <option value="">Select a city</option>
                {allCities.map((city) => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </select>

        </div>
        <button onClick={handleSubmitClick}>Submit</button>
    </>

}