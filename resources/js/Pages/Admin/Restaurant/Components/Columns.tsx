import { ColumnDef } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Restaurant from "../../../Restaurant/Restaurant";
import { Link } from "@inertiajs/react";
import { ro } from "date-fns/locale";

type Category = {
    id: number;
    category: string;
    created_at: string;
    updated_at: string;
};

type Restaurant = {
    id: number;
    name: string;
    city: string;
    updated_at: string;
    category_id: number;
    category: Category;
};

export const columns: ColumnDef<Restaurant>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const restaurant = row.original;
            return (
                <Link
                    method="get"
                    href={route("admin.restaurants.edit", restaurant.id)}
                    className="hover:underline"
                >
                    {restaurant.name}
                </Link>
            );
        },
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "category.category",
        header: "Category",
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => new Date(row.getValue("updated_at")).toDateString(),
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const restaurant = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link
                                method="get"
                                href={route(
                                    "admin.default-days.create",
                                    restaurant.id
                                )}
                                only={["restaurants"]}
                            >
                                Manage the week
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                method="get"
                                href={route(
                                    "admin.special-services.create",
                                    restaurant.id
                                )}
                                only={["restaurants"]}
                            >
                                Manage special days
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                method="get"
                                href={route(
                                    "admin.restaurants.show",
                                    restaurant.id
                                )}
                            >
                                View restaurant
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    restaurant.id.toString()
                                )
                            }
                        >
                            Copy Restaurant ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="bg-red-200 text-red-800 hover:bg-red-400 text-center">
                            <Link
                                method="delete"
                                href={route(
                                    "admin.restaurants.destroy",
                                    restaurant.id
                                )}
                                only={["restaurants"]}
                            >
                                Remove Restaurant
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
