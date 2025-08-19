import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import ToysCard from "../../Shared/ToysCard";
import Spinner from "../../Shared/Spinner";
import SectionTitle from "../../Shared/SectionTitle";

const OurToys = () => {
    let axiosSecure = UseAxiosSecure();
    let { data: toys = [], isLoading } = useQuery({
        queryKey: ['toys'],
        queryFn: async () => {
            let { data } = await axiosSecure.get('/toys');
            return data;
        }
    })
    console.log('dipto boss is fair now', toys)
    return (
        <div className="px-4 lg:px-0">
            <SectionTitle title={'Our-Toys'} subtitle={'KidsToysLand toys'}></SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {
                    Array.isArray(toys) ?
                        isLoading ? <Spinner></Spinner> :

                            toys.slice(0, 7).map(toy => <ToysCard toy={toy}></ToysCard>)


                        : undefined

                }
            </div>
            <div className="text-center lg:px-80 my-6">
                <Link className="btn bg-pink-600 w-full  text-xs  rounded  text-white font-semibold">See All <FaAngleDoubleRight size={24}></FaAngleDoubleRight></Link>
            </div>
        </div>
    );
};

export default OurToys;