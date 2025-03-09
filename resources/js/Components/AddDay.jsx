import { router, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import ServiceInformations from "./ServiceInformations";
import PrimaryButton from "./PrimaryButton";

const DAYS_OF_WEEK = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
];

const DEFAULT_SERVICE = {
    service: "",
    from: format(new Date(0, 0, 0, 12, 0), "HH:mm"),
    to: format(new Date(0, 0, 0, 12, 0), "HH:mm"),
    interval: 15,
};

const AddDay = ({ defaultDay, editable, restaurant }) => {
    const [day, setDay] = useState(defaultDay && defaultDay.dayName ? defaultDay.dayName : "Thursday");
    const { errors } = usePage().props;
    const [services, setServices] = useState(
        defaultDay && defaultDay.default_services
            ? defaultDay.default_services
            : [{ id: 1, ...DEFAULT_SERVICE }]
    );
    const [submitButton, setSubmitButton] = useState("");

    useEffect(() => {
        console.log(defaultDay)
    }, [day]);

    const addService = () => {
        const newId =
            services.length > 0
                ? Math.max(...services.map((s) => s.id)) + 1
                : 1;

        setServices([...services, { id: newId, ...DEFAULT_SERVICE }]);
    };

    const handleServiceChange = (updatedService, id) => {
        setServices(
            services.map((service) =>
                service.id === id ? { ...service, ...updatedService } : service
            )
        );
    };

    const deleteService = (id) => {
        if (services.length > 1) {
            setServices(services.filter((service) => service.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceData = {
            restaurant_id: restaurant.id,
            day: day,
            services: services,
        };

        if (submitButton === "add") {
            router.post(
                route("admin.default-days.store", restaurant.id),
                serviceData,
                { errorBag: "add", preserveScroll: true }
            );
        } else if (submitButton === "delete" && defaultDay && defaultDay.id) {
            router.delete(
                route("admin.default-days.destroy", {
                    restaurant: restaurant.id,
                    default_day: defaultDay.id,
                }),
                {
                    preserveScroll: true,
                }
            );
        } else if (submitButton === "edit" && defaultDay && defaultDay.id) {
            router.put(
                route("admin.default-days.update", {
                    restaurant: restaurant.id,
                    default_day: defaultDay.id,
                }),
                serviceData,
                { errorBag: `edit${day}`, preserveScroll: true }
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="shadow-md p-4 w-64 flex flex-col bg-white rounded-md"
        >
            {day}
            <select
                className="p-1 h-8 rounded cursor-pointer hover:bg-slate-100"
                onChange={(e) => setDay(e.target.value)}
                value={day}
            >
                <option value="day" disabled>
                    Day
                </option>
                {DAYS_OF_WEEK.map(({ value, label }) => (
                    <option
                        key={value}
                        value={value}
                    >
                        {label}
                    </option>
                ))}
            </select>

            {/* Error messages */}
            {editable && errors[`edit${day}`]?.day && (
                <div className="text-red-800 text-sm mt-1">
                    {errors[`edit${day}`].day}
                </div>
            )}
            {!editable && errors.add?.day && (
                <div className="text-red-800 text-sm mt-1">
                    {errors.add.day}
                </div>
            )}

            <div className="font-medium text-sm mt-3 mb-2">Services:</div>

            {/* Service list */}
            {services.map((service, index) => (
                <ServiceInformations
                    editable={editable}
                    day={day}
                    key={service.id}
                    index={index}
                    ser={service}
                    deleteService={deleteService}
                    handleServiceChange={handleServiceChange}
                />
            ))}

            {/* Add service button */}
            <button
                type="button"
                onClick={addService}
                className="cursor-pointer border border-slate-800 text-slate-800 hover:bg-slate-100 
                           rounded h-8 shadow-sm p-1 flex items-center w-full mb-2 text-2xl justify-end px-1"
            >
                <div className="select-none flex justify-between w-full">
                    <div className="text-sm flex items-center">Add service</div>
                    <div>+</div>
                </div>
            </button>

            {/* Action buttons */}
            {editable ? (
                <div className="flex gap-2">
                    <PrimaryButton
                        onClick={() => setSubmitButton("delete")}
                        type="submit"
                        color="red"
                        className="flex-1 font-medium rounded text-sm"
                    >
                        Delete
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={() => setSubmitButton("edit")}
                        type="submit"
                        color="slate"
                        className="flex-1 font-medium rounded text-sm"
                    >
                        Save
                    </PrimaryButton>
                </div>
            ) : (
                <PrimaryButton
                    onClick={() => setSubmitButton("add")}
                    type="submit"
                    color="sky"
                    className="flex-1 font-medium rounded text-sm"
                >
                    Add day
                </PrimaryButton>
            )}
        </form>
    );
};

export default AddDay;
