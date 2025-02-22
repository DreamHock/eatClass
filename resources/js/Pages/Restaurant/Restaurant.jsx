import Reservation from "@/Components/Reservation";
import Layout from "@/Layouts/Layout";
import { useState, useEffect } from "react";
import Overview from "./components/Overview";
import OtherRestaurants from "./components/OtherRestaurants";
import Menu from "./components/Menu";
import Location from "./components/Location";

const Restaurant = ({ restaurant, defaultDays, menu }) => {
    useEffect(() => {
        console.log(restaurant);
        console.log(defaultDays);
    }, []);

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 lg:px-8 min-h-screen">
                <div className="w-full lg:w-2/3">
                    <Overview restaurant={restaurant} menu={menu} />
                    <Menu menu={menu}/>
                    <Location restaurant={restaurant} />
                    {/* <OtherRestaurants /> */}
                </div>
                <div className="w-full lg:w-1/3 lg:sticky lg:top-4 lg:h-fit">
                    <Reservation
                        restaurant={restaurant}
                        defaultDays={defaultDays}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Restaurant;
