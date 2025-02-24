// import react from 'react';
import Guest from "@/Layouts/GuestLayout";
import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
<<<<<<< Updated upstream:resources/js/Pages/Home.jsx
import { AiOutlineSearch, AiFillStar, AiOutlineEnvironment } from "react-icons/ai";
import { BiRestaurant } from "react-icons/bi";
import { MdDeliveryDining } from "react-icons/md";

const Home = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");
    const allRestaurants = props.categories.flatMap(cat => cat.restaurants);
    
    const filteredRestaurants = allRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Listen to search events from Layout
=======
import Restaurant from "./Restaurant/Restaurant";

const Home = (props) => {
    const [categories, setCategories] = useState(props.categories);
    const [fCategory, setFCategory] = useState("category");
    const [map, setMap] = useState("");

    // const {data, setData, processing, post} = useForm()

    useEffect(() => {
        console.log(props.categories, props.restaurants);

        axios
            .post(route("dynamic-map"), {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(
                    // props.restaurants
                    [
                        {
                            id: 1,
                            latitude: 34.0522,
                            longitude: -118.2437,
                            price: 150,
                        },
                        {
                            id: 2,
                            latitude: 40.7128,
                            longitude: -74.006,
                            price: 200,
                        },
                        {
                            id: 3,
                            latitude: 51.5074,
                            longitude: -0.1278,
                            price: 180,
                        },
                        {
                            id: 4,
                            latitude: 48.8566,
                            longitude: 2.3522,
                            price: 220,
                        },
                        {
                            id: 5,
                            latitude: 35.6895,
                            longitude: 139.6917,
                            price: 250,
                        },
                    ]
                ), // body data type must match "Content-Type" header
            })
            .then((res) => {
                console.log(res.data);
                return res.data;
            })
            .then((url) => {
                // document.getElementById("mapFrame").src = url;
            });
    }, []);

>>>>>>> Stashed changes:resources/js/Pages/Home.tsx
    useEffect(() => {
        const handleSearch = (e) => setSearchTerm(e.detail);
        window.addEventListener('search', handleSearch);
        return () => window.removeEventListener('search', handleSearch);
    }, []);

    return (
<<<<<<< Updated upstream:resources/js/Pages/Home.jsx
        <Layout showSearch={true}>
            <div className="max-w-7xl mx-auto">
                {/* Hero Section - Simplified without search */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Discover Amazing Restaurants
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Find and book the best restaurants in your area
                    </p>
                </div>

                {/* Quick Filters */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <button 
                        className={`px-4 py-2 rounded-full flex items-center gap-2 ${priceFilter === 'all' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}
                        onClick={() => setPriceFilter('all')}
                    >
                        <BiRestaurant /> All
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-full flex items-center gap-2 ${priceFilter === 'delivery' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}
                        onClick={() => setPriceFilter('delivery')}
                    >
                        <MdDeliveryDining /> Delivery
                    </button>
                    {['$', '$$', '$$$'].map(price => (
                        <button 
                            key={price}
                            className={`px-4 py-2 rounded-full ${priceFilter === price ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}
                            onClick={() => setPriceFilter(price)}
                        >
                            {price}
                        </button>
                    ))}
                </div>

                {/* Restaurant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={restaurant.logoPath} 
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold shadow-md">
                                    4.5 <AiFillStar className="inline text-yellow-500" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <AiOutlineEnvironment />
                                    <span className="text-sm">{restaurant.city}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {props.categories.find(cat => 
                                            cat.restaurants.some(r => r.id === restaurant.id)
                                        )?.category}
                                    </span>
                                    <button
                                        onClick={() => router.get(`restaurants/${restaurant.id}`)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                                    >
                                        View Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredRestaurants.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-gray-600">No restaurants found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                )}
=======
        <Layout>
            <div className="flex flex-col items-center min-w-[1024px] min-h-screen">
                <header className="flex m-3">
                    <select
                        className="rounded hover:bg-slate-100 cursor-pointer"
                        value={fCategory}
                        onChange={(e) => setFCategory(e.target.value)}
                    >
                        <>
                            <option value="category" defaultValue>
                                Category
                            </option>
                            {props.categories.map((cat) => {
                                return (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.category}
                                    </option>
                                );
                            })}
                        </>
                    </select>
                </header>
                <div className="flex gap-10">
                    <section>
                        {props.restaurants.map((restaurant) => {
                            return (
                                <div
                                    key={restaurant.id}
                                    className="mb-3 w-[400px] flex justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded-md shadow-xl group hover:shadow-2xl"
                                >
                                    <div className="w-[200px] h-[200px] overflow-hidden">
                                        <img
                                            src={restaurant.logoPath}
                                            alt="..."
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className=""></div>
                                        <p className="mb-2 font-bold">
                                            {restaurant.name}
                                        </p>
                                        <p className="text-sm leading-5 text-slate-900">
                                            {restaurant.city}
                                        </p>
                                        <p className="text-xs leading-5 text-slate-600">
                                            {restaurant.category.category}
                                        </p>
                                    </div>
                                    <div className="flex items-center mx-3">
                                        <button
                                            onClick={() => {
                                                router.get(
                                                    `restaurants/${restaurant.id}`
                                                );
                                            }}
                                            className="bg-green-500 hover:bg-green-600 duration-200 py-1 px-2 text-white rounded"
                                        >
                                            View Restaurant
                                        </button>
                                    </div>
                                    {/* <div className=" bg-slate-600 w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" /> */}
                                </div>
                            );
                        })}
                    </section>
                    <iframe
                        id="mapFrame"
                        src="child.html"
                        width="500"
                        height="300"
                    ></iframe>
                </div>
>>>>>>> Stashed changes:resources/js/Pages/Home.tsx
            </div>
        </Layout>
    );
};

export default Home;
