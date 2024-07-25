// import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";
import { Placemark, Map, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import React from "react";

interface IProp {
    coordinates: Array<number>;
}


const LocationMap: React.FC<IProp> = ({ coordinates }: IProp) => {

    return (
        <YMaps>
            <Map style={{ width: "100%", height: "220px" }} defaultState={{ center: coordinates, zoom: 16.3 }} instanceRef={(ref: any) => { ref && ref.behaviors.disable('scrollZoom'); }}>
                <ZoomControl options={{ position: { top: "70px", left: "2%" }, size: "small" }} />
                <Placemark geometry={coordinates} />
            </Map>
        </YMaps>
    )
}

export default LocationMap
