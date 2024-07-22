import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

import { IGeolocation } from '../interfaces/geolocation';
import { IWeatherForecast } from '../interfaces/weather-forecast';

// Interfaces
interface IWeatherContext {
    address: string;
    setAddress: (value: string) => void;
    searchAddressLoading: boolean;
    matchedAddress: IGeolocation | null;
    weatherForecastLoading: boolean;
    weatherForecast: IWeatherForecast[];
}

// Context
const WeatherContext = createContext<IWeatherContext>({} as IWeatherContext);

// Provider
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
    // States
    const [address, setAddress] = useState('');
    const [searchAddressLoading, setSearchAddressLoading] = useState(false);
    const [matchedAddress, setMatchedAddress] = useState<IGeolocation | null>(null);
    const [weatherForecastLoading, setWeatherForecastLoading] = useState(false);
    const [weatherForecast, setWeatherForecast] = useState<IWeatherForecast[]>([]);

    // Methods
    const fetchGeoLocation = async () => {
        const isProduction = import.meta.env.PROD;
        console.log('isProduction: ', isProduction);

        const options = {
            method: 'GET',
            url: '/api/geocoder/locations/onelineaddress',
            params: {
                address,
                benchmark: 'Public_AR_Current',
                vintage: 'Current_Current',
                format: 'json'
            },
        };

        const prodOptions = {
            method: 'GET',
            url: '/.netlify/functions/geocode',
            params: {
              address,
            },
          };

        try {
            setSearchAddressLoading(true);
            const response = await axios.request(isProduction ? prodOptions : options);
            const data = response.data.result.addressMatches[0] as IGeolocation;

            if (!data) {
                alert('This place does not exist. Please try again');
                setMatchedAddress(null);
                return;
            }

            setMatchedAddress(data);
        } catch (error) {
            console.error('fetchGeoLocation() Error: ', error);
        } finally{
            setSearchAddressLoading(false);
        }
    };

    const fetchWeatherForecast = async () => {
        const options = {
            method: 'GET',
            url: `https://api.weather.gov/points/${matchedAddress?.coordinates.y},${matchedAddress?.coordinates.x}`,
        };

        try {
            setWeatherForecastLoading(true);
            const response = await axios.request(options);
            if (response.status !== 200) {
                throw new Error(`Failed to fetch forecast point data. Status: ${response.status}`);
            }

            const forecastUrl = response.data.properties.forecast;
            const forecastResponse = await axios.get(forecastUrl);
            if (forecastResponse.status !== 200) {
                throw new Error(`Failed to fetch weather forecast. Status: ${forecastResponse.status}`);
            }

            setWeatherForecast(forecastResponse.data.properties.periods);
        } catch (error) {
            console.error('fetchWeatherForecast() Error: ', error);
        } finally {
            setWeatherForecastLoading(false);
        }
    };

    // Effects
    useEffect(() => {
        if(!address) return;
        fetchGeoLocation();
    }, [address]);

    useEffect(() => {
        if(!matchedAddress) return;
        fetchWeatherForecast();
    }, [matchedAddress]);

    // Renders
    return (
        <WeatherContext.Provider value={{ address, setAddress, searchAddressLoading, matchedAddress, weatherForecast, weatherForecastLoading }}>
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeatherContext = () => useContext(WeatherContext);
