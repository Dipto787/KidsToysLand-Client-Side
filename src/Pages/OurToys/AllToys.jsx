import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner";
import ToysCard from "../../Shared/ToysCard";
import { useEffect, useState } from "react";
import notFound from "../../assets/not found/no found.png";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

let brands = [
  { brand: "Frank" },
  { brand: "Winfun" },
  { brand: "Funskool" },
  { brand: "Majorette" },
  { brand: "Toybilss" },
  { brand: "Fisher-Price" },
  { brand: "Challenge Accepted" },
];

const AllToys = () => {
  let navigate = useNavigate();
  let axiosSecure = UseAxiosSecure();

  const [CurrentPage, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [count, setCount] = useState(0);

  let [brand, setBrand] = useState("");
  let [age, setAge] = useState("");
  let [search, setSearch] = useState("");

  // Fetch count
  useEffect(() => {
    axiosSecure
      .get(`/toys-count?brand=${brand}&&search=${search}&&age=${age}`)
      .then((res) => {
        setCount(res.data.count);
      });
    setPage(0);
  }, [brand, search, age]);

  // Fetch toys
  let { data: toys = [], isLoading } = useQuery({
    queryKey: ["toys", CurrentPage, perPage, brand, search, age],
    queryFn: async () => {
      let { data } = await axiosSecure.get(
        `/our-toys?page=${CurrentPage}&&size=${perPage}&&brand=${brand}&&search=${search}&&age=${age}`
      );
      return data;
    },
  });

  let pages = [...Array(Math.ceil(count / perPage)).keys()];

  // URL Sync
  useEffect(() => {
    const query = {
      page: CurrentPage,
      brand: brand || undefined,
      age: age || undefined,
      search: search || undefined,
    };
    const newUrl = queryString.stringifyUrl({ url: "/our-toys", query });
    navigate(newUrl, { replace: true });
  }, [brand, age, search, CurrentPage]);

  return (
    <div className="px-3 lg:px-10 py-8">
      {/* Filter Section */}
      <div className="my-8 flex flex-col lg:flex-row gap-5 bg-[#f85606] p-5 rounded-xl justify-between items-center">
        {/* Brand Filter */}
        <select
          onChange={(e) => setBrand(e.target.value)}
          className="border bg-white text-black border-orange-400 px-4 py-2 rounded-lg shadow-sm w-full lg:w-56"
          defaultValue={"Select Brand"}
        >
          <option disabled>Select Brand</option>
          {brands.map((brand, idx) => (
            <option key={idx} value={brand.brand}>
              {brand.brand}
            </option>
          ))}
        </select>

        {/* Search */}
        <label className="flex items-center gap-2 border bg-white text-black px-4 py-2 rounded-lg shadow-sm w-full lg:w-80">
          <svg
            className="h-5 w-5 opacity-70"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
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
          <input
            className="w-full bg-transparent outline-none text-black"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            type="search"
            placeholder="Search Toys..."
          />
        </label>

        {/* Age Filter */}
        <select
          onChange={(e) => setAge(e.target.value)}
          className="border bg-white text-black border-pink-400 px-4 py-2 rounded-lg shadow-sm w-full lg:w-56"
          defaultValue={"Select Age"}
        >
          <option disabled>Select Age</option>
          {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Toys Section */}
      {isLoading ? (
        <Spinner />
      ) : toys.length === 0 ? (
        <div className="flex flex-col items-center p-20 justify-center">
          <img src={notFound} alt="Not Found" className="w-60" />
          <h1 className="text-2xl lg:text-4xl text-center mt-6 font-semibold text-gray-700">
            No Data Available!!
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {toys.map((toy, idx) => (
            <ToysCard key={idx} toy={toy} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages.length > 1 && (
        <div className="my-10 text-center space-x-2">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={`px-4 py-2 rounded-lg border shadow-sm transition ${
                page === CurrentPage
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllToys;
