import Layout from "@/Layouts/Layout";
import { useState } from "react";
import AddDay from "./AddDay";

const AddWeek = (props) => {
    console.log(props.defaultServices)
    return (
        <Layout>
            <div className=" flex flex-col items-center">
                <h2 className="font-bold">Default Week</h2>
                <div className="flex gap-2">
                    <AddDay />
                </div>
            </div>
        </Layout>
    );
};

export default AddWeek;
// function AddButton() {
//     return (
//         <button className=" shadow-xl hover:bg-green-400 hover:text-white w-52 h-52 rounded text-9xl font-bold">
//             +
//         </button>
//     );
// }
