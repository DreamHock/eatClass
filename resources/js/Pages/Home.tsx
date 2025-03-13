// import react from 'react';
import Guest from "@/Layouts/GuestLayout";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import {
    AiOutlineSearch,
    AiFillStar,
    AiOutlineEnvironment,
} from "react-icons/ai";
import { BiRestaurant } from "react-icons/bi";
import { MdDeliveryDining } from "react-icons/md";

// Add categories to props
const Home = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("");
    const [restaurants, setRestaurants] = useState(props.restaurants);

    // Update restaurants when props change
    useEffect(() => {
        setRestaurants(props.restaurants);
    }, [props.restaurants]);

    // Listen to search events from Layout
    useEffect(() => {
        let debounceTimer;

        const handleSearch = (e) => {
            setSearchTerm(e.detail);

            clearTimeout(debounceTimer);

            debounceTimer = setTimeout(() => {
                if (e.detail) {
                    router.get(
                        route("category.index"),
                        { query: e.detail }, // Changed from 'query' to 'q' to match backend
                        {
                            preserveState: true,
                            preserveScroll: true,
                            replace: true,
                        }
                    );
                } else {
                    router.get(route("category.index")); // Reset search
                }
            }, 300);
        };

        window.addEventListener("search", handleSearch);

        return () => {
            window.removeEventListener("search", handleSearch);
            clearTimeout(debounceTimer);
        };
    }, []); // Removed props.restaurants dependency

    // Add rating filter effect
    useEffect(() => {
        const handleRatingFilter = (e) => {
            if (e.detail) {
                console.log(e.detail);
                router.get(
                    route("category.index"),
                    { rating: e.detail },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    }
                );
            } else {
                router.get(route("category.index")); // Reset rating filter
            }
        };

        window.addEventListener("ratingFilter", handleRatingFilter);

        return () => {
            window.removeEventListener("ratingFilter", handleRatingFilter);
        };
    }, []);

    // Listen to category filter events
    useEffect(() => {
        const handleCategoryFilter = (e) => {
            if (e.detail) {
                router.get(
                    route("category.index"),
                    { category: e.detail },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    }
                );
            } else {
                router.get(route("category.index")); // Reset category filter
            }
        };

        window.addEventListener("categoryFilter", handleCategoryFilter);

        return () => {
            window.removeEventListener("categoryFilter", handleCategoryFilter);
        };
    }, []);

    // Filter restaurants based on price filter
    const filteredRestaurants = restaurants.filter((restaurant) => {
        if (priceFilter === "all") return true;
        if (priceFilter === "delivery") return restaurant.delivery;
        return restaurant.price_range === priceFilter;
    });

    return (
        <Layout
            showSearch={true}
            categories={props.categories}
            auth={props.auth}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section - Simplified without search */}
                <div className="mb-8 sm:mb-12 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                        Discover Amazing Restaurants
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
                        Find and book the best restaurants in your area
                    </p>
                </div>

                {/* Quick Filters */}
                <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
                    <button
                        className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                            priceFilter === "all"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-100"
                        }`}
                        onClick={() => setPriceFilter("all")}
                    >
                        <BiRestaurant /> All
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                            priceFilter === "delivery"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-100"
                        }`}
                        onClick={() => setPriceFilter("delivery")}
                    >
                        <MdDeliveryDining /> Delivery
                    </button>
                    {["$", "$$", "$$$"].map((price) => (
                        <button
                            key={price}
                            className={`px-4 py-2 rounded-full ${
                                priceFilter === price
                                    ? "bg-yellow-500 text-white"
                                    : "bg-gray-100"
                            }`}
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
                                    {restaurant.average_rating + " "}
                                    <AiFillStar className="inline text-yellow-500" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    {restaurant.name}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <AiOutlineEnvironment />
                                    <span className="text-sm">
                                        {restaurant.city}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {restaurant.category.category}
                                    </span>
                                    <button
                                        onClick={() =>
                                            router.get(
                                                `restaurants/${restaurant.id}`
                                            )
                                        }
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
                    <div className="text-center py-8 sm:py-12">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-600">
                            No restaurants found
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500">
                            Try adjusting your search criteria
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Home;
