import {
    addDays,
    addMonths,
    addYears,
    endOfMonth,
    endOfWeek,
    format,
    getDaysInMonth,
    getMonth,
    getWeekOfMonth,
    getYear,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../../css/calendar.css";

const Calendar = ({ services }) => {
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
        for (let day = 1; day <= 7; day++) {
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
        for (let day = 0; day < 7; day++) {
            const cloneDate = currentDate;
            week.push(
                <div
                    key={day}
                    className={`day cursor-pointer hover:bg-orange-500 text-slate-50 relative
                    ${
                        services.find((service) =>
                            isSameDay(new Date(service.date), currentDate)
                        )
                            ? " after:content-[''] after:absolute after:w-2 after:h-2 after:rounded-full after:bg-orange-500 after:hover:bg-sky-500 after:top-0 after:left-0"
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
                    ${
                        isSameDay(selectedDate, currentDate)
                            ? "bg-orange-500"
                            : ""
                    }
                    ${
                        isSameDay(currentDate, new Date()) &&
                        !isSameDay(selectedDate, currentDate)
                            ? "bg-sky-500"
                            : ""
                    }
                    
                    `}
                    onClick={() => {
                        setSelectedDate(cloneDate);
                        console.log(cloneDate);
                    }}
                >
                    {format(currentDate, "d")}
                </div>
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
    // const getDates = () => {
    //     const monthStartDate = startOfMonth(activeDate);
    //     const monthEndDate = endOfMonth(activeDate);
    //     const monthDays = [];
    //     for (let day = 0; day < format(monthEndDate, "d"); day++) {
    //         monthDays.push(
    //             <div
    //                 className={`day cursor-pointer bg-slate-200 hover:bg-slate-300 active:bg-slate-400 select-none`}
    //                 onClick={() => {
    //                     console.log(addDays(monthStartDate, day));
    //                 }}
    //                 key={day}
    //             >
    //                 {format(addDays(monthStartDate, day), "d")}
    //             </div>
    //         );
    //     }
    //     return <div className="day-container">{monthDays}</div>;
    // };

    return (
        <section>
            {getHeader()}
            {getWeekDaysNames()}
            {getDates()}
        </section>
    );
};

export default Calendar;
