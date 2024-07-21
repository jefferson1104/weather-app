interface IProbabilityOfPrecipitation {
    unitCode: string;
    value?: string | number;
}

export interface IWeatherForecast {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: string;
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
    probabilityOfPrecipitation: IProbabilityOfPrecipitation;
}

export type TWeatherCondition = 'clear' | 'cloud' | 'fog' | 'rain' | 'snow' | 'thunder' | 'wind' | 'default';
