export default function PrimaryButton({
    className = "",
    disabled,
    children,
    color = "slate",
    ...props
}) {
    const colorVariants = {
        slate: "bg-slate-100 hover:bg-slate-200 border border-slate-800 text-slate-800 active:ring-slate-500",
        red: "bg-red-100 hover:bg-red-200 border border-red-800 text-red-800 active:ring-red-500",
        sky: "bg-sky-100 hover:bg-sky-200 border border-sky-800 text-sky-800 active:ring-sky-500",
        green: "bg-green-100 hover:bg-green-200 border border-green-800 text-green-800 active:ring-green-500",
    };
    return (
        <button
            {...props}
            className={
                `className=" ${
                    colorVariants[color]
                } py-2 px-2 rounded flex justify-center items-center  ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
