import { useState } from "react";

const Service = () => {
    const [day, setDay] = useState("day");
    const [length, setLength] = useState(1);

    return (
        <div className="shadow-md p-4 w-52 flex flex-col">
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
            {Array.from({ length: length }).map((_, index) => {
                return (
                    <ServiceInput
                        key={index}
                        index={index}
                        length={length}
                        setLength={setLength}
                    />
                );
            })}
        </div>
    );
};

export default Service;

const ServiceInput = ({ setLength, length, index }) => {
    const [inputActive, setInputActive] = useState(false);
    const [service, setService] = useState("");
    const [isLast, setIsLast] = useState(index + 1 === length);

    const handleEnterClick = (e) => {
        service && setInputActive(false);
    };

    const handleNewInput = () => {
        isLast && setLength(length + 1);
        setIsLast(false)
    };
    return (
        <div className="mb-2">
            {inputActive ? (
                <input
                    onChange={(e) => {
                        setService(e.target.value);
                    }}
                    onKeyUp={(e) => e.key === 'Enter' && (handleEnterClick(e), handleNewInput())}
                    value={service}
                    autoFocus
                    onBlur={() => {
                        !service && setInputActive(false);
                    }}
                    // onFocus={}
                    type="text"
                    placeholder="service"
                    className="border border-slate-900 rounded h-8 p-1 flex justify-end px-1 items-center shadow-sm "
                />
            ) : (
                <div
                    onClick={() => {
                        setInputActive(true);
                    }}
                    className={`border border-slate-900 rounded h-8 shadow-sm p-1 flex items-center overflow-hidden ${
                        !service && "text-slate-400 text-2xl justify-end px-1"
                    }`}
                >
                    {!service ? <div className="select-none">+</div> : service}
                </div>
            )}
        </div>
    );
};
