import {useAuth} from "../context/AuthContext.tsx";
import {Link} from "react-router-dom";
import {ReactElement} from "react";
import {HiHome} from "react-icons/hi";
import {BsPerson} from "react-icons/bs";
import {GrLogin} from "react-icons/gr";
import {CgLock} from "react-icons/cg";
import {IoCreate} from "react-icons/io5";
import {BiTask} from "react-icons/bi";

interface NavLinkProp {
    title: string;
    url: string;
    icon: ReactElement;
}
    

function NavLink(props: NavLinkProp) {
    return <Link to={props.url} className="flex flex-col items-center justify-center flex-1 hover:bg-amber-500 pt-2">
        {props.icon}
        <span className="text-lg mt-1">{props.title}</span>
    </Link>
}

export default function Navbar() {
    const {accessToken} = useAuth();

    return <nav className="fixed bottom-0 left-0 w-full flex items-center bg-amber-400 md:px-14">
        {accessToken ? <>
            <NavLink title="Home" url="/" icon={<HiHome size={25}/>}/>
            <NavLink title="Todos" url="/todos" icon={<BiTask size={25}/>}/>
            <NavLink title="Create" url="/todo/create" icon={<IoCreate size={25}/>}/>
            <NavLink title="Profile" url="/profile" icon={<BsPerson size={25}/>}/>
        </> : <>
            <NavLink title="Home" url="/" icon={<HiHome size={25}/>}/>
            <NavLink title="Login" url="/auth/login" icon={<GrLogin size={25}/>}/>
            <NavLink title="Register" url="/auth/register" icon={<CgLock size={25}/>}/>
        </>}
    </nav>
}