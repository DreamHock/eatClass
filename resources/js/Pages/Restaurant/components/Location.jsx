import React from "react";

const Location = ({ restaurant }) => {
    return (
        <div className=" mb-4">
            <div className=" text-2xl mb-4  text-yellow-700">Location</div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623.2328391930732!2d-73.99401479041514!3d40.756626052143716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25852b45519a9%3A0x7c17fba9feac45c4!2sBURGER%20WORLD!5e0!3m2!1sen!2sma!4v1684848884045!5m2!1sen!2sma"
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
