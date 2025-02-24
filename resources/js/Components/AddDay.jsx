import { router, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import ServiceInformations from "./ServiceInformations";
import PrimaryButton from "./PrimaryButton";

const AddDay = ({ dayy, editable, restaurant }) => {
    useEffect(() => {
        console.log(dayy);
    }, []);
    const [day, setDay] = useState(dayy ? dayy.dayName : "day");
    const { errors } = usePage().props;
    const [services, setServices] = useState(
        dayy
            ? dayy.default_services
            : [
                  {
                      id: 1,
                      service: "",
                      from: format(new Date(0, 0, 0, 12, 0), "HH:mm"),
                      to: format(new Date(0, 0, 0, 12, 0), "HH:mm"),
                      interval: 15,
                  },
              ]
    );
    const [submitButton, setSubmitButton] = useState("");

    const addService = () => {
        const newService = {
            id: services.length > 0 ? services[services.length - 1].id + 1 : 1,
            from: format(new Date(0, 0, 0, 12, 0), "HH:mm"),
            to: format(new Date(0, 0, 0, 12, 0), "HH:mm"),
            interval: 15,
        };
        setServices([...services, newService]);
    };

    const handleServiceChange = (service, id) => {
        let desiredService = services.map((s) => {
            if (s.id === id) {
                s.service = service.service;
                s.from = service.from;
                s.to = service.to;
                s.interval = service.interval;
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
            router.post(
                route("admin.default-days.store", restaurant.id),
                {
                    restaurant_id: restaurant.id,
                    day: day,
                    services: services.map((service) => service),
                },
                {
                    errorBag: "add",
                }
            );
        } else if (submitButton === "delete") {
            router.delete(
                route("admin.default-days.destroy", {
                    restaurant: restaurant.id,
                    default_day: dayy.id,
                })
            );
        } else if (submitButton === "edit") {
            router.put(
                route("admin.default-days.update", {
                    restaurant: restaurant.id,
                    default_day: dayy.id,
                }),
                {
                    restaurant_id: restaurant.id,
                    day: day,
                    services: services.map((service) => service),
                },
                {
                    errorBag: `edit${day}`,
                }
            );
        }
    }
    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e);
            }}
            className="shadow-md p-4 w-64 flex flex-col bg-white rounded-md"
        >
            <select
                className="p-1 h-8 rounded cursor-pointer hover:bg-slate-100"
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
            {editable && errors[`edit${day}`] && (
                <div className="text-red-800">
                    {errors[`edit${day}`]["day"]}
                </div>
            )}
            {!editable && errors[`add`] && (
                <div className="text-red-800">{errors["add"]["day"]}</div>
            )}
            <div>sevices:</div>
            {services.map((ser, index) => {
                return (
                    <ServiceInformations
                        editable={editable}
                        day={day}
                        key={ser.id}
                        index={index}
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
                className={`cursor-pointer border border-slate-800 text-slate-800 hover:bg-slate-100 rounded h-8 shadow-sm p-1 flex items-center overflow-hidden w-full mb-2 text-2xl justify-end px-1"
                            `}
            >
                <div className="select-none flex justify-between w-full">
                    <div className="text-sm flex items-center">Add service</div>
                    <div>+</div>
                </div>
            </div>
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
