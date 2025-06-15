import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner";
import ToysCard from "../../Shared/ToysCard";
import { useEffect, useState } from "react";
import notFound from '../../assets/not found/no found.png'
const AllToys = () => {
    let axiosSecure = UseAxiosSecure();
    const [CurrentPage, setPage] = useState(0);
    const [perPage, setPerPage] = useState(8);
    const [count, setCount] = useState(0);
    let [brand, setBrand] = useState('');
    let [age, setAge] = useState('');
    let [search, setSearch] = useState('');
    useEffect(() => {

        axiosSecure.get(`/toys-count?brand=${brand}&&search=${search}&&age=${age}`).then(res => {
            setCount(res.data.count);
            setPage(0);
        });




    }, [brand, search, age]);


    let { data: toys = [], isLoading, refetch } = useQuery({
        queryKey: ['toys', CurrentPage, perPage, brand, search, age],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/our-toys?page=${CurrentPage}&&size=${perPage}&&brand=${brand}&&search=${search}&&age=${age}`);
            return data;
        }
    })



    let pages = [...Array(Math.ceil(count / perPage)).keys()];

    return (
        <div>
            <div className='flex  px-3 flex-col'>
                <div className="my-10 lg:flex flex-col lg:flex-row  bg-purple-300 p-5 rounded-lg justify-between">
                    <div className="hidden lg:flex">
                        <select onChange={(e) => setBrand(e.target.value)} className="border-2 border-orange-400 p-2" defaultValue={'Select Brand'} name="brand" id="">
                            <option disabled>Select Brand</option>
                            <option value="funskool">funskool</option>
                            <option value="toybilss">toybilss</option>
                            <option value="challenge accepted">challenge accepted</option>
                            <option value="winfun">winfun</option>
                            <option value="frank">frank</option>
                            <option value="fisher-price">fisher-price</option>
                            <option value="majorette">majorette</option>
                            <option value="zepltyr">zepltyr</option>
                            <option value="sold">sold</option>

                        </select>
                    </div>
                    <div className="text-center">
                        <label className="input px-20">
                            <svg className="h-[1em]  opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input className="w-full" onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())} type="search " required placeholder="Search" />
                        </label>
                    </div>

                    <div className="hidden lg:flex">
                        <select onChange={(e) => setAge(e.target.value)} className="border-2 border-pink-400 p-2" defaultValue={'Select Age'} name="age" id="">
                            <option disabled>Select Age</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </div>

                </div>

                <div  className="flex lg:hidden justify-between px-10 mb-5">
                    <div>
                        <select onChange={(e) => setBrand(e.target.value)} className="border-2 border-orange-400 p-2" defaultValue={'Select Brand'} name="brand" id="">
                            <option disabled>Select Brand</option>
                            <option value="funskool">funskool</option>
                            <option value="toybilss">toybilss</option>
                            <option value="challenge accepted">challenge accepted</option>
                            <option value="winfun">winfun</option>
                            <option value="frank">frank</option>
                            <option value="fisher-price">fisher-price</option>
                            <option value="majorette">majorette</option>
                            <option value="zepltyr">zepltyr</option>
                            <option value="sold">sold</option>

                        </select>
                    </div>

                    {/*  */}
                    <div className=" ">
                        <select onChange={(e) => setAge(e.target.value)} className="border-2 border-pink-400 p-2" defaultValue={'Select Age'} name="age" id="">
                            <option disabled>Select Age</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                </div>

                {
                    isLoading ? <Spinner></Spinner> :
                        toys.length === 0 ? <div className="flex flex-col items-center p-28  justify-center"> <img src={notFound} className="" alt="" /> <h1 className="text-4xl text-center  mt-4" >Not Data Available!!</h1></div> :
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                                {



                                    toys.map(toy => <ToysCard toy={toy}></ToysCard>)

                                }
                            </div>
                }
            </div>

            <div className="my-10 text-center space-x-4">
                {
                    pages.map(page => <button onClick={() => setPage(page)} className={`btn ${page == CurrentPage ? 'bg-blue-600 text-white font-semibold' : ''}`}>{page}</button>)
                }
            </div>

        </div>
    );
};

export default AllToys;