import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {ReactElement} from "react";
import {IoCreate} from "react-icons/io5";
import {BiUser} from "react-icons/bi";
import {LuListTodo} from "react-icons/lu";
import {GrLogin} from "react-icons/gr";
import {CgLock} from "react-icons/cg";

interface NavLinkProps {
    url: string;
    text: string;
    icon: ReactElement;
}

function NavLink({url, text, icon}: NavLinkProps) {
    return <Link to={url} className="flex items-center gap-2 text-neutral-300 hover:text-green-700 duration-200">
        {icon}
        <span className="text-lg">{text}</span>
    </Link>
}

export default function NavBar() {
    const {accessToken} = useAuth();

    return <nav className="w-full sticky top-0 left-0 flex items-center justify-between bg-stone-950 border-b border-neutral-700 px-6 lg:px-12 py-3">
    <Link to="/" className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-red-700 bg-clip-text">MERN Todo</Link>

        {/* Links */}
        <div className="flex items-center gap-7 md:pr-10">
            {accessToken ?
                <>
                    <NavLink url="/todo/create" text="New" icon={<IoCreate size={21}/>}/>
                    <NavLink url="/todos" text="Todos" icon={<LuListTodo size={21}/>}/>
                    <NavLink url="/profile" text="Profile" icon={<BiUser size={21}/>}/>
                </>
                :
                <>
                    <NavLink url="/auth/login" text="Login" icon={<GrLogin size={21}/>} />
                    <NavLink url="/auth/register" text="Register" icon={<CgLock size={21}/>} />
                </>
            }
        </div>
    </nav>
}