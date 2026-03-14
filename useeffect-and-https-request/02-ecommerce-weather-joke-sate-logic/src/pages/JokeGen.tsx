import axios from "axios";
import { useState } from "react";
import type { jokes } from "../Typescript/interface";

const JokeGen = () => {
  const [joke, setJoke] = useState<jokes | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );

      setTimeout(() => {
        setJoke(response?.data);
        setLoading(false);
      }, 900);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4 text-center text-white transition-all duration-300">

          <h1 className="text-2xl font-bold mb-2">😂 Random Joke Generator 😂</h1>

          {loading ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-10 h-10 border-4 border-white/50 border-t-white rounded-full animate-spin"></div>
              <p className="text-lg font-semibold">Loading...</p>
            </div>
          ) : joke ? (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <p className="text-xl font-semibold">Setup:</p>
              <p className="text-lg opacity-90">{joke.setup}</p>

              <p className="text-xl font-semibold">Punchline:</p>
              <p className="text-lg opacity-90">{joke.punchline}</p>
            </div>
          ) : (
            <p className="text-lg opacity-70">Click the button to get your first joke 😄</p>
          )}

          <button
            onClick={fetchData}
            disabled={loading}
            className={`mt-2 px-7 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all 
            ${loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-300 text-black hover:bg-yellow-400 hover:scale-105"
              }`}
          >
            {loading ? "Fetching..." : joke ? "New Joke" : "Get Joke"}
          </button>
        </div>
      </div>
    </>
  );
};

export default JokeGen;
