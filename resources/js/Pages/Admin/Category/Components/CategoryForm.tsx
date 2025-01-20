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
import { FC, useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { MenuCarouselForm } from "./MenuCarouselForm";

export const CategoryForm: FC<{ category: any }> = ({ category }) => {
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
        category: z.string().nonempty({ message: "Category name is required" }),
        image: z
            .custom<FileList>()
            .refine((files) => {
                return files?.length > 0;
            }, "image is required")
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
            category: category?.category ?? "",
            image: category?.imagePath ?? "",
        },
    });

    const imageRef = form.register("image");

    useEffect(() => {
        console.log(category);
    }, []);

    function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
        // return;
        router.post(
            category
                ? route(`admin.categories.update`, category.id)
                : route(`admin.categories.store`),
            { ...values, _method: category ? "put" : "post" },
            {
                onSuccess: () => {
                    toast(
                        `Category successfully ${
                            category ? "modified" : "added"
                        }`
                    );
                },
                onError: (errors) => {
                    console.log(errors);

                    for (const key in errors) {
                        let formKey = key === "imagePath" ? "image" : key;
                        let imageRegex = /^image./;
                        switch (true) {
                            case key === "logoPath":
                                formKey = "logo";
                                break;
                            case imageRegex.test(key):
                                formKey = "logo";
                                break;
                            default:
                                formKey = key;
                        }
                        form.setError(formKey, {
                            type: "manual",
                            message: errors[key],
                        });
                    }
                },
            }
        );
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>Category name:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    placeholder="Enter the category name"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormLabel>Image:</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input
                                    accept=".jpg,.jpeg,.png,.webp"
                                    type="file"
                                    {...imageRef}
                                />
                            </FormControl>
                            {form.getValues().image.length > 0 && (
                                <div className="flex justify-start pl-10">
                                    <MenuCarouselForm
                                        images={
                                            !category
                                                ? Object.values(
                                                      form.getValues().image
                                                  ).map((item) => {
                                                      return URL.createObjectURL(
                                                          item
                                                      );
                                                  })
                                                : [
                                                      `${route()["t"]["url"]}/${
                                                          category.imagePath
                                                      }`,
                                                  ]
                                        }
                                    />
                                </div>
                            )}
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
