import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import './App.css';
import icon from './location.png';
import searchIcon from './search.png'

function App() {

  const [value, setValue] = useState('Paris');
  const [city, setCity] = useState({});

   let getWeather = () => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=cbc896ea328bdf19333c674679f10175&units=metric`)
        .then((response) => {
          setCity(response.data);
    });
    setValue('')  ;  
  };

  useEffect(() => {
    console.log('useEffect');
    getWeather();
  }, []);

 

  return (    
    <div className="main">
      <div className='today-row'>
             <div className='today-column'>
              <h3>{moment().format('dddd')}</h3>
              <h4>{moment().format('MMMM Do YYYY')}</h4>
              <h4><img src={icon} alt='location-icon'/>{city.name}</h4>
          </div>
          <div className='today-column-2'>
              <img src={`http://openweathermap.org/img/wn/${city?.weather?.map(x => x.icon)}@2x.png`} alt='icon'/>
              <p>{Math.round(city?.main?.temp)} °C</p>
              <h3>{city.weather?.map(d => d.main)}</h3>
          </div>
      </div>
      <div className='location-row'>
        <div className='location-details-row'>
            <div>
                <p>FEELS LIKE</p>
                <p>HUMIDITY</p>
                <p>WIND</p>
            </div>
            <div className='p'>
                <p>{Math.round(city?.main?.feels_like)} °C</p>
                <p>{city?.main?.humidity} %</p>
                <p>{Math.round(city?.wind?.speed)} km/h</p>
          </div>
        </div>
        <div className='nextday-row'>
              <div className='div1'>
                  <img src='http://openweathermap.org/img/wn/10d@2x.png' alt='icon'/>
                  <p>Tue</p>
                  <p className='nextday-row-p'> 30 °C</p>
              </div>
               <div className='div2'>
                  <img src='http://openweathermap.org/img/wn/10d@2x.png' alt='icon'/>
                  <p>Tue</p>
                  <p className='nextday-row-p'> 30 °C</p>
              </div>
               <div className='div2'>
                  <img src='http://openweathermap.org/img/wn/10d@2x.png' alt='icon'/>
                  <p>Tue</p>
                  <p className='nextday-row-p'> 30 °C</p>
              </div>
               <div className='div2'>
                  <img src='http://openweathermap.org/img/wn/10d@2x.png' alt='icon'/>
                  <p>Tue</p>
                  <p className='nextday-row-p'> 30 °C</p>
              </div>
        </div>
        <div className='location-column'>
              <input 
                  type='text' 
                  placeholder='Change location' 
                  maxLength='30' 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} 
              />
              <button onClick={getWeather}>
                <img  src={searchIcon} alt='search-icon'/>
              </button>
                  {/*onKeyPress={(e) => {handleKeyDown(e)}}*/}
        </div>
      </div>
    </div>
  );
}

export default App;
