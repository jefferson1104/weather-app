import clearIcon from '../assets/icons/clear.svg';
import cloudIcon from '../assets/icons/cloudy.svg';
import fogIcon from '../assets/icons/fog.svg';
import rainIcon from '../assets/icons/rainy.svg';
import snowIcon from '../assets/icons/snow.svg';
import thunderIcon from '../assets/icons/thunderstorms.svg';
import windIcon from '../assets/icons/wind.svg';
import { TWeatherCondition } from '../interfaces/weather-forecast';

const conditions: Record<TWeatherCondition, string[]> = {
    clear: ['clear', 'sunny', 'sun'],
    cloud: ['cloud', 'overcast'],
    fog: ['fog', 'smoke'],
    rain: ['rain'],
    snow: ['snow'],
    thunder: ['thunder', 'storm'],
    wind: ['wind'],
    default: ['default'],
};

const icons: Record<TWeatherCondition, string> = {
    clear: clearIcon,
    cloud: cloudIcon,
    fog: fogIcon,
    rain: rainIcon,
    snow: snowIcon,
    thunder: thunderIcon,
    wind: windIcon,
    default: 'N/A',
};

export const getWeatherIcon = (shortForecast: string) => {
    const lowerCaseCondition = shortForecast.toLowerCase();

    for (const [condition, keywords] of Object.entries(conditions)) {
        if (keywords.some(keyword => lowerCaseCondition.includes(keyword))) {
            return icons[condition as TWeatherCondition];
        }
    }

    return icons.default;
};
