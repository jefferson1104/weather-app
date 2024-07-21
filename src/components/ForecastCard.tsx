import { getWeatherIcon } from '../utils/getWeatherIcon';
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip } from './Tooltip';

interface IForecastCardProps {
    date: string;
    detailedForecast: string;
    shortForecast: string;
    temperature: number;
}

export const ForecastCard = ({
    date,
    detailedForecast,
    shortForecast,
    temperature,
}: IForecastCardProps) => {
    // Constants
    const icon = getWeatherIcon(shortForecast);

    // Renders
    return (
        <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
            <div className="flex items-center justify-center gap-1">
                <p className="text-center">
                    {new Date(date).toLocaleTimeString('en', {weekday: 'long'}).split(" ")[0]}
                </p>
                <Tooltip
                    icon={<FaInfoCircle className='size-' />}
                    description={detailedForecast}
                />
            </div>

            <hr />
            <div className="w-full flex flex-1 justify-center items-center">
                <img
                className="w-[4rem] h-[4rem]"
                src={icon}
                alt="weather"
                />
            </div>

            <p className="text-center font-bold">
                {temperature} &deg;F
            </p>
        </div>
    )
}
