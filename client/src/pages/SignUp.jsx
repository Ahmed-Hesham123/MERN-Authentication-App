import { Link } from "react-router-dom";
import Button from "../components/Button";

const SignUp = () => {
  return (
    <div className="mx-auto p-3 max-w-lg">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="mail"
          placeholder="Email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <Button bgColor="bg-slate-700">Sign up</Button>
        <Button bgColor="bg-red-700">Continue With Google</Button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-bold">Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
