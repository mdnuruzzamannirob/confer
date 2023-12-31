import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { Button } from "@material-tailwind/react";
import useAuthContext from "../../../hooks/useAuthContext";
import { useRef, useState } from "react";
import { PiWarningOctagonFill } from "react-icons/pi";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase.config";
import Footer from "../../common/footer/Footer";
import NavBar from "../../common/header/NavBar";

const Login = () => {
  // use state
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  // context
  const { signInUser } = useAuthContext();
  // navigate
  const navigate = useNavigate();
  // use location
  const location = useLocation();
  // use ref
  const emailRef = useRef();

  const handleSignInUser = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    signInUser(email, password)
      .then(() => {
        toast.success("Login successfully.", {
          position: "top-center",
          duration: 4000,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        if (
          error.message === "Firebase: Error (auth/invalid-login-credentials)."
        ) {
          setPasswordValidation("Invalid password mismatch.");
        } else if (
          error.message ===
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          setPasswordValidation(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. "
          );
        }
        toast.error(error.message.slice(10));
      });
  };

  // Forgot Password email verification
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (email.length === 0) {
      return setEmailValidation("Please provide an email address.");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      return setEmailValidation("Please enter a valid email address.");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Please check yor email.");
      })
      .catch(() => {});
  };

  return (
    <>
      <NavBar></NavBar>
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="flex items-center justify-center flex-col gap-12 md:gap-20 mt-20 mb-40 md:mb-48"
      >
        <div data-aos="fade-up" data-aos-duration="1500">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold md:font-bold bg-gradient-to-r from-[#e83e8c]  to-[#6610f2] bg-clip-text text-transparent uppercase">
            Welcome To The CONFER
            <span className="block mt-3">Login Now</span>
          </h1>
        </div>
        <div className="flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none w-[300px] md:w-[420px]">
          <SocialLogin></SocialLogin>
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="mx-4">Or, Login with your email</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <form
            onSubmit={handleSignInUser}
            className="mt-8 mb-2 max-w-screen-lg max-h-[90vh]"
          >
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <div className="font-medium ml-6 mb-2">Email</div>
                <input
                  ref={emailRef}
                  className="border border-gray-400 p-2 pl-6 rounded-3xl focus:outline-none focus:border-[#e83e8c] w-full"
                  type="email"
                  placeholder="Your email"
                  required
                />
                <label
                  className=" px-2 py-1 text-gray-600 text-xs "
                  htmlFor="inputField"
                ></label>
                {emailValidation && (
                  <p className="flex items-center gap-1 text-[#e83e8c] text-sm mt-1">
                    <span>
                      {" "}
                      <PiWarningOctagonFill></PiWarningOctagonFill>
                    </span>
                    {emailValidation}
                  </p>
                )}
              </div>

              <div className="w-full">
                <div className="font-medium ml-6 mb-2">Password</div>
                <input
                  className="border border-gray-400 p-2 pl-6 rounded-3xl focus:outline-none focus:border-[#e83e8c] w-full"
                  type="password"
                  placeholder="Your password"
                  name="password"
                  required
                />
                <label
                  className=" px-2 py-1 text-gray-600 text-xs "
                  htmlFor="inputField"
                ></label>
                {passwordValidation && (
                  <p className="flex items-center gap-1 text-[#e83e8c] text-sm mt-1">
                    <span>
                      {" "}
                      <PiWarningOctagonFill></PiWarningOctagonFill>
                    </span>
                    {passwordValidation}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center">
                <label
                  className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="checkbox"
                  data-ripple-dark="true"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-3xl border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#e83e8c] checked:bg-[#e83e8c] checked:before:bg-[#e83e8c] hover:before:opacity-10"
                    id="checkbox"
                  />
                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  className="mt-px cursor-pointer select-none text-gray-700"
                  htmlFor="checkbox"
                >
                  <p className="flex items-center text-sm">Keep me signed in</p>
                </label>
              </div>
              <div className="">
                <a
                  onClick={handleForgetPassword}
                  className="text-sm text-[#e83e8c] hover:underline"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <Button
              type="submit"
              fullWidth
              className="rounded-3xl bg-gradient-to-b from-[#e83e8c] to-[#6610f2] font-Poppins font-medium text-base py-2 mt-3"
            >
              Login
            </Button>
            <p className="mt-4 block text-center text-base font-medium">
              Don&apos;t have an account?
              <Link
                to={"/register"}
                className="font-medium text-[#e83e8c] transition-colors hover:underline ml-2"
                href="#"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
