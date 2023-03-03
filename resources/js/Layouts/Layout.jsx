import { Link, router } from "@inertiajs/react";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-sky-500 w-full p-3 text-white">
                <Link href='/' className="">
                    <span className="text-4xl after:content-[''] after:inline-block after:bg-orange-500 after:w-0.5 after:h-6 after:relative after:top-[0.5px]">
                        eat
                    </span>
                    <span className="text-2xl">class</span>
                </Link>
            </div>
            <>{children}</>
        </div>
    );
};

export default Layout;
