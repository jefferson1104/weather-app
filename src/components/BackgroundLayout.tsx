import { useEffect, useState } from 'react';
import { useWeatherContext } from '../Contexts/WeatherContext';

import Clear from '../assets/images/weather/Clear.jpg';
import Fog from '../assets/images/weather/Fog.png';
import Cloudy from '../assets/images/weather/Cloudy.jpg';
import Rainy from '../assets/images/weather/Rainy.jpg';
import Snow from '../assets/images/weather/Snow.jpg';
import Stormy from '../assets/images/weather/Stormy.jpg';
import Sunny from '../assets/images/weather/Sunny.jpg';
import Default from '../assets/images/weather/default.jpg';

type TWeatherConditions = 'clear' | 'cloud' | 'overcast' | 'rain' | 'shower' | 'snow' | 'sunny' | 'fog' | 'thunder' | 'storm';

export const BackgroundLayout = () => {
    // Hooks
    const { weatherForecast } = useWeatherContext();

    // States
    const [image, setImage] = useState(Clear);

    // Constants
    const weather = weatherForecast[0];
    const backgrounds: Record<TWeatherConditions, string> = {
        clear: Clear,
        cloud: Cloudy,
        overcast: Cloudy,
        rain: Rainy,
        shower: Rainy,
        snow: Snow,
        sunny: Sunny,
        fog: Fog,
        thunder: Stormy,
        storm: Stormy,
    };

    // Effects
    useEffect(() => {
        if (weather && weather.shortForecast) {
            const forecast = weather.shortForecast.toLowerCase();
            const matchingImage = Object.keys(backgrounds).find((key) => forecast.includes(key)) as TWeatherConditions | undefined;

            setImage(matchingImage ? backgrounds[matchingImage] : Clear);
        } else {
            setImage(Default);
        }
    }, [weather]);

    // useEffect(() => {
    //     if (weather.shortForecast) {
    //         // eslint-disable-next-line prefer-const
    //         let imageString = weather.shortForecast;

    //         if (imageString.toLowerCase().includes('clear')) {
    //             setImage(Clear);
    //         } else if (imageString.toLowerCase().includes('cloud') || imageString.toLowerCase().includes('overcast')) {
    //             setImage(Cloudy);
    //         } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
    //             setImage(Rainy);
    //         } else if (imageString.toLowerCase().includes('snow')) {
    //             setImage(Snow);
    //         } else if (imageString.toLowerCase().includes('sunny')) {
    //             setImage(Sunny);
    //         } else if (imageString.toLowerCase().includes('fog')) {
    //             setImage(Fog);
    //         } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
    //             setImage(Stormy);
    //         }
    //     }
    // }, [weather]);

    // Renders
    return (
        <img
            className="h-screen w-full fixed left-0 top-0 -z-[10] brightness-[.55]"
            src={image}
            alt="weather_image"
        />
    );
}
