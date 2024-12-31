import { Card, Carousel } from "flowbite-react";
// import { BiCategoryAlt, BiLocationPlus } from "react-icons/Bi";
import { AiFillPhone } from "react-icons/ai";
import React from "react";

const Overview = ({ restaurant }) => {
    return (
        <div className="pt-2 mb-4">
            <div className="h-[570px] w-[900px] relative">
                <Carousel indicators={false} leftControl=" " rightControl=" ">
                    <img
                        src="https://b.zmtcdn.com/data/pictures/1/19357341/49e317ee4afe7b8cf6dc9423266cd02b.jpg"
                        alt="..."
                    />
                    <img
                        src="https://burgers-and-g.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-20-at-17.57.44.jpeg"
                        alt="..."
                    />
                    <img
                        src="https://www.edinburghnews.scotsman.com/webimg/b25lY21zOjZjYjdlNzJkLTY1YWUtNGJjZS1hYzY2LTVjN2Q3NWQ2NzFlNDo4NzY0NTkwZS1lYWQyLTQxYWYtYjQ2NS1iYWMzMjIzZDViMzg=.jpg?width=1200&enable=upscale"
                        alt="..."
                    />
                    <img
                        src="https://restaurantclicks.com/wp-content/uploads/2021/10/Juicy-cheese-burger.jpg"
                        alt="..."
                    />
                </Carousel>
                <div className=" absolute left-0 top-0 w-full h-full flex items-center">
                    <div className="opacity-50 bg-gray-900 rounded-2xl w-full h-full absolute"></div>
                    <div className="rouded-lg p-2 w-1/3  flex justify-center items-center rounded-lg shadow-sm bg-slate-100 text-white absolute ml-10">
                        <Card imgSrc={restaurant.logoPath}>
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
                                    {restaurant.adresse}
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
