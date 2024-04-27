import React, { useState, useEffect } from "react";
import RequestCard from "./RequestCard";
import "./ViewAllRequestsRow.css";
import axios_instance from "../axios";

const pickupLocationsURL = "/admin/locations";

function ViewAllRequestsRow({
  title,
  requests,
  pickupLocation,
  user,
  pending,
  pickupLocations,
}) {
  //Filter requests based on pickup location
  const [filteredRequests, setFilteredRequests] = useState([]);
  // const [pickupLocations, setpickupLocations] = useState([]);

  useEffect(() => {
    setFilteredRequests([]);
    if (pending === 0) {
      requests.forEach((request) => {
        if (request.pickupLocation === pickupLocation.location) {
          setFilteredRequests((oldArray) => [...oldArray, request]);
        }
      });
    } else if (pending === 1) {
      requests.forEach((request) => {
        if (request.status === pickupLocation) {
          setFilteredRequests((oldArray) => [...oldArray, request]);
        }
      });
    }
  }, [requests, pickupLocation]);

  // useEffect(() => {
  //   async function fetchPickUpLocations() {
  //     const response = await axios_instance.get(pickupLocationsURL);
  //     setpickupLocations(response.data.data);
  //     return;
  //   }
  //   fetchPickUpLocations();
  // }, []);

  return (
    <div>
      {filteredRequests.length > 0 && (
        <div className="ViewAllReqRow">
          <h2>{title}</h2>
          <div className="RequestCards">
            {filteredRequests.map((request) => {
              let pc = pickupLocations.find((place) => {
                // console.log(typeof place.location);
                // console.log(typeof request.pickupLocation);
                if (place.location === request.pickupLocation) {
                  // console.log(place.coordinate);

                  // console.log(typeof place.coordinate);
                  return true;
                }
              });
              let dc = pickupLocations.find((place) => {
                // console.log(typeof place.location);
                // console.log(typeof request.pickupLocation);
                if (place.location === request.deliveryLocation) {
                  // console.log(place.coordinate);

                  // console.log(typeof place.coordinate);
                  return true;
                }
              });
              return (
                <RequestCard
                  className="RequestCardOuter"
                  key={request._id}
                  request={request}
                  user={user}
                  showAccept={true}
                  showCollect={false}
                  showDelete={false}
                  pickupCoordinates={pc?.coordinate}
                  deliveryCoordinates={dc?.coordinate}
                ></RequestCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewAllRequestsRow;
