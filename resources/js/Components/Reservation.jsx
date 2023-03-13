import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Services from "./Services";

const Reservation = ({ restaurant }) => {
    const [services] = useState(restaurant[0].services);
    const [selectedService, setSelectedService] = useState("");
    const [dayServices, setDayServices] = useState([]);

    useEffect(() => {
        console.log(selectedService);
    }, [selectedService]);

    useEffect(() => {
        console.log(dayServices);
    }, [dayServices]);

    return (
        <div
            className="p-4 border-[2px] shadow-lg w-[400px] flex flex-col font-bold rounded"
        >
            <Calendar services={services} setServices={setDayServices} />
            <Services setService={setSelectedService} services={dayServices} />
        </div>
    );
};

export default Reservation;
