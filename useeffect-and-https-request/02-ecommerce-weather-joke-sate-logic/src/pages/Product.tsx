import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { ProductList } from "../Typescript/interface";
import { FaStar } from "react-icons/fa";
import Loader from "../components/Loader";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const [openSort, setOpenSort] = useState(false);

  const sortValue = searchParams.get("sort");
  const priceSortValue = searchParams.get("price");

  const [productList, setProductList] = useState<ProductList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        //api fetch koreche dummy theke
        const response = await fetch("https://dummyjson.com/products");
        //next a json convert hoache 
        const data = await response.json();
        const sortedData = [...data.products];

        // Title Sorting
        if (sortValue === "asc") {
          sortedData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortValue === "desc") {
          sortedData.sort((a, b) => b.title.localeCompare(a.title));
        }

        // Price Sorting
        if (priceSortValue === "asc") {
          sortedData.sort((a, b) => a.price - b.price);
        } else if (priceSortValue === "desc") {
          sortedData.sort((a, b) => b.price - a.price);
        }

        setProductList(sortedData);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, [sortValue, priceSortValue]);

  const handleSort = (order: string) => {
    setSearchParams({ sort: order });
  };

  const handlePriceSort = (order: string) => {
    setSearchParams({ price: order });
  };

  return (
    <>
      <div className="p-6 min-h-screen bg-gradient-to-br from-[#ecf2ff] via-[#eef9f9] to-[#fff9f3]">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Loader />
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text drop-shadow">
              Products
            </h2>

            <div className="flex justify-end pr-6 mb-10 relative z-50">
              <button
                onClick={() => setOpenSort(!openSort)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl 
                font-semibold shadow-lg hover:shadow-2xl transition hover:scale-105"
              >
                Sort By: Featured
              </button>

              {openSort && (
                <div
                  className="absolute mt-12 right-0 bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 w-80 
                  border border-gray-200 transition-all animate-fade"
                >
                  <p className="text-indigo-600 font-bold mb-3 text-sm uppercase tracking-wider">
                    Title Sorting
                  </p>
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => handleSort("asc")}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        sortValue === "asc"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      A → Z
                    </button>

                    <button
                      onClick={() => handleSort("desc")}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        sortValue === "desc"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Z → A
                    </button>
                  </div>

                  <div className="h-[1px] bg-gray-200 w-full mb-6"></div>

                  <p className="text-amber-600 font-bold mb-3 text-sm uppercase tracking-wider">
                    Price Sorting
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePriceSort("asc")}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        priceSortValue === "asc"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Low → High
                    </button>

                    <button
                      onClick={() => handlePriceSort("desc")}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        priceSortValue === "desc"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      High → Low
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4">
              {productList.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-200
                  hover:shadow-[0_10px_45px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="relative bg-white overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-56 object-contain group-hover:scale-110 transition-transform duration-500"
                    />

                    {item.tags?.length > 0 && (
                      <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                        {item.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] px-2 py-1 rounded-md shadow-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.discountPercentage && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
                        {item.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col gap-4 bg-gradient-to-br from-white to-indigo-50/60 rounded-2xl border border-indigo-100 shadow-inner">
                    <p className="text-[13px] font-semibold tracking-wide uppercase text-indigo-600">
                      {item.brand}
                    </p>

                    <h3 className="font-extrabold text-[20px] text-gray-900 leading-snug line-clamp-1 group-hover:text-indigo-700 transition">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 font-medium">
                      <span className="text-gray-900 font-semibold">
                        Category:
                      </span>
                      <span className="text-purple-700 capitalize">
                        {item.category}
                      </span>
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-[22px] font-extrabold text-green-700 drop-shadow-sm">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.floor(item.rating) }).map(
                        (_, index) => (
                          <FaStar
                            key={index}
                            className="text-yellow-400 text-lg drop-shadow-sm"
                          />
                        )
                      )}
                      {item.rating % 1 !== 0 && (
                        <FaStar className="text-yellow-300 text-lg opacity-50" />
                      )}
                      <span className="text-indigo-600 font-semibold text-sm ml-1">
                        {item.rating.toFixed(1)} / 5
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`viewproduct/${item.id}`, {
                          state: {
                            productDetails: item
                          }
                        })
                      }
                      className="mt-3 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl
                      font-semibold tracking-wide shadow-md hover:shadow-[0_8px_22px_rgba(0,0,0,0.20)] hover:scale-[1.03] active:scale-95 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
