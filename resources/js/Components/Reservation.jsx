import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import DurationInterval from "./DurationInterval";
import Services from "./Services";
import NbrPersone from "./NbrPersone";
import { Link } from "@inertiajs/react";
import UserInfoPopUp from "./UserInfosPopUp";

const Reservation = ({ restaurant, defaultDays }) => {
    const [services] = useState(restaurant[0].services);
    const [selectedService, setSelectedService] = useState("");
    const [dayServices, setDayServices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleUserInfoPopUp = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        console.log(dayServices);
    }, [dayServices]);

    return (
        <div>
            <div>
                <h2 className="text-yellow-800">Reservation informations</h2>
                <div
                    className={`${
                        isOpen && "hidden"
                    } p-4 border-[2px] shadow-lg w-[400px] flex flex-col font-bold rounded`}
                >
                    <>
                        <Calendar
                            services={services}
                            setServices={setDayServices}
                            defaultDays={defaultDays}
                        />
                        <Services
                            setSelectedService={setSelectedService}
                            services={dayServices}
                        />
                        <DurationInterval
                            selectedService={selectedService}
                            dayServices={dayServices}
                        />
                        <div className="flex mt-2 gap-2">
                            <NbrPersone />
                            <button
                                onClick={toggleUserInfoPopUp}
                                className=" border border-slate-800 text-slate-800 bg-slate-200 hover:bg-slate-300 py-2 rounded flex justify-center items-center w-1/2 h-1/2 self-end"
                            >
                                Next
                            </button>
                        </div>
                    </>
                </div>
                <div
                    className={`${
                        !isOpen && "hidden"
                    } p-4 border-[2px] shadow-lg w-[400px] flex flex-col font-bold rounded`}
                >
                    <UserInfoPopUp toggleUserInfoPopUp={toggleUserInfoPopUp} />
                </div>
            </div>
        </div>
    );
};

export default Reservation;
