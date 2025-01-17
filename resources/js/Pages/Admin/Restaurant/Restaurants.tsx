import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { DataTable } from "../../../Components/DataTable";
import { columns } from "./Components/Columns";
import { Button } from "@/components/ui/button";

export default function Resturants({ auth, restaurants }) {
    useEffect(() => {
        console.log(restaurants);
    }, []);
    return (
        <>
            <Head title="Resturants" />
            <AuthenticatedLayout auth={auth}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-slate-900">
                                <div className="flex justify-end mb-2">
                                    <Link
                                        href={route("admin.restaurants.create")}
                                    >
                                        <Button>Add New Restaurant</Button>
                                    </Link>
                                </div>
                                <DataTable
                                    data={restaurants}
                                    columns={columns}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
