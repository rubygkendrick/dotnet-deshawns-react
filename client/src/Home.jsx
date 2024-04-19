import { Link, useNavigate } from "react-router-dom";
import { getGreeting, getAllDogs, deleteDog } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  const [allDogs, setAllDogs] = useState([])
  const navigate = useNavigate()


  const getAndResetAllDogs = () => {
    getAllDogs().then(dogsArray => {
      setAllDogs(dogsArray)
    })
  }

  useEffect(() => {
    getAndResetAllDogs()
  }, [])


  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  const handleAddADogNavigation = () => 
  {
    navigate("/newDog")
  }

  const handleRemoveDogClick = (event) => {
    deleteDog(event.target.value).then(() => {
      getAndResetAllDogs()
    })
  }

  return <>
    <h1>{greeting.message}</h1>
    <div className="dogListContainer">
      <h2>Current Dogs:</h2>
      {allDogs.map((dog) => {
        return <div className="dogListItem" key={dog.id}>
          <Link to={`/dogs/${dog.id}`}>
            <p>{dog.name}</p>
          </Link>
          <button value={dog.id} onClick={handleRemoveDogClick}>Remove Dog</button>
        </div>
      })}
    </div>
    <div>
      <button onClick={handleAddADogNavigation}>Add a Dog</button>
    </div>
  </>

}
