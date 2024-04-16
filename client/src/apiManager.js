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


export const getAllCities = async () => {
  const res = await fetch ("/api/cities")
  return res.json()
}

export const getAllWalkers = async () => {
  const res = await fetch ("/api/walkers")
  return res.json();
}