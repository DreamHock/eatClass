import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import DurationInterval from "./DurationInterval";
import Services from "./Services";

const Reservation = ({ restaurant, defaultDays }) => {
    const [services] = useState(restaurant[0].services);
    const [selectedService, setSelectedService] = useState("");
    const [dayServices, setDayServices] = useState([]);

    // useEffect(() => {
    //     setCompleteSelectedService(services.find((service) => service.id === selectedService));
    // }, [selectedService]);

    useEffect(() => {
        console.log(dayServices);
    }, [dayServices]);

    return (
        <div className="p-4 border-[2px] shadow-lg w-[400px] flex flex-col font-bold rounded">
            <Calendar
                services={services}
                setServices={setDayServices}
                defaultDays={defaultDays}
            />
            <Services
                setSelectedService={setSelectedService}
                services={dayServices}
            />
            <DurationInterval selectedService={selectedService} dayServices={dayServices} />
        </div>
    );
};

export default Reservation;
