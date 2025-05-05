import {useAuth} from "../context/AuthContext.tsx";
import {CgProfile} from "react-icons/cg";
import Button from "../components/Button.tsx";

export default function ProfilePage() {
    const {user, logout} = useAuth();

    const handleLogout = async () => {
        const {success, message} = await logout();

        if (success) {
            alert(message);
        } else {
            alert(message);
        }
    }

    if (!user) {
        return null;
    }

    return <div className="max-w-5xl mx-auto flex flex-col pt-8 items-start">
        <div className="flex">
            <div className="w-54 h-54 rounded-full bg-amber-400 flex items-center justify-center">
                <CgProfile size={100}/>
            </div>

            <div className="ml-10 flex flex-col gap-3">
                <h2 className="text-5xl font-semibold">{user.username}</h2>
                <h3 className="text-2xl font-semibold">{user.email}</h3>
                <Button text="Logout" type="button" variant="outline" clasName="" onClick={handleLogout}/>
            </div>
        </div>

        <span
            className="mt-5 px-4 py-1 border border-amber-400 text-amber-900 rounded-2xl">Since: {user.created_at.split(" ").slice(0, 5).join(" ")}</span>
    </div>
}