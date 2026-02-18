// Elements
const photoEl = document.getElementById("photo");
const thumbsEl = document.getElementById("thumbs");
const conditionsEl = document.getElementById("conditions");
const creditUserEl = document.getElementById("credit-user");
const creditPlatformEl = document.getElementById("credit-platform");
const searchForm = document.getElementById("search");
const searchInput = document.getElementById("search-tf");

// API Keys
const OPENWEATHER_KEY = "de585e0f9abd046af0e003afda70e37f";
const UNSPLASH_KEY = "lVNwI5BPLShd-a39tLuvODNSfPsepxtr4t0O9XgCQb4";

// Default city
let city = "London";

// --------------- Functions ----------------

// Get weather description + temp/humidity/wind from OpenWeather
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${OPENWEATHER_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
    const data = await res.json();
    return {
      description: data.weather[0].description,
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed
    };
  } catch (err) {
    console.error(err);
    conditionsEl.textContent = "Weather not found 😢";
    return null;
  }
}

// Get photos from Unsplash
async function getPhotos(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_KEY}&per_page=10`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Unsplash fetch failed: ${res.status}`);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(err);
    conditionsEl.textContent = "Could not load photos 😢";
    return [];
  }
}

// Render main photo + thumbnails
function renderPhotos(photos) {
  if (!photos.length) {
    photoEl.innerHTML = "No photos found 😢";
    thumbsEl.innerHTML = "";
    creditUserEl.textContent = "";
    creditUserEl.href = "#";
    creditPlatformEl.href = "#";
    return;
  }

  // Main photo
  const main = photos[0];
  photoEl.innerHTML = `<img src="${main.urls.regular}" alt="${main.alt_description}">`;

  // Credits
  creditUserEl.textContent = main.user.name;
  creditUserEl.href = main.user.links.html;
  creditPlatformEl.href = main.links.html;

  // Thumbnails
  thumbsEl.innerHTML = "";
  photos.forEach((p, i) => {
    const img = document.createElement("img");
    img.src = p.urls.thumb;
    img.alt = p.alt_description;
    img.classList.add("thumb");
    if (i === 0) img.classList.add("active");

    img.addEventListener("click", () => {
      // Update main photo
      photoEl.innerHTML = `<img src="${p.urls.regular}" alt="${p.alt_description}">`;

      // Update thumbnails
      document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
      img.classList.add("active");

      // Update credits
      creditUserEl.textContent = p.user.name;
      creditUserEl.href = p.user.links.html;
      creditPlatformEl.href = p.links.html;
    });

    thumbsEl.appendChild(img);
  });
}

// Load city: weather + photos
async function loadCity(city) {
  // UX: clear old content, show loading
  conditionsEl.textContent = "Loading...";
  photoEl.innerHTML = "";
  thumbsEl.innerHTML = "";

  const weather = await getWeather(city);
  if (!weather) return;

  // Show description, temp, humidity, wind
  conditionsEl.textContent = 
    `Weather in ${city}: ${weather.description}, ${weather.temp}°C, Humidity: ${weather.humidity}%, Wind: ${weather.wind} m/s`;

  const photos = await getPhotos(weather.description);
  renderPhotos(photos);
}

// --------------- Event listeners ----------------

// Search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCity = searchInput.value.trim();
  if (!newCity) return;
  city = newCity;
  loadCity(city);
});

// Initial load
loadCity(city);
