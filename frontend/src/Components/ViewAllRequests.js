import React, { useState, useEffect } from "react";
import ViewAllRequestsRow from "./ViewAllRequestsRow";
import PostNewRequest from "./PostNewRequest";
import axios_instance from "../axios";
import axios from "axios";

const requestsURL = "/requests";
const pickupLocationsURL = "/locations";

// export default function FloatingActionButtons() {
//   return (
//     <Box sx={{ '& > :not(style)': { m: 1 } }}>
//       <Fab color="primary" aria-label="add">
//         <AddIcon />
//       </Fab>
//       <Fab color="secondary" aria-label="edit">
//         <EditIcon />
//       </Fab>
//       <Fab variant="extended">
//         <NavigationIcon sx={{ mr: 1 }} />
//         Navigate
//       </Fab>
//       <Fab disabled aria-label="like">
//         <FavoriteIcon />
//       </Fab>
//     </Box>
//   );
// }

function ViewAllRequests() {
  let firstRender = true;
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/auth/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const sendReq = async () => {
    const res = await axios
      .get("http://localhost:5000/auth/verifyLogin", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendReq().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 60 * 9);

    return () => clearInterval(interval);
  }, []);
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
    <div>
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
      <div className="PostNewRequest">
        <PostNewRequest />
      </div>
    </div>
  );
}

export default ViewAllRequests;
