import { Link } from "react-router-dom";
import { getAllDogs } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
    
  const [allDogs, setAllDogs] = useState([])


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

  return <>
    <h1>{greeting.message}</h1>
    <div className="dogListContainer">
      <h2>Current Dogs:</h2>
      {allDogs.map((dog) => {
        return <div className="dogListItem" key={dog.id}>
          <Link to={`/dogs/${dog.id}`}>
            <p>{dog.name}</p>
          </Link>
        </div>
      })}
    </div>
  </>

}