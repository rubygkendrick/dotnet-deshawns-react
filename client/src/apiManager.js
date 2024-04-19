export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getAllDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
}

export const getDogDetails = async (dogId) => {
  const res = await fetch(`/api/dogs/${dogId}`);
  return res.json();
}




export const addNewDog = async (newDogObject) => {
  return fetch("/api/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDogObject),
  })
}

export const addNewCity = async (newCityObject) => {
  return fetch("/api/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCityObject),
  })
}

export const editDogWalkerId = async (dogId, dogObject) => {
  return fetch(`/api/dogs/${dogId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogObject),
  }).then((res) => res.json())
}

export const editWalker= async (walkerId, walkerObject) => {
  return fetch(`/api/walkers/${walkerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(walkerObject),
  }).then((res) => res.json())
}



export const getAllCities = async () => {
  const res = await fetch("/api/cities")
  return res.json()
}


export const getAllWalkers = async () => {
  const res = await fetch("/api/walkers")
  return res.json();
}

export const getWalkerById = async (walkerId) => {
  const res = await fetch(`/api/walkers/${walkerId}`);
  return res.json();
}

export const deleteWalker = async (walkerId) => {
  return fetch(`/api/walkerToDelete/${walkerId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
})
}

export const deleteDog = async (dogId) => {
  return fetch(`/api/dogToDelete/${dogId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
})
}