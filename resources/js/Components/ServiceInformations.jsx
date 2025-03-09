import ServiceInput from "./ServiceInput";
import ServiceTiming from "./ServiceTiming";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const ServiceInformations = ({ 
    editable, 
    day, 
    ser, 
    index, 
    deleteService, 
    handleServiceChange 
}) => {
    const { errors } = usePage().props;
    const [service, setService] = useState({
        service: ser.service || "",
        from: ser.from || format(new Date(0, 0, 0, 12, 0), "HH:mm"),
        to: ser.to || format(new Date(0, 0, 0, 12, 0), "HH:mm"),
        interval: ser.interval || 15,
    });

    // Update parent component when service changes
    useEffect(() => {
        handleServiceChange(service, ser.id);
    }, [service]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setService(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const errorBag = editable ? `edit${day}` : "add";
    const fieldError = (field) => {
        const path = `services.${index}.${field}`;
        return errors[errorBag]?.[path];
    };

    return (
        <div className="border border-slate-300 rounded p-2 mb-2 bg-slate-200">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Service {index + 1}</h3>
                <button
                    type="button"
                    onClick={() => deleteService(ser.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    ✕
                </button>
            </div>
            
            <div className="space-y-2">
                {/* Service Name */}
                <div>
                    <input
                        type="text"
                        name="service"
                        placeholder="Service name"
                        value={service.service}
                        onChange={handleInputChange}
                        className="w-full p-1 border rounded text-sm"
                    />
                    {fieldError("service") && (
                        <div className="text-red-500 text-xs mt-1">
                            {fieldError("service")}
                        </div>
                    )}
                </div>
                
                {/* Time Range */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs text-gray-600">From</label>
                        <input
                            type="time"
                            name="from"
                            value={service.from}
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
                            value={service.to}
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
                
                {/* Interval */}
                <div>
                    <label className="block text-xs text-gray-600">Interval (minutes)</label>
                    <select
                        name="interval"
                        value={service.interval}
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
        </div>
    );
};

export default ServiceInformations;
