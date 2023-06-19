import React, { useState } from "react";

const Menu = () => {
    const [path, setPath] = useState("");
    return (
        <div className=" mb-4 w-[900px]">
            <div className=" text-2xl text-yellow-700">Menu</div>

            <div className="grid gap-4">
                {/* <div>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                        alt=""
                    />
                </div> */}
                <div className="grid grid-cols-5 gap-4">
                    <div className=" ">
                        <img
                            className=" max-w-full rounded-lg h-32"
                            src="https://cdn.eat-list.fr/establishment/menu/gallery_menu/69008-lyon-8/burger-world_112059_646.jpg"
                            alt=""
                        />
                    </div>
                    <div className=" h-32 overflow-hidden rounded-lg flex "  >
                        <img
                            className="w-full "
                            src="https://i.pinimg.com/736x/81/aa/71/81aa713c65db34b6a101780ed6179583.jpg"
                            alt=""
                          
                        />
                    </div>
                    <div>
                        <img
                            className="h-32 max-w-full rounded-lg"
                            src="https://www.feedthelion.co.uk/wp-content/uploads/2015/06/fat-burger-menu.jpg"
                            alt=""
                        />
                    </div>
                    <div className=" ">
                        <img
                            className="h-auto max-w-full rounded-lg"
                            src="https://s3-media0.fl.yelpcdn.com/bphoto/DbWxHAgz942Ojwn1vQ4Hxw/l.jpg"
                            alt=""
                        />
                    </div>
                    <div className=" ">
                        <img
                            className=" max-w-full rounded-lg h-32"
                            src="https://media-cdn.tripadvisor.com/media/photo-s/0a/82/46/82/overhead-menu.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
