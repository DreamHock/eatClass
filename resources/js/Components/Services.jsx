import React from "react";

const Services = ({ setService, services }) => {
    return (
        <>
            <h3>Veuiller choisir un service</h3>
            <select
                name=""
                id="services"
                className="outline-none border-black mb-3 rounded"
                defaultValue="services"
                onChange={(e) => setService(e.target.value)}
            >
                <option value="services" disabled>
                    Services
                </option>
                {services.map((service) => {
                    return (
                        <option key={service.id} value={service.id}>
                            {service.service}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default Services;
