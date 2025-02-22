import React, { useState } from "react";
import LightGallery from 'lightgallery/react';

// Import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// Import plugins if you need them
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const Menu = ({ menu }) => {
    return (
        <div className="mb-4 w-full">
            <div className="text-xl md:text-2xl text-yellow-700 mb-4">Menu</div>
            <div className="grid gap-4">
                <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                    elementClassNames="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                >
                    {menu.map((item, index) => (
                        <a 
                            key={index}
                            className="gallery-item flex justify-center items-center bg-white rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-xl border-2 border-yellow-500/20 hover:border-yellow-500"
                            data-src={`${route()["t"]["url"]}/${item.menuPath}`}
                        >
                            <img
                                className="w-full h-28 md:h-36 object-cover"
                                src={`${route()["t"]["url"]}/${item.menuPath}`}
                                alt="Menu item"
                            />
                        </a>
                    ))}
                </LightGallery>
            </div>
        </div>
    );
};

export default Menu;
