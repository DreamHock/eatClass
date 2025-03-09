import { FC, useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import { format } from "date-fns";
import { usePage } from "@inertiajs/react";

interface Service {
    id: number;
    service: string;
    from: string;
    to: string;
    interval: number;
}

interface ServiceInformationsProps {
    editable: boolean;
    day: string;
    index: number;
    ser: Service;
    deleteService: (id: number) => void;
    handleServiceChange: (updatedService: Partial<Service>, id: number) => void;
    errors: any;
}

interface AddSpecialServicesProps {
    editable?: boolean;
    day?: string;
    selectedDates?: string[];
    restaurant?: any;
    onSubmit?: (services: Service[]) => void;
    processing?: boolean;
    errors?: any;
}

const DEFAULT_SERVICE: Omit<Service, "id"> = {
    service: "",
    from: format(new Date(0, 0, 0, 12, 0), "HH:mm"),
    to: format(new Date(0, 0, 0, 12, 0), "HH:mm"),
    interval: 15,
};

const ServiceInformations: FC<ServiceInformationsProps> = ({
    editable,
    day,
    index,
    ser,
    deleteService,
    handleServiceChange,
    errors
}) => {
    const errorBag = editable ? `edit${day}` : "add";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        handleServiceChange({ [name]: value }, ser.id);
    };

    const fieldError = (field: string) => {
        const path = `services.${index}.${field}`;
        return errors[errorBag]?.[path];
    };

    return (
        <div className="flex items-center mb-2">
            <div className="bg-slate-200 p-3 rounded-l border-l border-t border-b border-slate-600 w-11/12">
                <div className="mb-2">
                    <input
                        type="text"
                        name="service"
                        placeholder="Service name"
                        value={ser.service}
                        onChange={handleInputChange}
                        className="w-full p-1 border rounded text-sm"
                    />
                    {fieldError("service") && (
                        <div className="text-red-500 text-xs mt-1">
                            {fieldError("service")}
                        </div>
                    )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label className="block text-xs text-gray-600">From</label>
                        <input
                            type="time"
                            name="from"
                            value={ser.from}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded text-sm"
                        />
                        {fieldError("from") && (
                            <div className="text-red-500 text-xs mt-1">
                                {fieldError("from")}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600">To</label>
                        <input
                            type="time"
                            name="to"
                            value={ser.to}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded text-sm"
                        />
                        {fieldError("to") && (
                            <div className="text-red-500 text-xs mt-1">
                                {fieldError("to")}
                            </div>
                        )}
                    </div>
                </div>
                
                <div>
                    <label className="block text-xs text-gray-600">Interval (minutes)</label>
                    <select
                        name="interval"
                        value={ser.interval}
                        onChange={handleInputChange}
                        className="w-full p-1 border rounded text-sm"
                    >
                        <option value={15}>15 min</option>
                        <option value={30}>30 min</option>
                        <option value={45}>45 min</option>
                        <option value={60}>60 min</option>
                        <option value={90}>90 min</option>
                        <option value={120}>120 min</option>
                    </select>
                    {fieldError("interval") && (
                        <div className="text-red-500 text-xs mt-1">
                            {fieldError("interval")}
                        </div>
                    )}
                </div>
            </div>
            <div
                onClick={() => deleteService(ser.id)}
                className="w-1/12 h-full rounded-r flex bg-red-200 hover:bg-red-300 border border-red-800 flex-1 justify-center items-center select-none text-red-800 font-extrabold cursor-pointer"
                role="button"
                aria-label="Delete service"
            >
                x
            </div>
        </div>
    );
};

const AddSpecialServices: FC<AddSpecialServicesProps> = ({
    editable = false,
    day = "special",
    selectedDates = [],
    restaurant,
    onSubmit,
    processing = false,
    errors = {}
}) => {
    const [services, setServices] = useState<Service[]>([
        { id: 1, ...DEFAULT_SERVICE }
    ]);
    const [submitButton, setSubmitButton] = useState<"add" | "edit" | "delete">("add");
    const errorBag = editable ? `edit${day}` : "add";

    const addService = () => {
        const newId = services.length > 0
            ? Math.max(...services.map(s => s.id)) + 1
            : 1;
            
        setServices([...services, { id: newId, ...DEFAULT_SERVICE }]);
    };

    const deleteService = (id: number) => {
        if (services.length > 1) {
            setServices(services.filter(service => service.id !== id));
        }
    };

    const handleServiceChange = (updatedService: Partial<Service>, id: number) => {
        setServices(
            services.map(service =>
                service.id === id ? { ...service, ...updatedService } : service
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(services);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="shadow-md p-4 flex flex-col bg-white rounded-md">
            <h2 className="text-lg font-medium mb-3">
                {selectedDates.length > 0 
                    ? `Special services for ${selectedDates.length} selected date(s)` 
                    : "Special services"}
            </h2>

            {/* Error messages */}
            {errors[errorBag]?.services && (
                <div className="text-red-800 text-sm mt-1 mb-2">
                    {errors[errorBag].services}
                </div>
            )}
            {errors[errorBag]?.selectedDates && (
                <div className="text-red-800 text-sm mt-1 mb-2">
                    {errors[errorBag].selectedDates}
                </div>
            )}

            <div className="font-medium text-sm mt-3 mb-2">Services:</div>

            {/* Service list */}
            {services.map((ser, index) => (
                <ServiceInformations
                    editable={editable}
                    day={day}
                    key={ser.id}
                    index={index}
                    ser={ser}
                    deleteService={deleteService}
                    handleServiceChange={handleServiceChange}
                    errors={errors}
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
                        disabled={processing}
                    >
                        Delete
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={() => setSubmitButton("edit")}
                        type="submit"
                        color="slate"
                        className="flex-1 font-medium rounded text-sm"
                        disabled={processing}
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
                    disabled={processing}
                >
                    Save Special Services
                </PrimaryButton>
            )}
        </form>
    );
};

export default AddSpecialServices;
