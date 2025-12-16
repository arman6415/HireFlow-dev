import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer"
]

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchJobHandler = (string) => {
        dispatch(setSearchedQuery(query))
        navigate("/browse"); 
    }

    return (
        <div className="bg-gray-100 py-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-900">
                Explore Service Categories
            </h2>
            <Carousel className="w-full max-w-4xl mx-auto px-4">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4">
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="w-full rounded-full bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white text-gray-900 hover:bg-gray-200 border-2 border-gray-900" />
                <CarouselNext className="bg-white text-gray-900 hover:bg-gray-200 border-2 border-gray-900" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel

