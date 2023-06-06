import { useAuth0 } from "@auth0/auth0-react";
import Lottie from "lottie-react";
import profileLoading from "../assets/profileLoading.json";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="m-auto p-4 mt-20">
        <Lottie animationData={profileLoading} className="sm:h-80 h-56" />
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div className="m-auto p-4 mt-20">
        <div className="m-auto flex flex-col items-center justify-around p-4  sm:w-1/2 border-black border-2 rounded-2xl">
          <img src={user.picture} alt={user.name} className="rounded-full" />
          <h2 className="text-3xl font-bold mt-8">{user.name}</h2>
          <p className="font-bold mt-2">{user.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
