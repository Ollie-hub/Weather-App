import { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import style from './app.module.scss';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if(e.key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
    }
  }

  return (
    <div className={style.maincontainer}>
    <h1>Weather App</h1>
    <label htmlFor="keyword">Indtast bynavn</label>
    <input type="text" id="keyword" className="search" placeholder="Søg..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}></input>

    {weather.main && (
      <div className={style.city}>
        <h2 className={style.cityname}>
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
        </h2>
        <div className={style.citytemp}>
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
        </div>
        <div className={style.info}>
            <img className={style.cityicon} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>            
            <p className={style.weathertype}>{weather.weather[0].description}</p>
        </div>
      </div>

    )

    }    
    </div>
  );
}

export default App;