import { usePage } from "@inertiajs/react";
import { add, format, isDate, parse } from "date-fns";
import React from "react";
import { IoChevronUpOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";

const ServiceTiming = ({ ser, handleServiceChange, day, index, editable }) => {
    const {errors} = usePage().props

    return (
        <>
            <div className="flex">
                <div className="flex flex-col items-center w-1/2">
                    <button
                        type="button"
                        onClick={() => {
                            handleServiceChange(
                                {
                                    ...ser,
                                    from: format(
                                        add(
                                            parse(
                                                ser.from,
                                                "HH:mm",
                                                new Date()
                                            ),
                                            { minutes: 30 }
                                        ),
                                        "HH:mm"
                                    ),
                                },
                                ser.id
                            );
                        }}
                    >
                        <IoChevronUpOutline />
                    </button>
                    <div className="flex flex-col items-center">
                        <>
                            <div className="text-sm text-gray-500">from</div>
                            <div>{ser.from}</div>
                        </>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            handleServiceChange(
                                {
                                    ...ser,
                                    from: format(
                                        add(
                                            parse(
                                                ser.from,
                                                "HH:mm",
                                                new Date()
                                            ),
                                            { minutes: -30 }
                                        ),
                                        "HH:mm"
                                    ),
                                },
                                ser.id
                            );
                        }}
                    >
                        <IoChevronDownOutline />
                    </button>
                </div>

                <div className="flex flex-col items-center w-1/2">
                    <button
                        type="button"
                        onClick={() => {
                            handleServiceChange(
                                {
                                    ...ser,
                                    to: format(
                                        add(
                                            parse(ser.to, "HH:mm", new Date()),
                                            { minutes: 30 }
                                        ),
                                        "HH:mm"
                                    ),
                                },
                                ser.id
                            );
                        }}
                    >
                        <IoChevronUpOutline />
                    </button>
                    <div className="flex flex-col items-center">
                        <>
                            <div className="text-sm text-gray-500">to</div>
                            <div>{ser.to}</div>
                        </>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            handleServiceChange(
                                {
                                    ...ser,
                                    to: format(
                                        add(
                                            parse(ser.to, "HH:mm", new Date()),
                                            { minutes: -30 }
                                        ),
                                        "HH:mm"
                                    ),
                                },
                                ser.id
                            );
                        }}
                    >
                        <IoChevronDownOutline />
                    </button>
                </div>

                <div className="flex flex-col items-center w-1/2">
                    <button
                        type="button"
                        onClick={() => {
                            handleServiceChange(
                                {
                                    ...ser,
                                    interval:
                                        ser.interval < 60
                                            ? ser.interval +
                                              (ser.interval === 30 ? 30 : 15)
                                            : 15,
                                },
                                ser.id
                            );
                        }}
                    >
                        <IoChevronUpOutline />
                    </button>
                    <div className="flex flex-col items-center">
                        <>
                            <div className="text-sm text-gray-500">
                                Interval
                            </div>
                            <div>{ser.interval} Min</div>
                        </>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            handleServiceChange(
                                {
                                    ...ser,
                                    interval:
                                        ser.interval > 15
                                            ? ser.interval -
                                              (ser.interval !== 30 ? 30 : 15)
                                            : 60,
                                },
                                ser.id
                            );
                        }}
                    >
                        <IoChevronDownOutline />
                    </button>
                </div>
            </div>
            {editable && errors[`edit${day}`] && (
                <div className="text-red-800">
                    {errors[`edit${day}`][`services.${index}.from`]}
                    {errors[`edit${day}`][`services.${index}.to`]}
                    {errors[`edit${day}`][`services.${index}.interval`]}
                </div>
            )}
            {!editable && errors[`add`] && (
                <div className="text-red-800">
                    {errors[`add`][`services.${index}.from`]}
                    {errors[`add`][`services.${index}.to`]}
                    {errors[`add`][`services.${index}.interval`]}
                </div>
            )}
        </>
    );
};

export default ServiceTiming;
