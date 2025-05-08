const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const main = document.querySelector(".card")

weatherForm.addEventListener("submit", async event => {
    //prevents page refresh
    event.preventDefault();
    //location is used as a query parameter =?${} value that is passed into the api call
    let location = cityInput.value.trim();
    //clear search box
    cityInput.value = "";

      if(location){
          try{

              //await response (retriving data)
              const response = await fetch(`/.netlify/functions/fetch-weather?search=${location}`);
      
              //once the response has been resolved we check its staus 
              //if response is NOT okay throw an error message 
       
              //once the response has been resolved we check its staus 
      
              //if response is NOT okay throw an error message 
              if(!response.ok){
      
                  throw new Error("Could not fetch resource");
      
              }
      
              //if response IS okay 
      
              //covert our response to JSON -- Also returns a promise that is why we are using await
              const data = await response.json();
      
              weatherToday(data);
      
          }
      
          catch(error){
              console.log("error");
              //console.error(error);
              errorMessage(error);
          }

      }
      else {//If no value pass on an error message
          //console.log("Please enter a city");
          errorMessage("Enter a city name")
      }

});


function weatherToday(data){

  const {
    name: name,
    main: {temp, feels_like, humidity},
    weather: [{description, icon}],
    wind: {speed}
  } = data;

// if weather card already exists the empty string will reset it 
main.textContent = "";
// make main card visible by removing display: none property 
main.style.display = "flex";

//create child elements that willl display weather values 
const cityInfo = document.createElement("h1");
const tempInfo = document.createElement("p");
const feelsLikeInfo = document.createElement("p");
const humidityInfo = document.createElement("p");  
const windInfo = document.createElement("p");  
const descDisplayInfo = document.createElement("p");  
const weatherIconInfo = document.createElement("img");

//set created elements text content 
cityInfo.textContent = name;
tempInfo.textContent = `${temp}°F`;
feelsLikeInfo.textContent = `Feels Like: ${feels_like}°F`;
humidityInfo.textContent = `Humidity: ${humidity}%`;
windInfo.textContent = `Wind Speed: ${speed} mph`;
descDisplayInfo.textContent = description;
// weather icon src
weatherIconInfo.src = `./assets/images/icons/${icon}.svg`;
// Weather icon alt
weatherIconInfo.alt = `${description} weather icon`;

//add CSS classes to elements 
cityInfo.classList.add("cityName");
tempInfo.classList.add("temp");
feelsLikeInfo.classList.add("feelsLike");
humidityInfo.classList.add("humidity");
windInfo.classList.add("wind");
descDisplayInfo.classList.add("descDisplay");
weatherIconInfo.classList.add("weatherIcon");

// append child elements to parent 
main.appendChild(cityInfo);
main.appendChild(tempInfo);
main.appendChild(feelsLikeInfo);
main.appendChild(humidityInfo);
main.appendChild(windInfo);
main.appendChild(descDisplayInfo);
main.appendChild(weatherIconInfo);

}

// display error message
function errorMessage(message){
     
    const errorDisplay = document.createElement("p");
   
    errorDisplay.textContent = message;

    errorDisplay.classList.add("errorMessage");



    main.textContent = "";
    //display is set to none the flex property will display the card with the error message
    main.style.display = "flex";

    main.appendChild(errorDisplay);
}