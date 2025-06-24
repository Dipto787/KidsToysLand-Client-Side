import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import ToysCard from "../../Shared/ToysCard";
import Spinner from "../../Shared/Spinner";

const OurToys = () => {
    let axiosSecure = UseAxiosSecure();
    let { data: toys = [], isLoading } = useQuery({
        queryKey: ['toys'],
        queryFn: async () => {
            let { data } = await axiosSecure.get('/toys');
            return data;
        }
    })
    console.log( 'dipto boss is fair now',toys)
    return (
        <div className="px-4 lg:px-0">
            <h1 className="lg:text-6xl text-4xl text-center my-4 lg:my-20 font-semibold border-b-4 p-10 border-blue-600 ">Our Toys</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                { 
                Array.isArray(toys) ?
                    isLoading ? <Spinner></Spinner> :

                     toys.slice(0,7).map(toy => <ToysCard toy={toy}></ToysCard>)


                     : undefined

                }
            </div>
            <div className="text-center lg:px-72 my-6">
                <Link className="btn bg-pink-600 w-full  text-lg p-6 rounded  text-white font-semibold">See All <FaAngleDoubleRight size={24}></FaAngleDoubleRight></Link>
            </div>
        </div>
    );
};

export default OurToys;