import {Link} from "react-router-dom";
import {
    DiDart,
    DiDatabase,
    DiDjango,
    DiFirefox,
    DiGo,
    DiJavascript1,
    DiPhp,
    DiPython,
    DiReact,
    DiRust,
    DiSqllite,
    DiStackoverflow,
    DiSwift,
    DiUnitySmall,
    DiVim,
} from "react-icons/di";
import {SiTesla} from "react-icons/si";

export default function HomePage() {
    return <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-10 min-h-[92vh] py-10">
        <div className="flex flex-col items-center justify-center flex-1">
            <h2 className="text-5xl font-bold text-center mb-6">Flask + React = ❤️‍🔥🔥</h2>
            <p className="max-w-3xl text-center text-[15px]">This is a Full Stack Todo List application made using
                Python's
                Flask for
                backend and JavaScript's React
                for the frontend! This project covers authentication, crud operation on todos and all the best
                practices</p>
            <div className="flex w-full items-center justify-center mt-6 gap-6">
                {/* Filled button */}
                <Link to="/profile"
                      className="px-5 py-2 bg-amber-600 text-white hover:bg-amber-700 duration-200 rounded-md cursor-pointer">Profile</Link>
                {/* Outlined button */}
                <Link to="/pricing"
                      className="text-amber-800 bg-amber-50 px-7 py-2 border border-amber-500 hover:bg-amber-600 hover:text-white duration-200 rounded-lg">Pricing</Link>
            </div>
        </div>

        <div className="flex-1 bg-amber-200 rounded-xl shadow-2xl flex items-center justify-center flex-wrap p-2">
            <DiPython size={100}/>
            <DiJavascript1 size={100}/>
            <DiSqllite size={100}/>
            <DiReact size={100}/>
            <DiDjango size={100}/>
            <DiRust size={100}/>
            <DiGo size={100}/>
            <DiDart size={100}/>
            <DiDatabase size={100}/>
            <DiPhp size={100}/>
            <DiUnitySmall size={100}/>
            <DiFirefox size={100}/>
            <DiVim size={100}/>
            <DiSwift size={100}/>
            <DiStackoverflow size={100}/>
            <SiTesla size={100}/>
        </div>
    </div>
}