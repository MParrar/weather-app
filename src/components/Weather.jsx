import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";

const Weather = () => {
    const inputRef = useRef()
    const [wetherData, setWetherData] = useState(false);
    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon
    }
    const search = async (city) => {
        if(!city){
            alert("Enter City name")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WETHER_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            
            if(!response.ok){
                setWetherData(false);
                alert(data.message)
            }
            console.log(data)
            const icon = allIcons[data?.weather[0].icon] || clearIcon
            setWetherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon

            })
        } catch (error) {
            console.log(error);
            setWetherData(false);

        }
    };

    useEffect(() => {
        search('London')
    }, []);
    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search" />
                <img src={searchIcon} alt="search icon" onClick={() => search(inputRef.current.value)} />
            </div>
{      wetherData ? 
            <>
     <img src={wetherData.icon} alt="clear" className="weather-icon" />
            <p className="temperature">{wetherData.temperature}°c</p>
            <p className="location">{wetherData.location}</p>
            <div className="wether-data">
                <div className="col">
                    <img src={humidityIcon} alt="humidity" />
                    <div>
                        <p>{wetherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windIcon} alt="Wind" />
                    <div>
                        <p>{wetherData.windSpeed} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </>
            :
            <>Please write a city name</>
        }
        </div>
    );
};

export default Weather;
