import { useState } from "react";
import Calendar from "./Calendar";


const Reservation = ({ restaurant }) => {
    const [services, setServices] = useState(restaurant[0].services);
    const [date, setDate] = useState(new Date());

    return (
        <form action="" className="p-4 border-[2px] shadow-lg w-[400px]">
            <Calendar />
            <select
                name=""
                id="services"
                className="outline-none border-black"
                defaultValue="services"
            >
                <option value="services" disabled>
                    Services
                </option>
                {services.map((service) => {
                    return (
                        <option key={service.id} value={service.id}>
                            {service.service}
                        </option>
                    );
                })}
            </select>
        </form>
    );
};

export default Reservation;
