import React, { useState, useEffect } from "react";
import ViewAllRequestsRow from "./ViewAllRequestsRow";

// const requestsURL = "url";
// const pickupLocationsURL = "url";

function ViewAllRequests() {
  //fetch requests data
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      //   const response = await axios_instance.get(requestsURL);
      //   setRequests(response.requests);
      //   return;

      setRequests([
        {
          id: 1,
          UserName: "User1",
          Phone: "9314578491",
          PickupLocation: "Yummpys",
          DropLocation: "ABCD",
        },
        {
          id: 2,
          UserName: "User2",
          Phone: "9314578492",
          PickupLocation: "Yummpys",
          DropLocation: "EFGH",
        },
        {
          id: 3,
          UserName: "User3",
          Phone: "9314578493",
          PickupLocation: "MedC",
          DropLocation: "IJKL",
        },
        {
          id: 4,
          UserName: "User4",
          Phone: "9314578494",
          PickupLocation: "MedC",
          DropLocation: "MNOP",
        },
      ]);
      return;
    }
    fetchRequests();
  }, []);

  //fetch pickup locations data
  const [pickupLocations, setpickupLocations] = useState([]);

  useEffect(() => {
    async function fetchPickUpLocations() {
      //   const response = await axios_instance.get(pickupLocationsURL);
      //   setpickupLocations(response.pickUpLocations);
      //   return;

      setpickupLocations([
        { Name: "Yummpys" },
        { Name: "MedC" },
        { Name: "SFC" },
      ]);
      return;
    }
    fetchPickUpLocations();
  }, []);

  return (
    <div className="ViewAllRequestsRow">
      {pickupLocations.map((pickupLocation) => {
        return (
          <ViewAllRequestsRow
            key={pickupLocation.Name}
            title={pickupLocation.Name}
            requests={requests}
            pickupLocation={pickupLocation}
          ></ViewAllRequestsRow>
        );
      })}
    </div>
  );
}

export default ViewAllRequests;
