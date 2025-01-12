import React from "react";

const Location = ({ restaurant }) => {
    return (
        <div className=" mb-4">
            <div className=" text-2xl mb-4  text-yellow-700">Location</div>
            <iframe
                src={restaurant.location}
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                className="rounded-xl"
            ></iframe>
        </div>
    );
};

export default Location;
