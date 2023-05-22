import { useEffect, useState } from "react";

export default function SecondaryButton({
    type = "button",
    className = "",
    color = "slate",
    disabled,
    children,
    ...props
}) {
    // let colors = `bg-${color}-100 hover:bg-${color}-200 border-${color}-800 text-${color}-800`
    const colorVariants = {
        slate: "bg-slate-100 hover:bg-slate-200 border border-slate-800 text-slate-800 active:ring-slate-500",
        red: "bg-red-100 hover:bg-red-200 border border-red-800 text-red-800 active:ring-red-500",
        sky: "bg-sky-100 hover:bg-sky-200 border border-sky-800 text-sky-800 active:ring-sky-500",
        green: "bg-green-100 hover:bg-green-200 border border-green-800 text-green-800 active:ring-green-500",
    };

    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 rounded-md font-semibold uppercase tracking-widest shadow-sm focus:outline-none ${
                    colorVariants[color]
                } active:ring-2 active:ring-offset-2 disabled:opacity-25 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
