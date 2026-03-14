import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Lottie from "lottie-react";
import Loading from "../Service/json/Trail loading.json"
import type { weatherInterface } from "../Typescript/interface";


const WeatherApp = () => {
  const [weather, setWeather] = useState<weatherInterface>();
  const [city, setCity] = useState("");

  const [wError, setWError] = useState("");
  const [loading, setLoading] = useState(false);

  const apikey = "74751f4bd472e679e32d0a19995edc8f";

  const getWather = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setWError("");
    setWeather(undefined);
    try {
      const Response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      );
      console.log("response", Response);
      if (Response?.status === 200) {
        if (!Response?.data?.sys?.country) {
          setWError("country not found");
          setWeather(undefined);
        } else {
          setWeather(Response?.data);
        }
        setCity("");
      }
    } catch (error) {
      console.log("error", error);
      setTimeout(() => {
        setWError("City not found");
      }, 700);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }
  };

  

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-500 to-fuchsia-400 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 text-white
          transition-all duration-300"
        >
          <h1 className="text-3xl font-bold text-center mb-6">🌦️ Weather</h1>
          <div className="flex gap-2 mb-6">

            <form onSubmit={getWather} className="flex gap-2 w-full">
              <input
                type="text"
                value={city}
                className="flex-1 px-3 py-2 rounded-xl bg-white/30 placeholder-white/70 outline-none text-white"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                placeholder="Enter city name"
              />

              <button
                type="submit"
                disabled={loading}
                className={`bg-white text-blue-600 font-semibold px-4 py-2 rounded-xl transition 
                ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100"}`}
              >
                Search
              </button>
            </form>
          </div>

          {wError && (
            <p className="text-red-600 font-bold text-center">{wError}</p>
          )}

          <div className="min-h-[200px]">

            {loading ? (
              <div className="flex justify-center items-center py-4">
                <Lottie animationData={Loading} loop className="w-36 h-36" style={{ filter: "brightness(0) saturate(100%) invert(32%) sepia(93%) saturate(800%) hue-rotate(185deg) brightness(92%) contrast(95%)" }} />
              </div>
            ) : (
              <div>
                {weather ? (
                  <div className="text-center space-y-4">
                    <h2 className="flex justify-center items-center gap-2 text-3xl font-semibold">
                      Country: {weather?.sys?.country}
                      <br />
                      City: {weather?.name}
                    </h2>

                    <div className="flex justify-center items-center text-left gap-4">
                      <div>
                        {weather?.weather && (
                          <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                            className="mx-auto w-28"
                          />
                        )}

                        <p className="text-xl font-bold">
                          Temperature: {weather?.main?.temp?.toFixed(1)}°C
                        </p>
                        <p className="text-xl font-bold">
                          Max Temperature: {weather?.main?.temp_max?.toFixed(1)}°C
                        </p>
                        <p className="text-xl font-bold">
                          Feels Like: {weather?.main?.feels_like?.toFixed(1)}°C
                        </p>
                        <p className="text-xl font-bold">
                          Humidity: {weather?.main?.humidity}% | Pressure: {weather?.main?.pressure} hPa
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
