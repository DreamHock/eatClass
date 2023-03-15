import Layout from "@/Layouts/Layout";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AddDay from "../Components/AddDay";

const AddWeek = () => {
    const [clicked, setClicked] = useState(false);
    const {errors} = usePage().props
    useEffect(() => {
        console.log(errors);
    }, [clicked]);
    return (
        <Layout>
            <div className=" flex flex-col items-center">
                <h2 className="font-bold">Default Week</h2>
                <div className="flex gap-2">
                    <AddDay />
                </div>
                <button onClick={() => setClicked(!clicked)}>click</button>
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
