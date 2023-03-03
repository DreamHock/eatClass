// import react from 'react';
import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

const Home = (props) => {
    const [categories, setCategories] = useState(props.categories);
    const [fCategory, setFCategory] = useState("all");

    // const {data, setData, processing, post} = useForm()

    useEffect(() => {
        console.log(fCategory);
        if (fCategory !== "all") {
            const fCat = props.categories.filter((cat) => {
                return cat.id == fCategory;
            });
            setCategories(fCat);
        } else {
            setCategories(props.categories);
        }
    }, [fCategory]);

    return (
        <Layout>
            <div className="flex flex-col items-center">
                <header className="flex m-3">
                    <h2>Home</h2>
                    <select
                        name=""
                        id=""
                        value={fCategory}
                        onChange={(e) => setFCategory(e.target.value)}
                    >
                        <>
                            <option value="all" defaultValue>
                                All
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
                <section>
                    {categories.map((category) => {
                        return category.restaurants.map((restaurant) => {
                            return (
                                <div
                                    key={restaurant.id}
                                    className="mb-3 w-96 flex justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl"
                                >
                                    <div className="p-5">
                                        <div className=""></div>
                                        <p className="mb-2 font-bold">
                                            {restaurant.name}
                                        </p>
                                        <p className="text-sm leading-5 text-gray-900">
                                            {restaurant.city}
                                        </p>
                                        <p className="text-xs leading-5 text-gray-600">
                                            {category.category}
                                        </p>
                                    </div>
                                    <div className="flex items-center mx-3">
                                        <button
                                            onClick={() => {
                                                router.get(
                                                    `restaurants/${restaurant.id}`
                                                );
                                            }}
                                            className="bg-green-500 hover:bg-green-600 duration-200 w-16 text-white rounded"
                                        >
                                            Reserve
                                        </button>
                                    </div>
                                    {/* <div className=" bg-slate-600 w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" /> */}
                                </div>
                            );
                        });
                    })}
                </section>
            </div>
        </Layout>
    );
};

export default Home;
