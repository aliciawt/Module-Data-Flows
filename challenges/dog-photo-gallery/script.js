const addDog = document.getElementById("add-dog");
const clearDogs = document.getElementById("clear-dogs");
const photoContainer = document.getElementById("photo-container");

const url = `https://dog.ceo/api/breeds/image/random`

const addNewDog = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const list = document.createElement("li");

        const photo = document.createElement("img");
        photo.src = data.message;
        photo.alt = "A random dog photo"

        photoContainer.appendChild(list);
        list.appendChild(photo);
    } catch (err) {
        console.error("Something went wrong:", err);

        let errorMsg = document.getElementById("dog-error-msg");
        if (!errorMsg) {
            errorMsg = document.createElement("p");
            errorMsg.id = "dog-error-msg";
            errorMsg.textContent = "Failed to fetch a doggo :( try again!";
            document.body.appendChild(errorMsg);
        } 
    };
}

function clearExistingDogs () {
    photoContainer.innerHTML = "";
    const oldError = document.getElementById("dog-error-msg");
    if (oldError) oldError.remove();
}

addDog.addEventListener("click", addNewDog);
clearDogs.addEventListener("click", clearExistingDogs);