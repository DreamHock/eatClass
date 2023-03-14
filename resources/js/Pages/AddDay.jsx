import { useState } from "react";

const AddDay = () => {
    const [day, setDay] = useState("day");
    const [services, setServices] = useState([{ id: 1, service: "" }]);

    const addService = (service, index) => {
        if (service && index + 1 === services.length) {
            const newService = {
                id: services[services.length - 1].id + 1,
                service: "",
            };
            setServices([...services, newService]);
        }
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

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
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
                <option value="monday">Tuesday</option>
                <option value="monday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select>
            <div>sevices:</div>
            {services.map((ser, index) => {
                return (
                    <ServiceInput
                        index={index}
                        ser={ser}
                        key={ser.id}
                        addService={addService}
                        deleteService={deleteService}
                    />
                );
            })}

            <button
                type="button"
                className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded text-sm px-5 py-2.5"
            >
                Add day
            </button>
        </form>
    );
};

export default AddDay;

const ServiceInput = ({ ser, addService, deleteService, index }) => {
    const [inputActive, setInputActive] = useState(false);
    const [service, setService] = useState("");

    const handleEnterClick = (e) => {
        service && setInputActive(false);
    };

    return (
        <div className="mb-2 flex relative">
            {inputActive ? (
                <input
                    onChange={(e) => {
                        setService(e.target.value);
                    }}
                    onKeyUp={(e) =>
                        e.key === "Enter" &&
                        (handleEnterClick(e), addService(service, index))
                    }
                    value={service}
                    autoFocus
                    onBlur={() => {
                        !service && setInputActive(false);
                    }}
                    // onFocus={}
                    type="text"
                    placeholder="service"
                    className="border border-slate-900 rounded h-8 p-1 flex justify-end items-center shadow-sm w-full"
                />
            ) : (
                <div
                    onClick={() => {
                        setInputActive(true);
                    }}
                    className={`border border-slate-900 rounded h-8 shadow-sm p-1 flex items-center overflow-hidden w-full ${
                        !service && "text-slate-400 text-2xl justify-end px-1"
                    }`}
                >
                    {!service ? <div className="select-none">+</div> : service}
                </div>
            )}
            <div
                onClick={() => {
                    deleteService(ser.id);
                }}
                className="flex justify-center items-center absolute right-[-10px] top-1 select-none text-red-600 font-extrabold"
            >
                x
            </div>
        </div>
    );
};
