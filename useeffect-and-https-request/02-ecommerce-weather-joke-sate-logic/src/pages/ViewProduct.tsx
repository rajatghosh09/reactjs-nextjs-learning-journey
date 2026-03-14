// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import type { ProductList } from "../Typescript/interface";
import { IoArrowBackSharp, IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaShippingFast, FaStar } from "react-icons/fa";
import Loader from "../components/Loader";
import { FaArrowRotateLeft } from "react-icons/fa6";

const ViewProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { id } = useParams();
  const location = useLocation();
  console.log("location", location);
  

  // const [productDetails, setProdutDetails] = useState<ProductList>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://dummyjson.com/products/${id}`
  //       );
  //       setProdutDetails(response?.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setTimeout(() => setLoading(false), 900);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  const productDetails = location?.state?.productDetails
  console.log("product Detail", productDetails);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      ) : (
        <div className="p-8 min-h-screen bg-gradient-to-br from-[#e8efff] via-[#f3fff7] to-[#fff4ef]">
          <button
            onClick={() => navigate("/product")}
            className="mb-6 inline-flex items-center gap-2 text-white bg-indigo-600 px-5 py-2 rounded-lg shadow 
                        hover:bg-indigo-700 transition"
          >
            <IoArrowBackSharp />
            Back to Products
          </button>

          <h2 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
            {productDetails?.title}
          </h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative flex flex-col gap-3">
              <img
                src={productDetails?.images?.[0]}
                alt="Thumbnail"
                className="rounded-2xl border shadow-lg w-full h-80 object-contain bg-white"
              />

              <div className="flex gap-3 justify-center flex-wrap">
                {productDetails?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Product"
                    className="w-20 h-20 object-cover rounded-xl border hover:scale-110 transition cursor-pointer"
                  />
                ))}
              </div>
            </div>

            <div
              className="flex flex-col gap-5 bg-gradient-to-br from-[#ffffff] via-[#f5f8ff] to-[#e8ecff] 
              backdrop-blur-2xl border border-indigo-200/60 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.12)] p-7"
            >
              <p className="text-4xl font-extrabold text-indigo-700 tracking-wide drop-shadow-sm">
                ₹{productDetails?.price}
                {productDetails?.discountPercentage && (
                  <span className="ml-3 bg-green-200 text-green-800 px-3 py-1 text-base font-bold rounded-full shadow-sm">
                    {productDetails.discountPercentage}% OFF
                  </span>
                )}
              </p>

              <p className="text-gray-700 text-[17px] leading-relaxed border-l-4 border-indigo-400 pl-4">
                {productDetails?.description}
              </p>

              <p className="text-[16px] font-semibold flex items-center gap-2">
                Availability:
                <span
                  className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${
                    productDetails?.availabilityStatus === "In Stock"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {productDetails?.availabilityStatus}
                </span>
              </p>

              <div className="flex items-center gap-2 text-[16px] font-medium">
                <IoShieldCheckmarkOutline className="text-green-600 text-xl" />
                <span className="font-semibold text-gray-900">Warranty:</span>
                <span className="text-gray-700">
                  {productDetails?.warrantyInformation || "No warranty"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[16px] font-medium">
                <FaShippingFast className="text-[#c3a100] text-xl" />
                <span className="font-semibold text-gray-900">Shipping:</span>
                <span className="text-gray-700">
                  {productDetails?.shippingInformation ||
                    "Shipping not available"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[16px] font-medium">
                <FaArrowRotateLeft className="text-[#15498c] text-xl" />
                <span className="font-semibold text-gray-900">
                  Return Policy:
                </span>
                <span className="text-gray-700">
                  {productDetails?.returnPolicy || "No return available"}
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-16 bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl text-center font-bold mb-6 bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
              Customer Reviews
            </h3>

            {productDetails?.reviews?.length ? (
              <div className="flex flex-col gap-5">
                {productDetails.reviews?.map((review, i) => (
                  <div
                    key={i}
                    className="border rounded-xl p-5 bg-gray-50 hover:shadow transition relative"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-900">
                        {review.reviewerName}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        {new Date(review.date).toLocaleString()}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 mb-2">
                      {review.reviewerEmail}
                    </p>

                    <p className="flex gap-2 text-sm text-yellow-500 font-semibold">
                      <FaStar className="mt-1" /> {review.rating}/5
                    </p>

                    <p className="text-gray-700 text-sm mt-2">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No reviews available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
