import { useSelector } from "react-redux";
import Button from "../components/Button";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const handleChange = (e) => {};
  const handleUpdate = (e) => {};
  return (
    <div className="mx-auto p-3 max-w-lg">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2"
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <Button disabled={loading} bgColor="bg-slate-700" type="submit">
          {loading ? "Loading..." : "Update"}
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Up</span>
      </div>
    </div>
  );
};

export default Profile;
