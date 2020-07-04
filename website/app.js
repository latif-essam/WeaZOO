/* Global Variables */
// Credentials Api Weather App
const openWeatherKey = "acd179a0216eba0bf4349dd73c24ebec";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
// Dom Elements
const btn = document.getElementById("generate"); //button to excute async functions to get the weather
const inputFiled = document.getElementById("zip"); //
const feelInput = document.getElementById("feelings"); //
const holder = document.querySelector("#entryHolder"); //container off data
// accesess the view element
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// end Dome elements
// start functions
//
//get json data for the forecast by provide the city name
const getWeatherData = async () => {
  const city = inputFiled.value;
  const urlToFetch = `${weatherUrl}?q=${city}&appid=${openWeatherKey}&units=metric`;
  const response = await fetch(urlToFetch);
  try {
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("jsonresponse", jsonResponse);
      return jsonResponse;
    }
  } catch (e) {
    console.log(e);
  }
};
// send  datato the server with post request--------
const dataToServer = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.log(e);
  }
};
//get data from the server
const dataFromServer = async (url = "") => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();

      console.log(jsonResponse);
      renderForecast(jsonResponse);
    }
  } catch (e) {
    console.log(e);
  }
};
//convert celiceius to kelvin
const kelvinToFahrenheit = (k) => (k * 5 * 9 + 32).toFixed(0);
// get user feeling depend on the current Weather
const feel = (temp) => {
  if (temp >= 30) return "Exhausted, try to drink water and fresh Juice, ";
  if (temp < 30 && temp >= 20) return "Fresh, try to have fun today, ";
  if (temp < 20) return "colder, try to put some clothes, ";
};
//to render weather data to the html page
const renderForecast = (loc) => {
  console.log("data from server", loc);
  //locArr take the user input data Arry of objects that has been saved to the server
  // and display the last data entry to update the Ui, we can delet all the data and keep
  // the last value the user entered . just add .slice(-1)[0] after renderForecast(res.slice(-1)[0])
  // and remove  locArr variable. '') .

  const locArr = loc.slice(-1)[0];
  date.innerHTML = `The time now in ${locArr.userInput} is ${locArr.date}`;
  console.log(locArr.date.year);
  temp.innerHTML = `And the Current Temperature is: ${locArr.temp}`;
  content.innerHTML = `Although your current Feeling is ${locArr.feeling} 
  you should feel ${feel(locArr.temp)} because of the current Tempreature.`;
};

// excute functions
const getWeather = () => {
  getWeatherData()
    .then((data) =>
      dataToServer("/addData", {
        temp: data.main.temp,
        date: d,
        userInput: data.name,
        feeling: feelInput.value,
      })
    )
    .then((res) => renderForecast(res));
};
btn.addEventListener("click", getWeather);
