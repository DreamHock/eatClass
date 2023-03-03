// import React, { useState } from "react";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import {
//     format,
//     startOfWeek,
//     addDays,
//     startOfMonth,
//     endOfMonth,
//     endOfWeek,
//     isSameMonth,
//     isSameDay,
// } from "date-fns";

// const Calendar = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [activeDate, setActiveDate] = useState(new Date());

//     const getWeekDaysNames = () => {
//         const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });
//         const weekDays = [];
//         for (let day = 0; day < 7; day++) {
//             weekDays.push(
//                 <div className="day weekNames text-[#9e9e9e]">
//                     {format(addDays(weekStartDate, day), "EEEEEE")}
//                 </div>
//             );
//         }
//         return (
//             <div className="weekContainer grid grid-cols-7 grid ">
//                 {weekDays}
//             </div>
//         );
//     };
//     const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
//         let currentDate = date;
//         const week = [];
//         for (let day = 0; day < 7; day++) {
//             const cloneDate = currentDate;
//             week.push(
//                 <div
//                     className={`day ${
//                         isSameMonth(currentDate, activeDate)
//                             ? ""
//                             : "inactiveDay"
//                     } ${
//                         isSameDay(currentDate, selectedDate)
//                             ? "selectedDay"
//                             : ""
//                     }
//               ${isSameDay(currentDate, new Date()) ? "today" : ""}`}
//                     onClick={() => {
//                         setSelectedDate(cloneDate);
//                     }}
//                 >
//                     {format(currentDate, "d")}
//                 </div>
//             );
//             currentDate = addDays(currentDate, 1);
//         }
//         return <>{week}</>;
//     };

//     return (
//         <section>
//             {/* getHeader */}
//             <div className="header flex items-center">
//                 <div className="todayButton">Today</div>
//                 <AiOutlineLeft className="navIcon" />
//                 <AiOutlineRight className="navIcon" />{" "}
//                 <h2 className="currentMonth ml-6 border border-black">
//                     {format(activeDate, "MMMM yyyy")}
//                 </h2>
//             </div>
//             {/* {getWeekDaysNames} */}
//             {getWeekDaysNames()}
//             {/* <div className="weekContainer">{weekDays}</div> */}
//             {/* {getDates} */}
//         </section>
//     );
// };

// export default Calendar;
import { Calendar as Cal } from "react-calendar";
import { useState } from "react";
import '../../css/calendar.css'

const Calendar = () => {
    const [time, setTime] = useState(new Date());

    return (
        <>
            <div>Calendar</div>
            <Cal className='' onChange={setTime} value={time} />
        </>
    );
};

export default Calendar;
