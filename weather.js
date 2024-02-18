
const ApiToken = "4ab3115b4bd04d2899c130204243101"
const displayLocationDictionary = {
                            "Name":"name",
                            "Region":"region",
                            "Country":"country",
                            "Latitude":"lat",
                            "Longitude":"lon",
}
const displayCurrentDictionary = {
                            "Temperture (Celsius)": "temp_c",
                            "Humidity": "humidity",
                            "Wind Speed (kph)": "wind_kph",
                            "Feels like (Celsius)": "feelslike_c",
                            "Pressure": "pressure_mb"
                        }
const fetchData = async() => {
    const inputCity = document.getElementById("getCity").value
    const output = document.getElementById("weather-output")
    output.innerHTML = ""
    console.log(inputCity)
    const weta = await fetch("https://api.weatherapi.com/v1/current.json?key="+ ApiToken +"&q="+ inputCity +"&aqi=no")
    .then(res => res.json())
    .then(data=> {
        const locationElement = document.createElement("div")
        locationElement.className = "weather-location"


        Object.keys(displayLocationDictionary).forEach(element => {
            const newElemnt = document.createElement("div")
            newElemnt.innerHTML = element + " : " + data.location[displayLocationDictionary[element]]
            newElemnt.className = "weather-location-element"            
            locationElement.appendChild(newElemnt)
        });
        const currentElement = document.createElement("div")
        currentElement.className = "weather-current"
        Object.keys(displayCurrentDictionary).forEach(element => {
            const newElemnt = document.createElement("div")
            newElemnt.innerHTML = element + " : " + data.current[displayCurrentDictionary[element]]
            newElemnt.className = "weather-current-element"
            currentElement.appendChild(newElemnt)
        });

        const conditionElement = document.createElement("div")
        conditionElement.className = "weather-conditon"
        conditionElement.innerHTML = '<div>'+ data.current.condition.text +'</div><img src="'+data.current.condition.icon+'" alt="'+data.current.condition.text+'"/>'
        const displaydata = document.createElement("div")
        displaydata.className = "weather-data"
        displaydata.appendChild(locationElement)
        displaydata.appendChild(currentElement)

        output.appendChild(conditionElement)
        output.appendChild(displaydata)
        // output.innerHTML = "Temperature: "+data.current.temp_c+"<br>Wind Speed: "+ data.current.wind_kph + "<br> Description: "+ data.current.condition.text +'<img src="'+data.current.condition.icon+'" alt="err">'

    })
}
