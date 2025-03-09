import { useState } from "react";
import { format } from "date-fns";
import { router, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import * as React from "react";
import { Calendar } from "@/Components/ui/calendar";
import AddSpecialServices from "@/Components/AddSpecialServices";

export default function SpecialDay({ restaurant, specialDay, auth }) {
    const { errors } = usePage().props;
    const [selectedDays, setSelectedDays] = useState<Date[] | undefined>([
        new Date(),
    ]);
    const [showDayForm, setShowDayForm] = useState<Boolean>(false);
    const [formData, setFormData] = useState({
        selectedDates: [],
        services: [],
    });
    const [processing, setProcessing] = useState(false);
    const [submitType, setSubmitType] = useState("add");
    const [editingDay, setEditingDay] = useState(null);

    // Group special days by date for better display
    const specialDaysByDate = React.useMemo(() => {
        const grouped = {};
        if (specialDay && specialDay.length > 0) {
            specialDay.forEach((day) => {
                if (!grouped[day.specialDate]) {
                    grouped[day.specialDate] = {
                        id: day.id,
                        date: day.specialDate,
                        services: [],
                    };
                }

                // Add services for this day
                if (day.services && day.services.length > 0) {
                    grouped[day.specialDate].services = [
                        ...grouped[day.specialDate].services,
                        ...day.services,
                    ];
                }
            });
        }
        return grouped;
    }, [specialDay]);

    const handleDaySelect = (days) => {
        setSelectedDays(days);
        if (days && days.length > 0) {
            setShowDayForm(true);
            setFormData({
                ...formData,
                selectedDates: days.map((day) => format(day, "yyyy-MM-dd")),
            });
        } else {
            setShowDayForm(false);
        }
    };

    const handleServicesSubmit = (services) => {
        // Create a complete data object with both selected dates and services
        const completeData = {
            ...formData,
            services: services,
        };

        // Set processing state
        setProcessing(true);

        // Post the data using Inertia router
        router.post(
            route("admin.special-days.store", restaurant.id),
            completeData,
            {
                onFinish: () => setProcessing(false),
                preserveScroll: true,
                errorBag: submitType,
            }
        );
    };

    const handleEditSpecialDay = (day) => {
        setEditingDay(day);
    };

    const handleUpdateSpecialDay = (specialDayId, updatedServices) => {
        setProcessing(true);

        router.put(
            route("admin.special-days.update", {
                restaurant: restaurant.id,
                special_day: specialDayId,
            }),
            {
                specialDate: editingDay.date,
                services: updatedServices,
            },
            {
                onSuccess: () => {
                    // Only close the form if the update was successful
                    setEditingDay(null);
                },
                onFinish: () => {
                    setProcessing(false);
                },
                preserveScroll: true,
                errorBag: `edit${specialDayId}`,
            }
        );
    };

    const handleCancelEdit = () => {
        setEditingDay(null);
    };

    const handleDeleteSpecialDay = (specialDayId) => {
        if (confirm("Are you sure you want to delete this special day?")) {
            router.delete(
                route("admin.special-days.destroy", {
                    restaurant: restaurant.id,
                    special_day: specialDayId,
                }),
                {
                    preserveScroll: true,
                }
            );
        }
    };

    return (
        <Authenticated auth={auth}>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Special Services for {restaurant.name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-3">
                            Select Dates
                        </h2>
                        <Calendar
                            mode="multiple"
                            selected={selectedDays}
                            onSelect={handleDaySelect}
                            className="rounded-md border"
                        />

                        {/* Display date selection errors */}
                        {errors.add?.selectedDates && (
                            <div className="text-red-800 text-sm mt-2">
                                {errors.add.selectedDates}
                            </div>
                        )}
                    </div>

                    {showDayForm && (
                        <div className="bg-white p-4 rounded-lg shadow">
                            <AddSpecialServices
                                restaurant={restaurant}
                                selectedDates={formData.selectedDates}
                                onSubmit={(services) => {
                                    setSubmitType("add");
                                    handleServicesSubmit(services);
                                }}
                                processing={processing}
                                errors={errors}
                            />
                        </div>
                    )}
                </div>

                {/* Display existing special days */}
                {Object.keys(specialDaysByDate).length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">
                            Existing Special Days
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.values(specialDaysByDate).map(
                                (day: any) => (
                                    <div
                                        key={day.id}
                                        className="bg-white p-4 rounded-lg shadow"
                                    >
                                        {editingDay &&
                                        editingDay.id === day.id ? (
                                            // Edit mode
                                            <EditSpecialDay
                                                day={editingDay}
                                                onUpdate={(services) =>
                                                    handleUpdateSpecialDay(
                                                        day.id,
                                                        services
                                                    )
                                                }
                                                onCancel={handleCancelEdit}
                                                processing={processing}
                                                errors={errors}
                                                errorBag={`edit${day.id}`}
                                            />
                                        ) : (
                                            // View mode
                                            <>
                                                <div className="flex justify-between items-center mb-3">
                                                    <h3 className="font-bold text-lg">
                                                        {format(
                                                            new Date(day.date),
                                                            "PPP"
                                                        )}
                                                    </h3>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEditSpecialDay(
                                                                    day
                                                                )
                                                            }
                                                            className="text-blue-600 hover:text-blue-800"
                                                            title="Edit special day"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteSpecialDay(
                                                                    day.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Delete special day"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    {day.services.map(
                                                        (service) => (
                                                            <div
                                                                key={service.id}
                                                                className="border border-gray-200 p-2 rounded"
                                                            >
                                                                <p className="font-medium">
                                                                    {
                                                                        service.service
                                                                    }
                                                                </p>
                                                                <div className="flex justify-between text-sm text-gray-600">
                                                                    <span>
                                                                        Time:{" "}
                                                                        {
                                                                            service.from
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            service.to
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        Interval:{" "}
                                                                        {
                                                                            service.interval
                                                                        }{" "}
                                                                        min
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Authenticated>
    );
}

// EditSpecialDay component for editing a special day
const EditSpecialDay = ({
    day,
    onUpdate,
    onCancel,
    processing,
    errors,
    errorBag,
}) => {
    const [services, setServices] = useState(day.services || []);

    const addService = () => {
        const newId =
            services.length > 0
                ? Math.max(...services.map((s) => s.id || 0)) + 1
                : 1;

        setServices([
            ...services,
            {
                id: `new_${newId}`,
                service: "",
                from: "12:00",
                to: "13:00",
                interval: 15,
            },
        ]);
    };

    const deleteService = (id) => {
        if (services.length > 1) {
            setServices(services.filter((service) => service.id !== id));
        }
    };

    const handleServiceChange = (field, value, id) => {
        setServices(
            services.map((service) =>
                service.id === id ? { ...service, [field]: value } : service
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(services);
    };

    return (
        <div className="p-2">
            <h3 className="font-bold text-lg mb-3">
                Edit Special Day: {format(new Date(day.date), "PPP")}
            </h3>

            <form onSubmit={handleSubmit}>
                {errors[errorBag]?.services && (
                    <div className="text-red-800 text-sm mb-2">
                        {errors[errorBag].services}
                    </div>
                )}

                <div className="space-y-3 mb-4">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="border border-gray-200 p-3 rounded relative"
                        >
                            <button
                                type="button"
                                onClick={() => deleteService(service.id)}
                                className="absolute top-1 right-1 text-red-600 hover:text-red-800"
                                title="Remove service"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Name
                                </label>
                                <input
                                    type="text"
                                    value={service.service}
                                    onChange={(e) =>
                                        handleServiceChange(
                                            "service",
                                            e.target.value,
                                            service.id
                                        )
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                                />
                                {errors[errorBag]?.[
                                    `services.${index}.service`
                                ] && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {
                                            errors[errorBag][
                                                `services.${index}.service`
                                            ]
                                        }
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        From
                                    </label>
                                    <input
                                        type="time"
                                        value={service.from}
                                        onChange={(e) =>
                                            handleServiceChange(
                                                "from",
                                                e.target.value,
                                                service.id
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                                    />
                                    {errors[errorBag]?.[
                                        `services.${index}.from`
                                    ] && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {
                                                errors[errorBag][
                                                    `services.${index}.from`
                                                ]
                                            }
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        To
                                    </label>
                                    <input
                                        type="time"
                                        value={service.to}
                                        onChange={(e) =>
                                            handleServiceChange(
                                                "to",
                                                e.target.value,
                                                service.id
                                            )
                                        }
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                                    />
                                    {errors[errorBag]?.[
                                        `services.${index}.to`
                                    ] && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {
                                                errors[errorBag][
                                                    `services.${index}.to`
                                                ]
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Interval (minutes)
                                </label>
                                <select
                                    value={service.interval}
                                    onChange={(e) =>
                                        handleServiceChange(
                                            "interval",
                                            parseInt(e.target.value),
                                            service.id
                                        )
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                                >
                                    <option value={15}>15 min</option>
                                    <option value={30}>30 min</option>
                                    <option value={45}>45 min</option>
                                    <option value={60}>60 min</option>
                                    <option value={90}>90 min</option>
                                    <option value={120}>120 min</option>
                                </select>
                                {errors[errorBag]?.[
                                    `services.${index}.interval`
                                ] && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {
                                            errors[errorBag][
                                                `services.${index}.interval`
                                            ]
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addService}
                    className="mb-4 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Add Service
                </button>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={processing}
                    >
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};
