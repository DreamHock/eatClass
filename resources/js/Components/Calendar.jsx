import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../../css/calendar.css";

const Calendar = ({ services, setServices, defaultDays }) => {
    const [selectedDate, setSelectedDate] = useState();
    const [activeDate, setActiveDate] = useState(new Date());

    const getHeader = () => {
        return (
            <div className="header">
                <div
                    className="todayButton"
                    onClick={() => {
                        setActiveDate(new Date());
                    }}
                >
                    Today
                </div>
                <AiOutlineLeft
                    className="navIcon"
                    onClick={() => setActiveDate(addMonths(activeDate, -1))}
                />
                <AiOutlineRight
                    className="navIcon"
                    onClick={() => setActiveDate(addMonths(activeDate, 1))}
                />
                <h2 className="currentMonth">
                    {format(activeDate, "MMMM yyyy")}
                </h2>
            </div>
        );
    };
    const getWeekDaysNames = () => {
        const weekStartDate = startOfWeek(activeDate);
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            weekDays.push(
                <div className="day weekNames" key={day}>
                    {format(addDays(weekStartDate, day), "E")}
                </div>
            );
        }
        return <div className="weekContainer">{weekDays}</div>;
    };

    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
        let currentDate = date;
        const week = [];
        for (let d = 0; d < 7; d++) {
            week.push(
                <Day
                    defaultDays={defaultDays}
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    activeDate={activeDate}
                    d={d}
                    setSelectedDate={setSelectedDate}
                    services={services}
                    setServices={setServices}
                />
            );
            currentDate = addDays(currentDate, 1);
        }
        return <>{week}</>;
    };

    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);

        let currentDate = startDate;

        const allWeeks = [];

        while (currentDate <= endDate) {
            allWeeks.push(
                generateDatesForCurrentWeek(
                    currentDate,
                    selectedDate,
                    activeDate
                )
            );
            currentDate = addDays(currentDate, 7);
        }

        return <div className="weekContainer">{allWeeks}</div>;
    };

    return (
        <section>
            {getHeader()}
            {getWeekDaysNames()}
            {getDates()}
        </section>
    );
};

export default Calendar;

const Day = ({
    currentDate,
    selectedDate,
    activeDate,
    d,
    setSelectedDate,
    services,
    setServices,
    defaultDays,
}) => {
    const [render, setRender] = useState(true);
    const cloneDate = currentDate;

    useEffect(() => {
        const getServicesCurrentDay = () => {
            const s = services.filter((s) => {
                return isSameDay(new Date(s.date), currentDate);
            });
            if (s.length > 0) {
                setServices([...s]);
            } else {
                const ds = [];
                defaultDays.map((defaultDay) => {
                    if (
                        defaultDay.dayName.toLowerCase() ===
                        format(currentDate, "EEEE").toLowerCase()
                    ) {
                        defaultDay.default_services.map((dds) => {
                            ds.push(dds);
                        });
                    }
                });
                setServices([...ds]);
            }
        };
        getServicesCurrentDay();
    }, [render]);

    return (
        <div
            key={d}
            className={`day text-slate-50 relative
                ${
                    services.some((service) => {
                        return isSameDay(new Date(service.date), currentDate);
                    }) &&
                    `${!isSameDay(selectedDate, currentDate) && "bg-slate-500"}
                    hover:bg-yellow-500 cursor-pointer after:content-[''] after:absolute after:w-2 after:h-2 after:border-2 after:border-white after:rounded-full after:bg-yellow-500 after:hover:bg-sky-500 after:top-0 after:left-0`
                }

                ${
                    defaultDays.some((defaultDay) => {
                        return (
                            defaultDay.dayName.toLowerCase() ===
                            format(currentDate, "EEEE").toLowerCase()
                        );
                    }) &&
                    !isSameDay(currentDate, new Date()) &&
                    !isSameDay(selectedDate, currentDate) &&
                    " bg-slate-500 hover:bg-yellow-500 cursor-pointer"
                } 
                
                ${
                    isSameDay(selectedDate, currentDate)
                        ? "bg-yellow-500 cursor-pointer"
                        : ""
                }
                
                ${
                    isSameDay(currentDate, new Date()) &&
                    !isSameDay(selectedDate, currentDate) &&
                    `bg-sky-300 ${
                        defaultDays.some((defaultDay) => {
                            return (
                                defaultDay.dayName.toLowerCase() ===
                                format(currentDate, "EEEE").toLowerCase()
                            );
                        }) && "hover:bg-yellow-500 cursor-pointer"
                    }
                    `
                }
                
                ${
                    !isSameDay(selectedDate, currentDate) &&
                    !isSameDay(currentDate, new Date()) &&
                    !defaultDays.some((defaultDay) => {
                        return (
                            defaultDay.dayName.toLowerCase() ===
                            format(currentDate, "EEEE").toLowerCase()
                        );
                    }) &&
                    !services.some((service) => {
                        return isSameDay(new Date(service.date), currentDate);
                    }) &&
                    "bg-slate-200"
                }
                `}
            onClick={() => {
                if (
                    services.some((service) => {
                        return isSameDay(new Date(service.date), currentDate);
                    }) ||
                    defaultDays.some((defaultDay) => {
                        return (
                            defaultDay.dayName.toLowerCase() ===
                            format(currentDate, "EEEE").toLowerCase()
                        );
                    })
                ) {
                    setSelectedDate(cloneDate), setRender(!render);
                }
                console.log(cloneDate);
            }}
        >
            {format(currentDate, "d")}
        </div>
    );
};
