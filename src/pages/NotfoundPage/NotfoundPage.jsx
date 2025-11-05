import React, { useState } from "react";
import MapAddressCom from "../../components/MapAddressCom/MapAddressCom";

const NotfoundPage = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    return (
        <div>
            {/* <MapAddressCom
                onSelect={({ lat, lng }) => {
                    setLatitude(lat);
                    setLongitude(lng);
                }}
            />
            <div style={{ marginTop: 20 }}>
                <p><strong>Latitude:</strong> {latitude}</p>
                <p><strong>Longitude:</strong> {longitude}</p>
            </div> */}
            Page not found
        </div>
    );
};

export default NotfoundPage;
