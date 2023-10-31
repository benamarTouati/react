import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [forecastIndex, setForecastIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        function success(pos) {
            const crd = pos.coords;
            setLocation({
                latitude: crd.latitude,
                longitude: crd.longitude,
                accuracy: crd.accuracy
            });

            // Appeler l'API météo avec les coordonnées obtenues
            getWeather(crd.latitude, crd.longitude);
        }

        function error(err) {
            setLocationError(`ERREUR (${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);

    // Fonction pour appeler l'API météo avec latitude et longitude
    function getWeather(lat, lon) {
        setLoading(true);

        // API météo actuelle
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e9b99aa5f0e681abeab9e95edb932b81`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                setCurrentWeather(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });

        // API prévisions météo
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e9b99aa5f0e681abeab9e95edb932b81`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                setForecast(data.list);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }

    const prevForecast = () => {
        setForecastIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 3 : prevIndex));
    };

    const nextForecast = () => {
        setForecastIndex((prevIndex) => (prevIndex + 3 < forecast?.length ? prevIndex + 3 : prevIndex));
    };

    if (loading) return <div className="phone">Chargement...</div>;
    if (error) return <div className="phone">Erreur: {error}</div>;

    return (
        <div className="phone">
            <div className="phone-header"></div>
            <div className="weather-container">
                <div className="current-weather">
                    <h1>{currentWeather.name}</h1>
                    {currentWeather && (
                        <div>
                            <p>{Math.round(currentWeather.main.temp - 273.15)}°C</p>
                            <p>{currentWeather.weather[0].description}</p>
                            <img src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} alt="Weather icon" />
                        </div>
                    )}
                </div>

                <h3>Prévisions Météo sur 5 Jours</h3>

                <div className="navigation-buttons">
                    <button className="navigation-button" onClick={prevForecast}>&lt;</button>
                    <button className="navigation-button" onClick={nextForecast}>&gt;</button>
                </div>

                <div className="forecast-container">
                    {forecast && forecast.slice(forecastIndex, forecastIndex + 3).map((item, index) => {
                        const date = new Date(item.dt * 1000);
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');

                        return (
                            <div key={index} className="forecast-item">
                                <p>{`${day}/${month}`}</p>
                                <p>{`${hours}h${minutes}`}</p>
                                <p>{Math.round(item.main.temp - 273.15)}°C</p>
                                <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="Weather icon" />
                            </div>
                        );
                    })}
                </div>
                <div className="phone-footer"></div>
            </div>
        </div>
    );
}

export default App;
