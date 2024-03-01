import React from "react";
import "./RequestCard.css";

function RequestCard({ request }) {
  return (
    // <div className=" RequestCard shadow-md">
    //   <div className="Head">
    //     <div className="Username">{request.requesterUsername} </div>
    //     <div className="Phone">{request.phoneNumber} </div>
    //   </div>
    //   <div className="DropLocation">{request.deliveryLocation}</div>
    //   {request.items.map((item) => {
    //     return (
    //       <div className="Items" key={item}>
    //         {item}
    //       </div>
    //     );
    //   })}
    //   <div className="Footer">
    //     <div className="Date">{request.date}</div>
    //     <div className="Time">{request.time}</div>
    //   </div>
    // </div>

    // <div className="card mb-3 shadow-md RequestCard" styles="max-width: 18rem;">
    //   <div className="card-header">
    //     <div className="Head">
    //       <div className="Username">{request.requesterUsername} Agrawal</div>
    //       <div className="Phone">{request.phoneNumber} </div>
    //     </div>
    //     <div className="DropLocation">To: {request.deliveryLocation}</div>
    //   </div>
    //   <div className="card-body">
    //     <p className="card-text">
    //       {request.items.map((item) => {
    //         return (
    //           <div className="Items" key={item}>
    //             {item}
    //           </div>
    //         );
    //       })}
    //     </p>
    //   </div>
    //   <div className="Footer">
    //     <div className="Date">{request.date}</div>
    //     <div className="Time"> {request.time} </div>
    //   </div>
    // </div>
    <span
      href="#"
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 RequestCard"
    >
      <div className="Head">
        <div className="Username">{request.requesterUsername} Agrawal</div>
        <div className="Phone">{request.phoneNumber} </div>
      </div>
      <div className="DropLocation">To: {request.deliveryLocation}</div>
      <div className="card-body">
        <p className="card-text">
          {request.items.map((item) => {
            return (
              <div className="Items" key={item}>
                {item}
              </div>
            );
          })}
        </p>
      </div>
      <div className="Footer">
        <div className="Date">{request.date}</div>
        <div className="Time"> {request.time} </div>
      </div>
    </span>
  );
}

export default RequestCard;
