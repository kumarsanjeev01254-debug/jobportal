import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { Button } from "../ui/button";

const categoryList = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Data Analyst",
  "UI/UX Designer",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Cloud Architect",
  "Cybersecurity Specialist",
  "Graphic Designer",
  "Digital Marketing Specialist",
  "Content Writer",
];

const Categories = () => {
  return (
   <div>
    <div>
      <h1 className="text-2xl font-bold  text-center text-blue-600">Categories</h1>
      <p className="text-center text-gray-600">
        Explore our extensive job market.
      </p>
    </div>
     <div className="relative w-full max-w-5xl mx-auto my-12 px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2">
          {categoryList.map((category, index) => (
            <CarouselItem
              key={index}
              className="basis-auto pl-2"
            >
              <Button className="bg-[#6B3AC2] text-white hover:bg-[#5a2ea8] whitespace-nowrap">
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <CarouselPrevious  />

        {/* Next Button */}
        <CarouselNext  />
      </Carousel>
    </div>

   </div>
     );
};

export default Categories;