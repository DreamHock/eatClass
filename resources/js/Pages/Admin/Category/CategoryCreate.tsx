import Reservation from "@/Components/Reservation";
import Layout from "@/Layouts/Layout";
import Overview from "../../Restaurant/components/Overview";
import Menu from "../../Restaurant/components/Menu";
import Location from "../../Restaurant/components/Location";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { CategoryForm, RestaurantForm } from "./Components/CategoryForm";
import { Toaster } from "@/components/ui/sonner";

const CategoryCreate = ({ auth, category }) => {
    return (
        <>
            <Head title="Create Category" />
            <AuthenticatedLayout auth={auth}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-slate-900">
                                <CategoryForm  category={category}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </AuthenticatedLayout>
        </>
    );
};

export default CategoryCreate;
