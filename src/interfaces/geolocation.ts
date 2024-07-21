interface ICoordinates {
    x: number;
    y: number;
}

interface IAddressComponents {
    zip: string;
    streetName: string;
    preType: string;
    city: string;
    preDirection: string;
    suffixDirection: string;
    fromAddress: string;
    state: string;
    suffixType: string;
    toAddress: string;
    suffixQualifier: string;
    preQualifier: string;
}

export interface IGeolocation {
    coordinates: ICoordinates;
    matchedAddress: string;
    addressComponents: IAddressComponents;
}
