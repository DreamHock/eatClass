import React from "react";

const Services = ({ services, setData, data }) => {
    return (
        <>
            <h3>Veuiller choisir un service</h3>
            <select
                name=""
                id="services"
                className=" mb-3 rounded cursor-pointer hover:bg-slate-100"
                defaultValue="services"
                onChange={(e) => setData('reservable_id', e.target.value)}
            >
                <option value="services" disabled>
                    Services
                </option>
                {services.length !== 0 &&
                    services.map((service) => {
                        return (
                            <>
                                <option key={service.id} value={service.id}>
                                    {service.service}
                                </option>
                            </>
                        );
                    })}
            </select>
        </>
    );
};

export default Services;
