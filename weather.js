const root = document.getElementById("root");

const displayData = ({ desc, icon, temp, city }) => {
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const header = document.createElement("h1");
  header.setAttribute("class", "header");
  header.textContent = city;

  const temperature = document.createElement("h2");
  temperature.setAttribute("class", "temperature");
  temperature.innerHTML = temp + " &deg;C";

  const image = document.createElement("img");
  image.setAttribute("class", "image");
  image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  image.alt = "Weather Icon";

  const description = document.createElement("h2");
  description.setAttribute("class", "description");
  description.innerText = desc;

  root.append(header, image, temperature, description);
};

const fetchData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=711903bca253b3f46958d077ddaabcb4`
    );
    const {
      weather: [{ main, icon }],
      main: { temp },
      name,
    } = await response.json();
    return { desc: main, icon, temp: (temp - 273.15).toFixed(2), city: name };
  } catch (error) {}
};

const success = async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const data = await fetchData(latitude, longitude);
  displayData(data);
};

const error = () => {
  root.textContent = "Unable to retrive your location";
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  root.textContent = "Geolocation isn't supported by your browser";
}
