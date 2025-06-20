import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.css";
import MapComponent from "./../components/MapComponent";

function Home() {
  const [data, setData] = useState([]);
  const [isActive, setActive] = useState("");

  const [selectedValue, setSelectedValue] = useState({});

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://api.erdi.cmu.ac.th/dust/realtime")
        .then((response) => {
          const sortedData = response.data.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setData(sortedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 60000); // Fetch every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleClick = (data) => {
    setActive(data.name);
    setSelectedValue(data); // Update the parent state
  };

  function formatTime(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className="container">
      <ul>
        {data?.map((forEach) => (
          <li
            key={forEach.name}
            className={`name ${isActive === forEach.name ? "active" : ""}`}
            onClick={() => handleClick(forEach)}
          >
            {forEach.name}
          </li>
        ))}
      </ul>

      <div className="graphs">
        <div className="header">
          <h2>{selectedValue.name ? selectedValue.name : "โปรดเลือกอาคาร"}</h2>
          <p>{selectedValue.device_id ? 'Device ID : ' + selectedValue.device_id : ''}</p>
        </div>
        <div className="timer">
          <h4>
            Time in :{" "}
            {selectedValue.name ? formatTime(selectedValue.timeIn) : ""}
          </h4>
        </div>
        <div className="dataBoxes">
            <div className="data">
          pm 0.1 : {selectedValue.pm1} <br />
          pm 2.5 : {selectedValue.pm25} <br />
          pm 10 : {selectedValue.pm10}
            </div>
            <div className="data">
                Temperature : {selectedValue.temp} celcius <br />
                Humidity : {selectedValue.humi}
            </div>
            <div className="data">

            Latitude : {selectedValue.lat} <br />
          Longitude : {selectedValue.lng}
            </div>
        </div>
        <div className="map">
          {selectedValue.name ? (
            <MapComponent lat={selectedValue.lat} lng={selectedValue.lng} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
