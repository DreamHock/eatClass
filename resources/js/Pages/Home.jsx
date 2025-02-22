// import react from 'react';
import Guest from "@/Layouts/GuestLayout";
import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
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
    useEffect(() => {
        const handleSearch = (e) => setSearchTerm(e.detail);
        window.addEventListener('search', handleSearch);
        return () => window.removeEventListener('search', handleSearch);
    }, []);

    return (
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
            </div>
        </Layout>
    );
};

export default Home;
