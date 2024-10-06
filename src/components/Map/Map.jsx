import React, { useState, useEffect } from "react";
import { MapContainer, Circle, TileLayer, Popup } from "react-leaflet";

import { useSelector,useDispatch } from "react-redux";
import { changeTheme } from "../../../app/slices/themeSlice";

const arcgStyle = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const openstreetDefault = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default function Map() {
    const dispatch = useDispatch();

    const value = useSelector(state => state.apiCordinates.value);
    const [mapStyle, setMapStyle] = useState(arcgStyle);
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                        });
                        setIsLoading(false);
                    },
                    () => {
                        setIsLoading(false);
                    }
                );
            } else {
                setIsLoading(false);
            }
        };
        getUserLocation();
    }, []);
    
    useEffect(() => {
    }, [value]);

    return (
        <div>
            {isLoading ? (
                <p className="text-center text-2xl mt-10 mb-10">
                    We're waiting for your permission to access your location.
                    <br />
                    If you don't grant permission, the map will load with default values.
                </p>
                ) : (
                <MapContainer center={userLocation ? [userLocation.lat, userLocation.lon] : [41.00, 29.00]} zoom={10} scrollWheelZoom={true} className="h-1/3 w-full relative">
                    <TileLayer 
                        attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={mapStyle}
                    />
                    {value &&
                        value.map((element) =>
                            element.type === "node" ? (
                                <Circle
                                    key={element.id}
                                    center={[element.lat, element.lon]}
                                    pathOptions={{ color: "blue", fillColor: "yellow" }}
                                    radius={20}
                                >
                                    <Popup>
                                        <p>Coordinate is: <br/> {element.lat} {element.lon}</p>
                                        <a href={`https://www.google.com/maps?q=${element.lat},${element.lon}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                                    </Popup>
                                </Circle>
                            ) : null
                        )}
                        
                        <button onClick={() => alert('This part is under development')} style={{zIndex: 1000, position: 'absolute', top: '5px', right: '5px'}} className="h-[30px] w-[30px] shadow shadow-black rounded-sm bg-white hover:bg-zinc-100 flex items-center justify-center mr-3 mt-1.5"><img className="h-[30px] w-[30px]" src="https://api.iconify.design/mdi:information-variant.svg"></img></button>


                        <button onClick={() => mapStyle === arcgStyle ? setMapStyle(openstreetDefault) : setMapStyle(arcgStyle)} style={{zIndex: 1000}} className="h-[30px] w-[30px] shadow shadow-black mt-20 ml-3 rounded-sm absolute bg-white hover:bg-zinc-100 flex items-center justify-center"><img className="h-[30px] w-[30px]" src="https://api.iconify.design/gg:arrows-exchange-alt-v.svg"></img></button>
                        
                        <button onClick={() => dispatch(changeTheme())} style={{zIndex: 1000}} className="h-[30px] w-[30px] shadow shadow-black mt-[7.5rem] ml-3 rounded-sm absolute bg-white hover:bg-zinc-100 flex items-center justify-center"><img className="h-[30px] w-[30px]" src="https://api.iconify.design/material-symbols-light:dark-mode-outline.svg"></img></button>
                </MapContainer>
            )}
        </div>
    );
}
