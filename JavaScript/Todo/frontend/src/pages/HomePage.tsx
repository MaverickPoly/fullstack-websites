import {useAuth} from "../context/AuthContext.tsx";
import {Link} from "react-router-dom";

interface HomeButtonProps {
    text: string;
    url: string;
}


function HomeButton(props: HomeButtonProps) {
    return <Link className="px-6 py-2 font-semibold rounded-md border-2 border-sky-800 text-lg hover:bg-sky-800 duration-300" to={props.url}>
        {props.text}
    </Link>
}


export default function HomePage() {
    const {accessToken} = useAuth();

    return <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <h1 className="text-6xl font-bold mb-5 text-transparent bg-gradient-to-r from-orange-800 to-amber-500 bg-clip-text">MERN Todo List Project</h1>
        <p className="max-w-2xl text-center text-neutral-300 mb-9 leading-7">This project is a practice project made with MERN Stack: Express JS and React JS. It contains authentication and CRUD operations on todos.</p>

        {/*Buttons*/}
        <div className="flex gap-4 items-center">
            {accessToken ? <>
            <HomeButton text="Todos" url='/todos' />
            <HomeButton text="Create" url='/todo/create' />
            </> : <>
            <HomeButton text="Login" url="/auth/login" />
            <HomeButton text="Register" url="/auth/register" />
            </>}
        </div>
    </div>
}