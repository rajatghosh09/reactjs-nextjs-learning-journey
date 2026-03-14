import axios from "axios";
import { useEffect, useState } from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import type { PostList } from "../Typescript/interface";
import { IoArrowBackSharp } from "react-icons/io5";
import Loader from "../components/Loader";

const Viewposts = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log("id", id);

  const [postsDetails, setProdutDetails] = useState<PostList>({
    title: "",
    body: "",
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        // const data = await response.json();
        setProdutDetails(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 900);
      }
    };
    fetchData();
  }, [id]);
  console.log("posts Detail", postsDetails);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#ecf2ff] via-[#eef9f9] to-[#fff9f3]">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Loader />
          </div>
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-[#b8d8ff] via-[#dffdf7] to-[#ffe7d1] flex justify-center items-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white/40 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.25)] border border-white/30 p-10 flex flex-col gap-6 animate-fadeIn">

              <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow">
                {postsDetails.title}
              </h2>

              <p className="text-gray-800 leading-relaxed text-[17px] whitespace-pre-line tracking-wide">
                {postsDetails.body}
              </p>

              {postsDetails.tags?.length > 0 && (<div className="flex flex-wrap gap-3 justify-center mt-2"> {postsDetails.tags.map((tag, index) => (<span key={index} className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full shadow" > #{tag} </span>))} </div>)}

              <div className="flex justify-center gap-16 mt-8">
                <div className="flex items-center gap-2 bg-green-100 px-5 py-2 rounded-xl shadow">
                  <span className="text-green-700 text-2xl"><AiTwotoneLike /></span>
                  <span className="text-green-700 font-bold text-xl">{postsDetails.reactions?.likes}</span>
                </div>

                <div className="flex items-center gap-2 bg-red-100 px-5 py-2 rounded-xl shadow">
                  <span className="text-red-700 text-2xl"><AiTwotoneDislike /></span>
                  <span className="text-red-700 font-bold text-xl">{postsDetails.reactions?.dislikes}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/author")}
                className="flex items-center gap-2 mx-auto mt-8 px-14 py-3 bg-white/25 backdrop-blur-xl border border-white/50 text-gray-900 font-semibold rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.15)] tracking-widehover:bg-white/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-95"
              >
                <IoArrowBackSharp />Back to Posts
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Viewposts;
