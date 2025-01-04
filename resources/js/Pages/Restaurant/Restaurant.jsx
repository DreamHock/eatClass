import Reservation from "@/Components/Reservation";
import Layout from "@/Layouts/Layout";
import { useState, useEffect } from "react";
import Overview from "./components/Overview";
import OtherRestaurants from "./components/OtherRestaurants";
import Menu from "./components/Menu";
import Location from "./components/Location";

const Restaurant = ({ restaurant, defaultDays, menu }) => {
    // const [restaurant, setRestaurant] = useState(props.restaurant);

    useEffect(() => {
        console.log(restaurant);
        console.log(defaultDays);
    }, []);

    return (
        <Layout>
            <div className="flex gap-10">
                <div>
                    <Overview restaurant={restaurant} menu={menu} />
                    <Menu menu={menu}/>
                    <Location restaurant={restaurant} />
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
