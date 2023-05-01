import Reservation from "@/Components/Reservation";
import Layout from "@/Layouts/Layout";
import { useState, useEffect } from "react";

const Restaurant = ({ restaurant, defaultDays }) => {
    // const [restaurant, setRestaurant] = useState(props.restaurant);

    useEffect(() => {
        console.log(restaurant);
        console.log(defaultDays);
    }, []);

    return (
        <Layout>
            <div>restaurant : {restaurant.id}</div>
            {/* <Reservation restaurant={restaurant} /> */}
            <Reservation restaurant={restaurant} defaultDays={defaultDays}/>
        </Layout>
    );
};

export default Restaurant;
