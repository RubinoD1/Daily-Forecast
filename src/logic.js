const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");

weatherForm.addEventListener("submit", async event => {
      //prevents page refresh
      event.preventDefault();
      //location is used as a query parameter =?${} value that is passed into the api call
      let location = cityInput.value.trim();

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
              
              console.error(error);
          }

      }
      else {//If no value pass on an error message
          console.log("Please enter a city");
          
      }

});


function weatherToday(data){
  console.log(data, " weather data");
}