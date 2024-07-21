import '../index.css';

import { Tooltip } from '../components/Tooltip';

import { formatDateToString } from '../utils/dateFormat';
import { getWeatherIcon } from '../utils/getWeatherIcon';

import { FaInfoCircle } from "react-icons/fa";

import windSpeedIcon from '../assets/icons/wind.svg';

interface IWeatherCardProps {
  date: string;
  detailedForecast: string;
  location: string;
  shortForecast: string;
  temperature: number;
  windDirection: string;
  windSpeed: string;
}

export const WeatherCard = ({
    date,
    detailedForecast,
    location,
    shortForecast,
    temperature,
    windDirection,
    windSpeed,
}: IWeatherCardProps) => {
  // Constants
  const icon = getWeatherIcon(shortForecast);
  const formattedDate = formatDateToString(date);

  // Renders
  return (
    <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-8">
        <div className="flex flex-col justify-center items-center gap-2">
            <p className='font-bold text-4xl'>
                {location}
            </p>
            <p className='font-normal text-lg'>
                {formattedDate}
            </p>
            <img
                className="w-36"
                src={icon}
                alt="weather_icon"
            />
            <div className='flex justify-between w-full mt-4'>
                <p className='font-bold text-5xl'>
                    {temperature} &deg;F
                </p>
                <div className="flex flex-col items-center">
                    <p className='text-sm'>
                        Winds {windSpeed}, {windDirection}
                    </p>
                    <img
                        className="w-12"
                        src={windSpeedIcon}
                        alt="wind_speed_icon"
                    />
                </div>
            </div>
        </div>

        <hr className="bg-slate-600 mb-4 mt-4" />

        <div className="flex flex-col items-center">
            <p className='text-base'>
                {shortForecast}
            </p>
            <Tooltip
                icon={<FaInfoCircle className='size-6' />}
                description={detailedForecast}
            />
        </div>
    </div>
  );
}
