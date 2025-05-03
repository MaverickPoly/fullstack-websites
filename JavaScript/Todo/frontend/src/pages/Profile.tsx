import {useAuth} from "../context/AuthContext.tsx";

export default function ProfilePage() {
    const {user, logout} = useAuth();

    const handleLogout = async () => {
        const {success, message} = await logout();

        // TODO: Show Toast
        if (success) {
            alert(message);
        } else {
            alert(message);
        }
    }


    if (!user) {
        return <h3>Loading...</h3>
    }

    return <div className="mt-5">
        {/* Row */}
        <div className="flex items-center justify-end">
            <span className="px-2 py-1 rounded-full border border-stone-600">Since {user.createdAt.split("T")[0]}</span>
        </div>

        <div className="space-y-3">
            <h3 className="text-4xl font-bold">{user.username}</h3>
            <h4 className="text-lg">{user.email}</h4>
        </div>
        <button className="px-6 py-2 rounded-lg text-lg bg-red-700 mt-4 cursor-pointer hover:bg-red-800" onClick={handleLogout}>Logout</button>
    </div>
}