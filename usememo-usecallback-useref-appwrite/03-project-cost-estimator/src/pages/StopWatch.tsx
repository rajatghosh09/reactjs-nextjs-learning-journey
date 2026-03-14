import { useState, useRef } from "react";

const StopWatch = () => {
  const [timer, setTimer] = useState({
    hour: 0,
    mint: 0,
    sec: 0,
  });

  const intervalRef = useRef<number | null>(null);

  const timeRef = useRef({
    hour: 0,
    mint: 0,
    sec: 0,
  });

  const start = () => {
    if (intervalRef.current === null) {
      intervalRef.current = window.setInterval(CountTimer, 1000);
    }
  };

  const pause = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    pause();
    timeRef.current = { hour: 0, mint: 0, sec: 0 };
    setTimer(timeRef.current);
  };

  const CountTimer = () => {
    let { hour, mint, sec } = timeRef.current;

    sec++;

    if (sec === 60) {
      sec = 0;
      mint++;
    }

    if (mint === 60) {
      mint = 0;
      hour++;
    }

    timeRef.current = { hour, mint, sec };

    setTimer(timeRef.current);
    // console.log(" timeRef:", timeRef.current);

    
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl pr-5">H : M : S</h1>
        <h1 className="text-3xl">
          {timer.hour} : {timer.mint} : {timer.sec}
        </h1>

        <div className="flex gap-4 mt-4">
          <button
            onClick={start}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition active:scale-95"
          >
            Start
          </button>

          <button
            onClick={pause}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold rounded-full shadow-lg hover:from-red-700 hover:to-red-500 transition active:scale-95"
          >
            Pause
          </button>

          <button
            onClick={reset}
            className="px-6 py-3 bg-black text-yellow-300 font-semibold rounded-full shadow-lg border border-yellow-500 hover:bg-gray-900 hover:shadow-[0_0_10px_#facc15] transition active:scale-95"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default StopWatch;
