import Reservation from "@/Components/Reservation";
import Layout from "@/Layouts/Layout";
import { useState, useEffect } from "react";
// import OtherRestaurants from "./components/OtherRestaurants";
// import Menu from "./components/Menu";
// import Location from "./components/Location";
import Overview from "../../Restaurant/components/Overview";
import Menu from "../../Restaurant/components/Menu";
import Location from "../../Restaurant/components/Location";

const Restaurant = ({ restaurant, defaultDays }) => {
    // const [restaurant, setRestaurant] = useState(props.restaurant);

    useEffect(() => {
        console.log(restaurant);
        console.log(defaultDays);
    }, []);

    return (
        <Layout>
            <div className="flex gap-10">
                <div>
                    <Overview restaurant={restaurant}/>
                    <Menu />
                    <Location restaurant={restaurant}/>
                    {/* <OtherRestaurants /> */}
                </div>
                <Reservation
                    restaurant={restaurant}
                    defaultDays={defaultDays}
                />
            </div>
        </Layout>
    );
};

export default Restaurant;
