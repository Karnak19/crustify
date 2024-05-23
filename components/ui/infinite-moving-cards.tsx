"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    price: string;
    description: string;
    image: string;
    base: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [start, setStart] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    const addAnimation = () => {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    };

    addAnimation();
  }, []);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <Card
            {...item}
            className="w-[350px] max-w-full relative md:w-[450px]"
            key={item.name}
          >
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="font-serif text-2xl">
                  {item.name}
                </CardTitle>
                <CardDescription className="font-serif-secondary text-lg">
                  {item.price}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full aspect-[3/2]">
                <Image
                  className="rounded-lg w-full object-cover"
                  src={item.image}
                  sizes="450px"
                  alt={item.name}
                  layout="fill"
                />
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground font-serif-secondary">
                  {item.description}
                </p>
                <Badge
                  className={cn({
                    "bg-red-200 text-red-800 hover:bg-red-200":
                      item.base === "Tomate",
                    "bg-amber-100 text-foreground hover:bg-amber-100":
                      item.base === "Crème",
                  })}
                >
                  {item.base}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  );
};
