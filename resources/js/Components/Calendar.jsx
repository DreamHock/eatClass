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

const Calendar = ({ services, setServices }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
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
}) => {
    const [dayServices, setDayServices] = useState([]);
    const [render, setRender] = useState(true);
    const cloneDate = currentDate;

    useEffect(()=>{
        const getServicesCurrentDay = () => {
            const ds = services.filter((s) => {
                return isSameDay(new Date(s.date), currentDate);
            });
            setServices(ds);
        };
        getServicesCurrentDay()
    }, [render])


    return (
        <div
            
            key={d}
            className={`day cursor-pointer hover:bg-orange-500 text-slate-50 relative
            ${
                services.some((service) => {
                    return isSameDay(new Date(service.date), currentDate)
                })
                
                    ? " after:content-[''] after:absolute after:w-2 after:h-2 after:border-2 after:border-white after:rounded-full after:bg-orange-500 after:hover:bg-sky-500 after:top-0 after:left-0"
                    : ""
            }
                ${
                    isSameMonth(currentDate, activeDate) &&
                    !isSameDay(currentDate, new Date()) &&
                    !isSameDay(selectedDate, currentDate)
                        ? " bg-slate-500 "
                        : "  "
                } 
                ${
                    !isSameMonth(currentDate, activeDate) &&
                    !isSameDay(selectedDate, currentDate) &&
                    !isSameDay(currentDate, new Date())
                        ? " bg-slate-300 "
                        : "  "
                } 
                ${isSameDay(selectedDate, currentDate) ? "bg-orange-500" : ""}
                ${
                    isSameDay(currentDate, new Date()) &&
                    !isSameDay(selectedDate, currentDate)
                        ? "bg-sky-500"
                        : ""
                }
                
                `}
            onClick={() => {
                setSelectedDate(cloneDate);
                setRender(!render)
                console.log(cloneDate);
            }}
        >
            {format(currentDate, "d")}
        </div>
    );
};
