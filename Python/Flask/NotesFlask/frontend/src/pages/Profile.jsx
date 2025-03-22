import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-start max-w-xl w-full shadow-lg rounded-lg p-4 mx-auto bg-zinc-800 mt-10">
      <h3 className="text-4xl font-bold mb-2">{user.username}</h3>
      <h4 className="text-xl font-normal text-neutral-200 mb-4">
        {user.email}
      </h4>
      <h4 className="text-2xl font-semibold">Notes: {user.notes.length}</h4>
    </div>
  );
};

export default Profile;
