
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./find.css";

import osm from './osm-providers';
import { Button } from '../Button';
const markerIcon = new L.Icon({
    iconUrl: require("./marker.png"),
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],

});
const fmarkerIcon = new L.Icon({
    iconUrl: require("./redmark.png"),
    iconSize: [20, 30],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],

});

const Findfault = () => {
    const [userData, serUserdata] = useState({})

    const [longitude, setLongitude] = useState(20.5937);

    const [latitude, setLatitude] = useState(78.9629);

    const [status, setStatus] = useState("1");


    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);
    dispatch({ type: "USER", payload: true })
    const CallPostlogin = async () => {
        try {
            const res = await fetch("https://api.thingspeak.com/channels/1710885/feeds.json?api_key=MSRSFONO5FF8RN2C", {
                method: "GET",

                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            console.log(data);
            serUserdata(data);
            console.log(data["channel"]["latitude"]);
            console.log(data["channel"]["longitude"]);
            console.log(typeof(data["feeds"][(data["feeds"].length - 1)]["field2"]));
            setStatus(data["feeds"][(data["feeds"].length - 1)]["field2"])
            //setStatus(data["feeds"][0]["field2"]);
            console.log(status);
            setLatitude(data["channel"]["latitude"])
            setLongitude(data["channel"]["longitude"])


            if (!res.status === 200) {

                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            //   history.push('/postlogin');
        }

    }
    useEffect(() => {
        CallPostlogin();

    }, []);
    const Refresh=async(e)=>{
        e.preventDefault();
        history.push('/fault')
        window.location.reload(false);
    }
//     const Check=()=>{
      
//         try{
//         {(status === "1")?<Marker position={[latitude, longitude]} icon={markerIcon}>
//         <Popup>
//             <b>Status OK</b>
//             <br></br>
//             <b>
//                 Latitude {latitude}
//             </b>
//             <br></br>
//             <b>
//                 longitude {longitude}
//             </b>
//         </Popup>
//     </Marker>
// :
//     <Marker position={[latitude, longitude]} icon={fmarkerIcon}>
//         <Popup>
//             <b>Status:Fault</b>
//             <br></br>
            
//             <b>
//                 Latitude {latitude}
//             </b>
//             <br></br>
//             <b>
//                 longitude {longitude}
//             </b>
//         </Popup>
//     </Marker>}
//         }catch(err){
//             console.log(err);
//         }
//     }
    
    
    const [center, setCenter] = useState({ lat: 13.0515195463, lng: 74.96668937670869 });
    const ZOOM_LEVEL = 12;
    const mapRef = useRef();
    return (
        <>

            <div class='mapcon'>
            

                <MapContainer
                    center={center}
                    zoom={ZOOM_LEVEL}
                    ref={mapRef}
                // zoomAnimation={}

                >

                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />

                    {(status === "1")?<Marker position={[latitude, longitude]} icon={markerIcon}>
                        <Popup>
                            <b>Status OK</b>
                            <br></br>
                            <b>
                                Latitude {latitude}
                            </b>
                            <br></br>
                            <b>
                                longitude {longitude}
                            </b>
                        </Popup>
                    </Marker>
                :   
                    <Marker position={[latitude, longitude]} icon={fmarkerIcon}>
                        <Popup>
                            <b>Status:Fault</b>
                            <br></br>
                            
                            <b>
                                Latitude {latitude}
                            </b>
                            <br></br>
                            <b>
                                longitude {longitude}
                            </b>
                        </Popup>
                    </Marker>
} 
                </MapContainer>
                
                {/* <button class="checkb" onclick={Refresh} >Check Status</button> */}
                <div class="Center">
                
                
                
            <button onClick={() => window.location.reload(false) }>Reload</button> 
            </div>
                {/* <iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/1710885/maps/channel_show"></iframe> */}
            </div>
        </>
    )
}

export default Findfault




