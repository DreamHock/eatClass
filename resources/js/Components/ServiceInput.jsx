import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
const ServiceInput = ({ ser, index, handleServiceChange, day, editable }) => {
    const { errors } = usePage().props;

    return (
        <>
            <div className="mb-2">
                <input
                    onChange={(e) => {
                        handleServiceChange(
                            {
                                ...ser,
                                service: e.target.value,
                            },
                            ser.id
                        );
                    }}
                    value={ser.service}
                    autoFocus
                    type="text"
                    placeholder="Enter a service"
                    className="border border-slate-900 rounded h-8 px-1 py-3 flex justify-end items-center shadow-sm w-full "
                />
            </div>
            {editable && errors[`edit${day}`] && (
                <div className="text-red-800">
                    {errors[`edit${day}`][`services.${index}.service`]}
                </div>
            )}
            {!editable && errors[`add`] && (
                <div className="text-red-800">
                    {errors[`add`][`services.${index}.service`]}
                </div>
            )}
        </>
    );
};

export default ServiceInput;
