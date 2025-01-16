import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

export function MenuCarouselForm({ images }) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(images ? Object.values(images).length : 0);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api, images]);

    return (
        <div className="flex flex-col items-center max-w-xs">
            <Carousel setApi={setApi} className="w-52 h-52">
                <CarouselContent>
                    {images.map((image: string, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-1 md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex w-52 h-52 items-center justify-center p-6">
                                        <img
                                            className="object-cover"
                                            src={image}
                                            alt=""
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Slide {current} of {count}
            </div>
        </div>
    );
}
