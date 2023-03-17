import Layout from "@/Layouts/Layout";
import { useEffect } from "react";
import AddDay from "../Components/AddDay";

const AddWeek = ({ defaultDays, errors }) => {
    // useEffect(() => {
    //     console.log(errors);
    // }, [errors]);
    useEffect(() => {
        console.log(defaultDays);
    }, [defaultDays]);

    return (
        <Layout>
            <div className="flex flex-col items-center">
                <h2 className="font-bold">Default Week</h2>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                    {
                        defaultDays.map((day)=>{
                            return <AddDay key={day.id} dayy={day} errors={errors} editable={true}/>
                        })
                    }
                    <AddDay errors={errors} />
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
