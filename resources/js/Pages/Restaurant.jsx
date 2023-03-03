
import Reservation from "@/Components/Reservation";
import Layout from "@/Layouts/Layout";
import { useState } from "react";

const Restaurant = (props) => {
    const [restaurant, setRestaurant] = useState(props.restaurant);
    // const [services, setServices] = useState(restaurant[0].services);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    console.log(props);

    return (
        <Layout>
            <div>restaurant : {props.restaurant[0].id}</div>
            {/* <Reservation restaurant={restaurant} /> */}
            <Reservation restaurant={restaurant} />
        </Layout>
    );
};

export default Restaurant;
