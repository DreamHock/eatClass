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

type Category = {
    id: number;
    category: string;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.original;
            return (
                <Link
                    method="get"
                    href={route("admin.categories.edit", category.id)}
                    className="hover:underline"
                >
                    {category.category}
                </Link>
            );
        },
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
            const category = row.original;

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
                                method="delete"
                                href={route(
                                    "admin.categories.destroy",
                                    category.id
                                )}
                                only={["categories"]}
                            >
                                Manage Category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                method="get"
                                href={route(
                                    "admin.categories.show",
                                    category.id
                                )}
                            >
                                View category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    category.id.toString()
                                )
                            }
                        >
                            Copy Category ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="bg-red-200 text-red-800 hover:bg-red-400 text-center">
                            <Link
                                method="delete"
                                href={route(
                                    "admin.categories.destroy",
                                    category.id
                                )}
                                only={["categories"]}
                            >
                                Remove Category
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
