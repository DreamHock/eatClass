import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Link
                href={route("dashboard")}
                active={route().current("dashboard").toString()}
                className="relative bottom-[7px]"
            >
                <div>
                    <span className="  text-8xl after:content-[''] after:inline-block after:bg-yellow-500 after:w-1.5 after:h-16 after:relative after:top-[0.5px]">
                        eat
                    </span>
                    <span className="text-4xl">class</span>
                </div>
            </Link>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
