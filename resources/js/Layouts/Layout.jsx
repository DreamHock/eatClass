import { Link } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import {
    AiOutlineSearch,
    AiOutlineFilter,
    AiOutlineHeart,
    AiOutlineUser,
    AiOutlineLogout,
} from "react-icons/ai";
import { BiRestaurant } from "react-icons/bi";

// Add these imports for the dropdown components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";

const Layout = ({ children, showSearch = false, categories = [], auth }) => {
    const [showFilters, setShowFilters] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Add rating filter handler
    const handleRatingChange = (e) => {
        const rating = e.target.value;
        setSelectedRating(rating);
        window.dispatchEvent(
            new CustomEvent("ratingFilter", { detail: rating })
        );
    };

    // Add category filter handler
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        window.dispatchEvent(
            new CustomEvent("categoryFilter", { detail: categoryId })
        );
    };

    // Add search handler that can be passed to children
    const handleSearch = (value) => {
        setSearchTerm(value);
        // Emit search event that Home component can listen to
        window.dispatchEvent(new CustomEvent("search", { detail: value }));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="sticky top-0 z-50 bg-white shadow-md px-4 lg:px-8 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-bold text-yellow-500 after:content-[''] after:inline-block after:bg-yellow-500 after:w-0.5 after:h-8 after:ml-1">
                                eat
                            </span>
                            <span className="text-2xl text-gray-700 ml-1">
                                class
                            </span>
                        </div>
                    </Link>

                    {showSearch && (
                        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    placeholder="Search restaurants, cuisines, or locations..."
                                    className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-yellow-500"
                                />
                                <AiOutlineSearch className="absolute right-4 top-3 text-gray-400" />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-6">
                        {showSearch && (
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-1 ${
                                    showFilters
                                        ? "text-yellow-500"
                                        : "text-gray-600 hover:text-yellow-500"
                                }`}
                            >
                                <AiOutlineFilter className="text-xl" />
                                <span className="hidden md:inline">
                                    Filters
                                </span>
                            </button>
                        )}
                        <Link
                            href="/favorites"
                            className="text-gray-600 hover:text-yellow-500"
                        >
                            <div className="flex items-center gap-1">
                                <AiOutlineHeart className="text-xl" />
                                <span className="hidden md:inline">
                                    Favorites
                                </span>
                            </div>
                        </Link>

                        {auth?.user ? (
                            <DropdownMenu onOpenChange={setDropdownOpen}>
                                <DropdownMenuTrigger className="text-gray-600 hover:text-yellow-500 flex items-center gap-1 focus:outline-none">
                                    <AiOutlineUser className="text-xl" />
                                    <span className="hidden md:inline text-sm">
                                        {auth.user.name}
                                    </span>
                                    {dropdownOpen ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                >
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full text-left hover:cursor-pointer"
                                        >
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                href={route("login")}
                                className="text-gray-600 hover:text-yellow-500"
                            >
                                <AiOutlineUser className="text-xl" />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Search - Only show when showSearch is true */}
            {showSearch && (
                <div className="md:hidden px-4 py-3 bg-white border-t">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-yellow-500"
                        />
                        <AiOutlineSearch className="absolute right-4 top-3 text-gray-400" />
                    </div>
                </div>
            )}

            {/* Filters - Only show when showSearch is true */}
            {showSearch && showFilters && (
                <div className="bg-white shadow-md p-4 lg:p-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
                        <select
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All Cuisines</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                        <select
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
                            value={selectedRating}
                            onChange={handleRatingChange}
                        >
                            <option value="">All Ratings</option>
                            <option value="4">4+ Stars</option>
                            <option value="3">3+ Stars</option>
                            <option value="2">2+ Stars</option>
                        </select>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold mb-3">About</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>
                                    <Link href="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/careers">Careers</Link>
                                </li>
                                <li>
                                    <Link href="/blog">Blog</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Support</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>
                                    <Link href="/help">Help Center</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Contact Us</Link>
                                </li>
                                <li>
                                    <Link href="/faq">FAQ</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Legal</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>
                                    <Link href="/terms">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link href="/privacy">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="/cookies">Cookie Policy</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Follow Us</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>
                                    <Link href="#">Facebook</Link>
                                </li>
                                <li>
                                    <Link href="#">Twitter</Link>
                                </li>
                                <li>
                                    <Link href="#">Instagram</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
