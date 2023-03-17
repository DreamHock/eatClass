import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

const AddDay = ({ errors, dayy, editable }) => {
    const [day, setDay] = useState(dayy ? dayy.dayName : "day");
    const [services, setServices] = useState(
        dayy ? dayy.default_services : [{ id: "", service: "" }]
    );
    const [submitButton, setSubmitButton] = useState("");

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const addService = () => {
        const newService = {
            id: services.length > 0 ? services[services.length - 1].id + 1 : 1,
            service: "",
        };
        setServices([...services, newService]);
    };

    const handleServiceChange = (service, id) => {
        let desiredService = services.map((s) => {
            if (s.id === id) {
                s.service = service;
            }
            return s;
        });
        setServices(desiredService);
    };

    const deleteService = (id) => {
        services.length > 1
            ? setServices(
                  services.filter((service) => {
                      return service.id != id;
                  })
              )
            : null;
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (submitButton === "add") {
            router.post("/defaultDays", {
                restaurant_id: 1,
                day,
                services: services.map((service) => service.service),
            });
        } else if (submitButton === "delete") {
            router.delete(`/defaultDays/${dayy.id}`);
        } else if (submitButton === "edit") {
            router.put(`/defaultDays/${dayy.id}`, {
                restaurant_id: 1,
                day: day,
                services: services.map((service) => service.service),
            });
        }
    }
    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e);
            }}
            className="shadow-md p-4 w-52 flex flex-col"
        >
            <select
                className="p-1 h-8 rounded"
                onChange={(e) => setDay(e.target.value)}
                value={day}
            >
                <option value="day" disabled>
                    Day
                </option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select>
            <div className="text-red-600">{errors.day}</div>
            <div>sevices:</div>
            {services.map((ser, index) => {
                return (
                    <ServiceInput
                        key={ser.id}
                        index={index}
                        errors={errors}
                        ser={ser}
                        deleteService={deleteService}
                        handleServiceChange={handleServiceChange}
                    />
                );
            })}

            <div
                onClick={() => {
                    addService();
                }}
                className={`border border-slate-900 rounded h-8 shadow-sm p-1 flex items-center overflow-hidden w-full mb-2 text-slate-400 text-2xl justify-end px-1"
                            `}
            >
                <div className="select-none">+</div>
            </div>
            {editable ? (
                <div className="flex gap-2">
                    <button
                        onClick={() => setSubmitButton("delete")}
                        type="submit"
                        className="flex-1 focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded text-sm px-5 py-2"
                    >
                        delete
                    </button>
                    <button
                        onClick={() => setSubmitButton("edit")}
                        type="submit"
                        className="flex-1 focus:outline-none text-white bg-sky-500 hover:bg-sky-600 font-medium rounded text-sm px-5 py-2"
                    >
                        edit
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setSubmitButton("add")}
                    type="submit"
                    className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded text-sm px-5 py-2"
                >
                    Add day
                </button>
            )}
        </form>
    );
};
export default AddDay;

const ServiceInput = ({
    ser,
    deleteService,
    handleServiceChange,
    errors,
    index,
}) => {
    return (
        <div>
            <div className="mb-2 flex relative">
                <input
                    onChange={(e) => {
                        // setService(e.target.value);
                        handleServiceChange(e.target.value, ser.id);
                    }}
                    value={ser.service}
                    autoFocus
                    type="text"
                    placeholder="Enter a service"
                    className="border border-slate-900 rounded h-8 p-1 flex justify-end items-center shadow-sm w-full"
                />
                <div
                    onClick={() => {
                        deleteService(ser.id);
                    }}
                    className="flex justify-center items-center absolute right-[-11px] top-1 select-none text-red-600 font-extrabold cursor-pointer"
                >
                    x
                </div>
            </div>
            <div className="text-red-600">{errors[`services.${index}`]}</div>
        </div>
    );
};
