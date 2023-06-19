import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import DurationInterval from "./DurationInterval";
import Services from "./Services";
import NbrPersone from "./NbrPersone";
import { Link, useForm } from "@inertiajs/react";
import UserInfoPopUp from "./UserInfosPopUp";
import PrimaryButton from "../Components/PrimaryButton";
import { format } from "date-fns";

const Reservation = ({ restaurant, defaultDays }) => {
    const [completeSelectedService, setCompleteSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayServices, setDayServices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        phone: "",
        email: "",
        reservable_id: 0,
        reservable_type: "",
        date: "",
        time: "",
        nbrPeople: 1,
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setCompleteSelectedService(
            dayServices.find((service) => service.id == data.reservable_id)
        );
    }, [data.reservable_id]);

    useEffect(() => {
        console.log(completeSelectedService);
        if (completeSelectedService) {
            const updatedData = {
                ...data,
                reservable_id: completeSelectedService.id,
                reservable_type: completeSelectedService.date
                    ? "App/Model/Service"
                    : "App/Model/DefaultService",
            };
            setData(updatedData);
        }
    }, [completeSelectedService]);

    const toggleUserInfoPopUp = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // console.log(selectedDate);
        setData("date", format(selectedDate, "yyyy-MM-dd"));
    }, [selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/reservations", {
            onSuccess: () => {
                setSuccess(true);
                setIsOpen(false);
                reset();
            },
        });
    };

    return (
        <div>
            {success ? (
                <div className="p-4 flex flex-col items-center justify-center shadow-md">
                    <h2 className="text-xl mb-2 font-bold">
                        Successfull Reservation
                    </h2>
                    <div className="text-md font-bold mb-2">
                        Please check your email
                    </div>
                    <a
                        className=" hover:cursor-pointer text-sky-800 text-md font-bold underline"
                        onClick={() => setSuccess(false)}
                    >
                        Go back
                    </a>
                </div>
            ) : (
                <div>
                    <h2 className="text-yellow-800 text-2xl">
                        Book a table
                    </h2>

                    <div
                        className={`${
                            isOpen && "hidden"
                        } p-4 border-[2px] shadow-lg w-[400px] flex flex-col font-bold rounded`}
                    >
                        <>
                            <Calendar
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                services={restaurant.services}
                                setServices={setDayServices}
                                defaultDays={defaultDays}
                            />
                            <Services
                                data={data}
                                setData={setData}
                                services={dayServices}
                            />
                            <DurationInterval
                                completeSelectedService={
                                    completeSelectedService
                                }
                                setData={setData}
                                dayServices={dayServices}
                            />
                            <div className="flex mt-2 gap-2">
                                <NbrPersone setData={setData} data={data} />
                                <PrimaryButton
                                    onClick={toggleUserInfoPopUp}
                                    className="w-1/2 h-1/2 self-end"
                                >
                                    Next
                                </PrimaryButton>
                            </div>
                        </>
                    </div>
                    <div
                        className={`${
                            !isOpen && "hidden"
                        } p-4 border-[2px] shadow-lg w-[400px] flex flex-col font-bold rounded`}
                    >
                        <UserInfoPopUp
                            processing={processing}
                            handleSubmit={handleSubmit}
                            toggleUserInfoPopUp={toggleUserInfoPopUp}
                            data={data}
                            setData={setData}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservation;
