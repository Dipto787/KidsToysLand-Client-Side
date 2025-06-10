import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const OurToys = () => {
    let [toys, setToys] = useState([]);
    useEffect(() => {
        axios.get('Toys.json')
            .then(res => {
                setToys(res.data)
            })
    }, [])
    let categories = [];
    for (let toy of toys) {
        if (!categories.includes(toy.category)){
            categories.push(toy.category)
        }
    }

    console.log(categories);
    return (
        <div>
            <h1 className="text-6xl text-center my-20 font-semibold border-b-4 p-10 border-blue-600 ">Our Toys</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {
                    toys.map(toy => <div className="flex flex-col h-full border rounded-lg shadow-md">
                        <figure>
                            <img
                                src={toy.img}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body flex flex-col flex-grow">
                            <h2 className="card-title">{toy.name}</h2>
                            <p>{toy.details}</p>
                            <div className=" ">
                                <div className="" >
                                    <p className="flex text-lg gap-2"> Brand : <span className="text-red-500">{toy.brand}</span></p>

                                    <p className="flex gap-2  text-lg"> sold : <span className="text-red-500">{toy.sold}</span></p>
                                </div>
                            </div>
                            <div className="card-actions  w-full justify-end">
                                <button className="btn w-full mt-6 btn-primary">Add To Cart</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className="text-center px-72 my-6">
                <Link className="btn bg-pink-600 w-full  text-lg p-6 rounded  text-white font-semibold">See All <FaAngleDoubleRight size={24}></FaAngleDoubleRight></Link>
            </div>
        </div>
    );
};

export default OurToys;