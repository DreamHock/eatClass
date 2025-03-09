import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import AddDay from "../Components/AddDay";

const AddWeek = ({ defaultDays, auth, restaurant }) => {

    return (
        <Authenticated auth={auth}>
            <div className="flex flex-col items-center mt-4">
                <h2 className="font-bold inline-block mb-4">DEFAULT WEEK</h2>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {defaultDays.map((defaultDay) => {
                        return (
                            <AddDay
                                key={defaultDay.id}
                                restaurant={restaurant}
                                defaultDay={defaultDay}
                                editable={true}
                            />
                        );
                    })}
                    <AddDay restaurant={restaurant}/>
                </div>
            </div>
        </Authenticated>
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
