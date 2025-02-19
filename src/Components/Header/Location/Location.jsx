import { IoLocationSharp } from "react-icons/io5";
import Button from '@mui/material/Button';
import "./Style.css";

const Location = () => {
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Current Location:", latitude, longitude);
                    alert(`Your current location is: \nLatitude: ${latitude} \nLongitude: ${longitude}`);
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    alert("Unable to fetch location. Please enable location services.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <Button className="location" onClick={handleLocationClick}>
            <IoLocationSharp className="location-icon" />
            <div className="info d-flex flex-column">
                <span className="label">Your Location</span>
            </div>
        </Button>
    );
};

export default Location;
