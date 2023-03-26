import ServiceInput from "./ServiceInput";
import ServiceTiming from "./ServiceTiming";
const ServiceInformations = ({
    editable,
    day,
    ser,
    deleteService,
    handleServiceChange,
    index,
}) => {
    return (
        <div className="flex items-center mb-2">
            <div className="bg-gray-200 p-3 rounded-l border-l border-t border-b border-gray-600 w-11/12">
                <ServiceInput
                    editable={editable}
                    day={day}
                    ser={ser}
                    index={index}
                    handleServiceChange={handleServiceChange}
                />
                <ServiceTiming
                    editable={editable}
                    index={index}
                    day={day}
                    ser={ser}
                    handleServiceChange={handleServiceChange}
                />
            </div>
            <div
                onClick={() => {
                    deleteService(ser.id);
                }}
                className=" w-1/12 h-full rounded-r flex bg-red-200 hover:bg-red-300 border border-red-800 flex-1 justify-center items-center select-none text-red-800 font-extrabold cursor-pointer"
            >
                x
            </div>
        </div>
    );
};

export default ServiceInformations;
