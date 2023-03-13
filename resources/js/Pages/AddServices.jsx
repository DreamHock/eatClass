import Layout from "@/Layouts/Layout";
import React from "react";
import Service from "./Service";

const AddServices = () => {
    return (
        <Layout>
            <div className=" flex flex-col items-center">
                <h2>Add service</h2>
                <div className="flex gap-2">
                    {Array.from({ length: 7 }).map((_, i) => {
                        return <Service key={i}/>;
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default AddServices;
