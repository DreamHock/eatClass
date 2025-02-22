import { Card, Carousel } from "flowbite-react";
// import { BiCategoryAlt, BiLocationPlus } from "react-icons/Bi";
import { AiFillPhone } from "react-icons/ai";
import React, { useEffect } from "react";
import { router } from "@inertiajs/react";

const Overview = ({ restaurant, menu }) => {
    return (
        <div className="pt-2 mb-4">
            {/* Card for small screens */}
            <div className="md:hidden mb-4">
                <Card
                    className="bg-slate-100 w-full"
                    imgSrc={`${route()["t"]["url"]}/${restaurant.logoPath}`}
                >
                    <div>
                        <h5 className="text-xl font-bold tracking-tight text-gray-900">
                            {restaurant.name}
                        </h5>
                        <div className="font-normal text-yellow-700 flex items-center gap-1">
                            <div>{restaurant.category.category}</div>
                        </div>
                    </div>
                    <div className="font-normal text-gray-500 text-sm">
                        <div className="flex items-center">
                            {restaurant.address}
                        </div>
                        {restaurant.city}
                    </div>
                    <div className="font-normal text-green-700 flex items-center gap-2">
                        <AiFillPhone />
                        <span className="text-sm">{restaurant.phone}</span>
                    </div>
                </Card>
            </div>

            {/* Carousel and overlay card for large screens only */}
            <div className="hidden md:block h-[570px] w-full relative">
                <Carousel indicators={false} leftControl=" " rightControl=" ">
                    {menu.map((item, index) => (
                        <div key={index} className="h-full flex justify-center items-center bg-yellow-500">
                            <img
                                className="h-full w-full object-cover"
                                src={`${route()["t"]["url"]}/${item.menuPath}`}
                                alt="..."
                            />
                        </div>
                    ))}
                </Carousel>
                <div className="absolute left-0 top-0 w-full h-full flex items-center">
                    <div className="opacity-50 bg-gray-900 rounded-2xl w-full h-full absolute z-0"></div>
                    <div className="w-1/3 md:ml-10 z-10">
                        <Card
                            className="bg-slate-100"
                            imgSrc={`${route()["t"]["url"]}/${restaurant.logoPath}`}
                        >
                            <div>
                                <h5 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                                    {restaurant.name}
                                </h5>
                                <div className="font-normal text-yellow-700 flex items-center gap-1">
                                    <div>{restaurant.category.category}</div>
                                </div>
                            </div>
                            <div className="font-normal text-gray-500 text-sm md:text-base">
                                <div className="flex items-center">
                                    {restaurant.address}
                                </div>
                                {restaurant.city}
                            </div>
                            <div className="font-normal text-green-700 flex items-center gap-2">
                                <AiFillPhone />
                                <span className="text-sm md:text-base">{restaurant.phone}</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
