import React from "react";

const NbrPersone = ({ data, setData }) => {
    const nbrPersonneSelect = () => {
        const options = [];
        for (let i = 1; i <= 10; i++) {
            options.push(
                <option value={i} key={i}>
                    {i}
                </option>
            );
        }
        return (
            <select
                onChange={(e) => setData("nbrPeople", e.target.value)}
                value={data.nbrPeople}
                className=" rounded hover:bg-slate-100 cursor-pointer"
                name="nbrPersonne"
                id="nbrPersonne"
            >
                {options}
            </select>
        );
    };
    return (
        <div className="flex flex-col w-1/2">
            <label htmlFor="nbrPersonne">Nombre de personne</label>
            {nbrPersonneSelect()}
        </div>
    );
};

export default NbrPersone;
