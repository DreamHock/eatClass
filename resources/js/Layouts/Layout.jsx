import { Link } from "@inertiajs/react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-slate-100">
            <header>
                <Link href="/" className="">
                    <div>
                        <span className="text-8xl after:content-[''] after:inline-block after:bg-yellow-500 after:w-1.5 after:h-16 after:relative after:top-[0.5px]">
                            eat
                        </span>
                        <span className="text-4xl">class</span>
                    </div>
                </Link>
            </header>
            <div className="w-full sm:w-fit mt-6 px-6 py-4 bg-white shadow-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default Layout;
