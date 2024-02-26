import React, { useState, useEffect } from "react";
import ViewAllRequestsRow from "./ViewAllRequestsRow";
import axios_instance from "../axios";
const requestsURL = "/requests";
const pickupLocationsURL = "/locations";

function ViewAllRequests() {
  //fetch requests data
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const response = await axios_instance.get(requestsURL);
      setRequests(response.data.data);
      return;
    }
    fetchRequests();
  }, []);

  //fetch pickup locations data
  const [pickupLocations, setpickupLocations] = useState([]);

  useEffect(() => {
    async function fetchPickUpLocations() {
      const response = await axios_instance.get(pickupLocationsURL);
      setpickupLocations(response.data.data);
      return;
    }
    fetchPickUpLocations();
  }, []);

  return (

    <div className="ViewAllRequests">
      {pickupLocations.map((pickupLocation) => {
        return (
          <ViewAllRequestsRow
            key={pickupLocation.location}
            title={pickupLocation.location}
            requests={requests}
            pickupLocation={pickupLocation}
          ></ViewAllRequestsRow>
        );
      })}
    </div>
  );
}

export default ViewAllRequests;
