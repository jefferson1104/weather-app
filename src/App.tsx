import './index.css';
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

import { useWeatherContext } from "./Contexts/WeatherContext"

import { IWeatherForecast } from "./interfaces/weather-forecast";

import { BackgroundLayout } from "./components/BackgroundLayout";
import { Empty } from './components/Empty';
import { ForecastCard } from "./components/ForecastCard";
import { Loading } from './components/Loading';
import { Tooltip } from './components/Tooltip';
import { WeatherCard } from "./components/WeatherCard";

function App() {
  // Hooks
  const { setAddress, matchedAddress, weatherForecast , searchAddressLoading, weatherForecastLoading } = useWeatherContext();

  // States
  const [inputValue, setInputValue] = useState('');

  // Constants
  const isLoading = searchAddressLoading || weatherForecastLoading;
  const weather = weatherForecast[0];
  const forecastDays = weatherForecast.filter((weather: IWeatherForecast) => weather.number > 2 && weather.number % 2 === 0);

  // Methods
  const submitSearchHandler = () => {
    setAddress(inputValue);
    setInputValue('');
  }

  // Renders
  return (
    <div className="w-full h-screen text-white md:px-8">
      <nav className="w-full p-4 flex flex-col gap-8 justify-between items-center">
        <h1 className="font-bold tracking-wide text-4xl md:text-6xl">Weather App</h1>
          <div className="bg-white w-[20rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
            <FcSearch className='text-black size-6 cursor-pointer' onClick={submitSearchHandler} />
            <input
              className="focus:outline-none w-full text-[#212121] text-lg"
              type="text"
              value={inputValue}
              placeholder='Search an address...'
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  submitSearchHandler();
                }
              }}
            />

          <Tooltip
            icon={<FaInfoCircle className='size-6 text-black' />}
            description="E.g: 2059 Broadway, New York"
          />
          </div>
      </nav>

      <BackgroundLayout />

      {isLoading && (
        <Loading />
      )}

      {weatherForecast.length === 0 && (
        <Empty />
      )}

      <main className="w-full flex flex-wrap gap-24 md:mt-12 items-center justify-center py-4 md:py-10">
        {weather && matchedAddress && (
          <WeatherCard
            date={weather.startTime}
            detailedForecast={weather.detailedForecast}
            location={matchedAddress?.addressComponents.city || ''}
            shortForecast={weather.shortForecast}
            temperature={weather.temperature}
            windDirection={weather.windDirection}
            windSpeed={weather.windSpeed}
          />
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {forecastDays && matchedAddress && forecastDays.map((forecast: IWeatherForecast, index: number) => (
            <ForecastCard
              key={index}
              date={forecast.startTime}
              detailedForecast={forecast.detailedForecast}
              shortForecast={forecast.shortForecast}
              temperature={forecast.temperature}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App
