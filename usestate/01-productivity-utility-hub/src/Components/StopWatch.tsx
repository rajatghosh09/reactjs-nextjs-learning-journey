import { useState } from 'react'

const StopWatch = () => {
    const [timer, setTimer] = useState({ hour: 0, mint: 0, sec: 0, millisec: 0 })
    const [status, setStatus] = useState<number | null>(null)

    let updateHour = timer.hour;
    let updateMinit = timer.mint;
    let updateSec = timer.sec;
    let updateMilisec = timer.millisec;

    const start = () => {
        if (status === null) {  
            // CountTimer();
            setStatus(setInterval(CountTimer, 10));
        }
    };

    const stop = () => {
        clearInterval(status!);
        setStatus(null);
    };

    const reset = () => {
        clearInterval(status!);
        setStatus(null);
        setTimer({ hour: 0, mint: 0, sec: 0, millisec: 0 });
    };

    const CountTimer = () => {
        if (updateMilisec === 100) {
            updateMilisec = 0;
            updateSec++
        }
        if (updateSec === 60) {
            updateSec = 0
            updateMinit++
        }
        if (updateMinit === 60) {
            updateMinit = 0;
            updateHour++
        }
        updateMilisec++;

        return setTimer({ hour: updateHour, mint: updateMinit, sec: updateSec, millisec: updateMilisec })
    }
    return (
        <>
            <div className='flex flex-col justify-center items-center h-screen'>
                <h1 className='text-3xl pr-5'>H : M : S : MS</h1>
                <h1 className='text-3xl'>{timer.hour} : {timer.mint} : {timer.sec} : {timer.millisec}</h1>
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={start}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition active:scale-95"
                    >
                        Start
                    </button>

                    <button
                        onClick={stop}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold rounded-full shadow-lg hover:from-red-700 hover:to-red-500 transition active:scale-95"
                    >
                        Stop
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
    )
}

export default StopWatch
