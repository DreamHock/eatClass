import React from "react";

const Location = ({ restaurant }) => {
    return (
        <div className="mb-4 w-full">
            <div className="text-xl md:text-2xl mb-4 text-yellow-700">Location</div>
            <div className="w-full h-[300px] md:h-[450px]">
                <iframe
                    src={restaurant.location}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    className="rounded-xl"
                ></iframe>
            </div>
        </div>
    );
};

export default Location;
