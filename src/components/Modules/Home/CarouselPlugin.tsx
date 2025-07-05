"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2800, stopOnInteraction: false })
  );

  const images = [
    "https://i.ibb.co/wFQnBbwQ/large-collection-old-books-wooden-shelves-generated-by-ai.jpg",
    "https://i.ibb.co/6fM9F93/young-student-looking-book-library.jpg",
    "https://i.ibb.co/XkJJJ5zF/luxury-reading-material-illuminates-old-fashioned-elegance-indoors-generated-by-ai.jpg",
  ];

  return (
    <Carousel plugins={[plugin.current]} className="w-full mt-0">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="w-full ">
            <div className="p-0">
              <Card className="rounded-none border-none">
                <CardContent className="p-0">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[180px] md:h-[400px] lg:h-[300px] object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
