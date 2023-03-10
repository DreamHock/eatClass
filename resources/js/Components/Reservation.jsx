import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Services from "./Services";

const Reservation = ({ restaurant }) => {
    const [services] = useState(restaurant[0].services);
    const [service, setService] = useState("");
    const [timeService, setTimeService] = useState(null);

    useEffect(() => {
        console.log(service);
        services
    }, [service]);

    return (
        <div
            action=""
            className="p-4 border-[2px] shadow-lg w-[400px] flex flex-col font-bold rounded"
        >
            <Calendar services={services}/>
            <Services setService={setService} services={services} />
        </div>
    );
};

export default Reservation;
