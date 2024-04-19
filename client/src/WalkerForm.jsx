import { useNavigate, useParams } from "react-router-dom";
import { editWalker, getAllCities, getWalkerById } from "./apiManager";
import { useEffect, useState } from "react";

export default function WalkerForm() {

    const [walker, setWalker] = useState({})
    const [allCities, setAllCities] = useState([])
    const [currentWalkerCities, setCurrentWalkerCities] = useState([])
    const [selectedCities, setSelectedCities] = useState([])

    const [walkerName, setWalkerName] = useState("")
    const { walkerId } = useParams()
    const navigate = useNavigate()


    const fetchWalkerDetails = () => {
        getWalkerById(walkerId).then(walkerObject => {
            setWalker(walkerObject)
            setCurrentWalkerCities(walkerObject.cities.map(c => c.id))

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






    const handleCheckBoxChange = (event) => {
        const value = parseInt(event.target.value)
        const isChecked = event.target.checked
        if (!currentWalkerCities) {

            if (isChecked) {
                setSelectedCities([...selectedCities, value])
            } else {
                setSelectedCities(selectedCities.filter(id => id != value))
            }
        } else {
            if (isChecked) {
                setCurrentWalkerCities([...currentWalkerCities, value])
            } else {
                setCurrentWalkerCities(currentWalkerCities.filter(id => id != value))
            }
        }
    }


  
    const handleUpdateWalkerClick = () => {

        const selectedCities = allCities.filter(city => currentWalkerCities.some(cityId => cityId == city.id));

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
                            checked={
                                currentWalkerCities ? currentWalkerCities?.includes(city.id) :
                                    selectedCities.includes(city.id)
                            }
                            onChange={handleCheckBoxChange}

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