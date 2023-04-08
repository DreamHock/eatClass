import { add, differenceInMinutes, format, parse } from "date-fns";
import { useEffect, useState } from "react";

const DurationInterval = ({ selectedService, dayServices }) => {
    const [completeSelectedService, setCompleteSelectedService] = useState("");
    let [addRepetitions, setAddRepetitions] = useState(0);
    let [selectedTime, setSelectedTime] = useState();

    useEffect(() => {
        setCompleteSelectedService(
            dayServices.find((service) => service.id == selectedService)
        );
    }, [selectedService]);
    useEffect(() => {
        console.log(completeSelectedService);
        completeSelectedService &&
            setAddRepetitions(
                differenceInMinutes(
                    parse(completeSelectedService.to, "HH:mm", new Date()),
                    parse(completeSelectedService.from, "HH:mm", new Date())
                )
                //  / completeSelectedService.interval
            );
    }, [completeSelectedService]);

    const reservationTimes = () => {
        const times = [];
        for (
            let i = 0;
            i <= addRepetitions;
            i += completeSelectedService.interval
        ) {
            let time = format(
                add(parse(completeSelectedService.from, "HH:mm", new Date()), {
                    minutes: i,
                }),
                "HH:mm"
            );
            times.push(
                <div
                    onClick={() => setSelectedTime(time)}
                    className={` active:bg-yellow-900 rounded-xl flex justify-center py-1 select-none cursor-pointer text-white ${selectedTime === time ? 'bg-yellow-900' : 'bg-yellow-500 hover:bg-yellow-600'}`}
                    key={i}
                >
                    {time}
                </div>
            );
        }

        return <div className=" grid grid-cols-5 gap-2">{times}</div>;
    };

    return (
        <div className="">{completeSelectedService && reservationTimes()}</div>
    );
};

export default DurationInterval;
