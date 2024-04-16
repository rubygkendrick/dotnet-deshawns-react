import { useParams } from "react-router-dom";
import { getDogDetails } from "./apiManager";
import { useEffect, useState } from "react";

export default function DogDetails()  {

  const [dog, setDog] = useState({})
  const { dogId } = useParams()


  const fetchDogDetails = () => {
    getDogDetails(parseInt(dogId)).then(dogObject => {
      setDog(dogObject)
    })
  }

  useEffect(() => {
   fetchDogDetails()
  }, [])



  return <>
    <div className="dogDetailsContainer">
      <h3>{dog.name} is being walked by {dog.walker?.name} in {dog.city?.name}</h3>
    </div>
  </>

}