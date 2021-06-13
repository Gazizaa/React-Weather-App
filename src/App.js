import axios from 'axios';
import moment from 'moment';
import { useState, useEffect} from 'react';
import './App.css';
import icon from './location.png';
import searchIcon from './search.png';

function App() {

  const [value, setValue] = useState('Paris');
  const [city, setCity] = useState({});
  const [cityName, setCityname] = useState('Paris');
  const [latitude, setLatitude] = useState('48.8534');
  const [longitude, setLongitude] = useState('2.3488');


  let getCoordinates = () => {
      value === '' ? alert('Please enter a city name') :
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=cbc896ea328bdf19333c674679f10175`)
          .then(response => {
            setLatitude(response.data[0].lat);
            setLongitude(response.data[0].lon);
            setCityname(response.data[0]);
          })
          .catch(error => {
            console.log(error);
            alert('Wrong city name');
          });
    };

   let getWeather = () => {
      axios.get( `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=cbc896ea328bdf19333c674679f10175&units=metric`)
      .then((response) => {
          setCity(response.data);
    }); 
    setValue('');
  };
   
  useEffect(() => {
    getWeather();
  }, [latitude, longitude]);

  return (    
    <div className="main">
      <div className='today-row'>
            <div className='today-column'>
              <h3>{moment().format('dddd')}</h3>
              <h4>{moment().format('MMMM Do YYYY')}</h4>
              <h4><img src={icon} alt='location-icon'/>{cityName?.name || cityName}</h4>
          </div>
          <div className='today-column-2'>
              <img src={`http://openweathermap.org/img/wn/${city?.current?.weather?.map(x => x.icon)}@2x.png`} alt='icon'/>
              <p>{Math.round(city?.current?.temp)} °C</p>
              <h3>{city?.current?.weather?.map(d => d.main)}</h3>
          </div>
      </div>
      <div className='location-row'>
        <div className='location-details-row'>
            <div>
                <p>FEELS LIKE</p>
                <p>HUMIDITY</p>
                <p>WIND</p>
            </div>
            <div className='location-details-value'>
                <p>{Math.round(city?.current?.feels_like)} °C</p>
                <p>{city?.current?.humidity} %</p>
                <p>{Math.round(city?.current?.wind_speed)} m/s</p>
          </div>
        </div>
        <div className='nextday-row'>
          {
            city?.daily?.slice(2, 6)?.map((day, index) => (
              <div className='nextday-column' key={index}>
                    <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt='icon'/>
                    <p>{moment(day.dt * 1000).format('ddd')}</p>
                    <p className='nextday-row-p'> {Math.round(day?.temp?.day)} °C</p>
              </div>
            ))
          }
        </div>
        <div className='location-column'>
              <input 
                  type='text' 
                  placeholder='Change location' 
                  maxLength='30' 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} 
              />
              <button onClick={getCoordinates}>
                <img src={searchIcon} alt='search-icon'/>
              </button>
        </div>
      </div>
    </div>
  );
};

export default App;
