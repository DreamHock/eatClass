import { Card, Carousel } from "flowbite-react";
// import { BiCategoryAlt, BiLocationPlus } from "react-icons/Bi";
import { AiFillPhone } from "react-icons/ai";
import React, { useEffect } from "react";
import { router } from "@inertiajs/react";

const Overview = ({ restaurant, menu }) => {
    useEffect(() => {
        console.log(menu);
    }, []);
    return (
        <div className="pt-2 mb-4">
            <div className="h-[570px] w-[900px] relative">
                <Carousel indicators={false} leftControl=" " rightControl=" ">
                    {menu.map((item, index) => {
                        return (
                            // <img
                            //     key={index}
                            //     src={`${route()["t"]["url"]}/${item.menuPath}`}
                            //     alt="..."
                            // />
                            <div className="h-full flex justify-center items-center bg-yellow-500">
                                <img
                                    className="h-full max-w-full"
                                    key={index}
                                    src={`${route()["t"]["url"]}/${
                                        item.menuPath
                                    }`}
                                    alt="..."
                                />
                            </div>
                        );
                    })}
                </Carousel>
                <div className=" absolute left-0 top-0 w-full h-full flex items-center">
                    <div className="opacity-50 bg-gray-900 rounded-2xl w-full h-full absolute"></div>
                    <div className="rouded-lg p-2 w-1/3  flex justify-center items-center rounded-lg shadow-sm bg-slate-100 text-white absolute ml-10">
                        <Card
                            imgSrc={`${route()["t"]["url"]}/${
                                restaurant.logoPath
                            }`}
                        >
                            <div>
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {restaurant.name}
                                </h5>
                                <div className="font-normal  text-yellow-700  flex items-center gap-1">
                                    {/* <BiCategoryAlt className="mb-[1px]" /> */}
                                    <div>{restaurant.category.category}</div>
                                </div>
                            </div>
                            <div className="font-normal text-gray-500 ">
                                <div className="flex items-center">
                                    <div className=" inline-block mr-1 mb-[3px]">
                                        {/* <BiLocationPlus /> */}
                                    </div>
                                    {restaurant.address}
                                </div>
                                {restaurant.city}
                            </div>
                            <div className="font-normal text-green-700 ">
                                <div className="flex items-center">
                                    <div className=" inline-block  mr-1 mb-[3px]">
                                        <AiFillPhone />
                                    </div>
                                    {restaurant.phone}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
