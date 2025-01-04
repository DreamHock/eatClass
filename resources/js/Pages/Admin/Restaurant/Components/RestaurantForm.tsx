import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FC, useEffect } from "react";
import { router } from "@inertiajs/react";

export const RestaurantForm: FC<{ categories: any[] }> = ({ categories }) => {
    const ACCEPTED_IMAGE_TYPES = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];
    const MAX_IMAGE_SIZE = 4; //In MegaBytes

    const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
        const result = sizeInBytes / (1024 * 1024);
        return +result.toFixed(decimalsNum);
    };

    const formSchema = z.object({
        name: z.string().nonempty({ message: "Restaurant name is required" }),
        city: z.string().nonempty({ message: "City is required" }),
        category_id: z.string({ message: "Category is required" }),
        phone: z.string().nonempty({ message: "Phone number is required" }),
        address: z.string().nonempty({ message: "Address is required" }),
        location: z
            .string()
            .nonempty({ message: "Google maps location is required" }),
        logo: z
            .custom<FileList>()
            .refine((files) => {
                return files?.length > 0;
            }, "Logo is required")
            .refine((files) => {
                return Array.from(files ?? []).every(
                    (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
                );
            }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
            .refine((files) => {
                return Array.from(files ?? []).every((file) =>
                    ACCEPTED_IMAGE_TYPES.includes(file?.type)
                );
            }, `Only ${ACCEPTED_IMAGE_TYPES.join(", ")} are allowed`),
        menu: z
            .custom<FileList>()
            .refine((files) => {
                return files?.length > 0;
            }, "Menu is required")
            .refine((files) => {
                return Array.from(files ?? []).every(
                    (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
                );
            }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
            .refine((files) => {
                return Array.from(files ?? []).every((file) =>
                    ACCEPTED_IMAGE_TYPES.includes(file?.type)
                );
            }, `Only ${ACCEPTED_IMAGE_TYPES.join(", ")} are allowed`),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            city: "",
            phone: "",
            address: "",
            location: "",
            logo: null,
        },
    });

    const logoRef = form.register("logo");
    const menuRef = form.register("menu");

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route("admin.restaurants.store"), values);
    }

    useEffect(() => {
        console.log(categories);
    }, []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>Restaurant name:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    placeholder="Enter the restaurant name"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>City:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    placeholder="Enter the city"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>Category:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                value={category.id?.toString()}
                                            >
                                                {category.category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>Phone:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    placeholder="Enter the phone number"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>Address:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    placeholder="Enter the address"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>Google maps location:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    placeholder="Enter the google map location string"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>Logo:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    accept=".jpg,.jpeg,.png,.webp"
                                    type="file"
                                    {...logoRef}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="menu"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>
                                    Menu: import multiple images (up to 4)
                                </FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    multiple
                                    accept=".jpg,.jpeg,.png,.webp"
                                    type="file"
                                    {...menuRef}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
