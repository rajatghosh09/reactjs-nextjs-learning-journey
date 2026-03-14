import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PostList } from "../Typescript/interface";
import Loader from "../components/Loader";
import { FaEye } from "react-icons/fa";

const UseEffectPr = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<PostList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();
        console.log("resposnce", data);

        setPostList(data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#ecf2ff] via-[#eef9f9] to-[#fff9f3]">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Loader />
          </div>
        ) : (
          <div className="px-6 py-14 min-h-screen">

            <h2 className="text-5xl font-extrabold text-center mb-16 tracking-wide bg-gradient-to-r from-blue-700 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
              Author Page
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {postList.map((post) => (
                <div
                  key={post.id}
                  className="relative bg-white/80 backdrop-blur-2xl border border-gray-200 shadow-xl rounded-3xl p-7 flex flex-col overflow-hidden 
                  hover:-translate-y-3 hover:shadow-[0_20px_55px_rgba(0,0,0,0.25)] transition-all duration-500 group"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-600 to-fuchsia-600"></div>
                  <h3 className="text-[20px] font-extrabold text-gray-900 mb-3 line-clamp-2 leading-snug transition-colors duration-300 group-hover:text-indigo-600">
                    {post.title}
                  </h3>

                  
                  <p className="text-gray-700 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.body}
                  </p>

                  
                  <div className="flex items-center gap-1 text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full w-fit mb-6 shadow-sm">
                    <FaEye /><span className="text-gray-700">{post.views} views</span>
                  </div>

                 
                  <button
                    onClick={() => navigate(`authordetails/${post.id}`)}
                    className="mt-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2.5 rounded-xl font-semibold tracking-wide
              hover:scale-[1.05] active:scale-95 hover:shadow-[0_10px_20px_rgba(0,0,0,0.22)] transition-all duration-300"
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </>

  );
};

export default UseEffectPr;
