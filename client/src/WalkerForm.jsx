import { useNavigate, useParams } from "react-router-dom";
import { editWalker, getAllCities, getWalkerById } from "./apiManager";
import { useEffect, useState } from "react";

export default function WalkerForm() {

    const [walker, setWalker] = useState({})
    const [allCities, setAllCities] = useState([])
    const [walkerCities, setWalkerCities] = useState([])
    const [cityCheckboxes, setCityCheckboxes] = useState([])
    const [walkerName, setWalkerName] = useState("")
    const { walkerId } = useParams()
    const navigate = useNavigate()


    const fetchWalkerDetails = () => {
        getWalkerById(walkerId).then(walkerObject => {
            setWalker(walkerObject)
        })
    }

    const fetchAllCities = () => {
        getAllCities().then(cityArray => {
            setAllCities(cityArray)
        })
    }
   
    useEffect(() => {
        fetchWalkerDetails()
        fetchAllCities() 
        
    }, [])
 
 




    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setCityCheckboxes((prevState) => {
            // Check if the city already exists in the state array
            const index = prevState.findIndex((city) => city.value == value);
            // If the city exists, update its checked value
            if (index !== -1) {
                const updatedCityCheckboxes = [...prevState];
                updatedCityCheckboxes[index] = { value, checked };
                return updatedCityCheckboxes;
            }
            // If the city doesn't exist, add it to the state array
            return [...prevState, { value, checked }];
        });

    };

    

    const handleUpdateWalkerClick = () => {

        const selectedCities = allCities.filter(city => cityCheckboxes.some(checkbox => checkbox.value == city.id))

        const editedWalker = {
            name: walkerName,
            cities: selectedCities,
        }
        editWalker(walkerId, editedWalker)
            .then(() => {
                navigate(`/walkers`);
            })
    }


    return <>
        <div className="walkerFormContainer">
            <h3>
                Edit Walker Profile:
            </h3>
            <input className="profile-input"

                placeholder={walker.name}
                onChange={(event) => {
                    setWalkerName(event.target.value)
                }}
            ></input>

            <div className="city-checkboxes">
                {allCities.map(city => (
                    <label key={city.id} >
                        <input className="city-checkbox"
                            type="checkbox"
                            value={city.id}
                            checked={cityCheckboxes.checked}
                            onChange={handleCheckboxChange}

                        >
                        </input>
                        {city.name}
                    </label>
                ))}
            </div>
            <button onClick={handleUpdateWalkerClick}>Update Walker</button>
        </div>
    </>

}