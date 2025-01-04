import React, { useState } from "react";

const Menu = ({ menu }) => {
    const [path, setPath] = useState("");
    return (
        <div className=" mb-4 w-[900px]">
            <div className=" text-2xl text-yellow-700">Menu</div>

            <div className="grid gap-4">
                <div className="grid grid-cols-5 gap-4">
                    {menu.map((item, index) => {
                        return (
                            <div className="flex justify-center items-center bg-yellow-500 rounded-lg overflow-hidden">
                                <img
                                    className=" max-w-full h-32"
                                    key={index}
                                    src={`${route()["t"]["url"]}/${
                                        item.menuPath
                                    }`}
                                    alt="..."
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Menu;
