
import { getAllWalkers, getAllCities, getAllDogs, editDogWalkerId } from "./apiManager";
import { useEffect, useState } from "react";
import "./Index.css"
import { useNavigate } from "react-router-dom";


export default function Walkers() {

    const [allWalkers, setAllWalkers] = useState([])
    const [allCities, setAllCities] = useState([])
    const [selectedCityId, setSelectedCityId] = useState("")
    const [allDogs, setAllDogs] = useState([])
    const [dogIdToUpdate, setDogIdToUpdate] = useState("")
    const [walkerIdToUpdate, setWalkerIdToUpdate] = useState("")
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

    const getAndSetDogs = () => {
        getAllDogs().then(dogArray => {
            setAllDogs(dogArray)
        })
    }

    useEffect(() => {
        getAndResetAllWalkers()
        getAndResetAllCities()
        getAndSetDogs()
    }, [])

    const handleUpdateDogWalker = () => {

        const editedDog = {
            walkerId:parseInt(walkerIdToUpdate), 
        }
        editDogWalkerId(parseInt(dogIdToUpdate), editedDog)
            .then(() => {
                navigate(`/dogs/${parseInt(dogIdToUpdate)}`);
            })
    }



    return <>
        <div className="walkerListContainer">

            <h2>Current Walkers:</h2>
            {
                selectedCityId == "" ?
                    allWalkers.map((walker) => (
                        <div key={walker.id}>
                            <span className="walkerListItem">
                                <p className="walkerItem">{walker.name}</p>
                                <select
                                    className="addDog-input walkerItem"
                                    onChange={(event) => {
                                        const selectedDogId = event.target.value;
                                        setDogIdToUpdate(selectedDogId);
                                        setWalkerIdToUpdate(walker.id)
                                    }}
                                >
                                    <option value="">Add a Dog</option>
                                    {
                                        allDogs.filter((dog) =>
                                            walker.cities?.some(walkerCity => walkerCity.id === dog.cityId) &&
                                            dog.walkerId !== walker.id
                                        )
                                            .map((dog) => (
                                                <option key={dog.id} value={dog.id}>
                                                    {dog.name}
                                                </option>
                                            ))
                                    }
                                    {allDogs.filter((dog) =>
                                        walker.cities?.some(walkerCity => walkerCity.id === dog.cityId) &&
                                        dog.walkerId !== walker.id
                                    ).length === 0 && (
                                            <option disabled>No dogs available</option>
                                        )}
                                </select>
                                <button onClick={handleUpdateDogWalker}>Add Dog</button>

                            </span>
                        </div>
                    )) :
                    allCities.filter((city) => city.id == selectedCityId)
                        .map((city) => (
                            allWalkers.filter((walker) => {
                                return walker.cities?.some(walkerCity => walkerCity.id === city.id);
                            }).map((walker) => (
                                <div className="walkerListItem" key={walker.id}>
                                    <span>
                                        <p>{walker.name}</p>
                                        <select className="addDog-input walkerItem"
                                            onChange={(event) => {
                                                const selectedDogId = event.target.value
                                                setDogIdToUpdate(selectedDogId)
                                                setWalkerIdToUpdate(walker.Id)
                                            }}>
                                            <option value="">Add a Dog</option>
                                            {
                                                allDogs.filter((dog) =>
                                                    walker.cities?.some(walkerCity => walkerCity.id === dog.cityId) &&
                                                    dog.walkerId !== walker.id
                                                )
                                                    .map((dog) => (
                                                        <option key={dog.id} value={dog.id}>
                                                            {dog.name}
                                                        </option>
                                                    ))
                                            }
                                            {allDogs.filter((dog) =>
                                                walker.cities?.some(walkerCity => walkerCity.id === dog.cityId) &&
                                                dog.walkerId !== walker.id
                                            ).length === 0 && (
                                                    <option disabled>No dogs available</option>
                                                )}
                                        </select>
                                        <button onClick={handleUpdateDogWalker}>Add Dog</button>
                                    </span>
                                </div>
                            ))
                        ))
            }
            <select
                className="walkerCity-input"
                value={selectedCityId}
                onChange={(event) => {
                    const newCity = event.target.value;
                    setSelectedCityId(newCity);
                }}
            >
                <option value="">Filter Walker By City</option>
                {allCities.map((city) => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </select>
        </div >
    </>

}
