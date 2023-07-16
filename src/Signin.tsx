import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSigninMutation } from "./redux/bookApi";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "./redux/userSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
type FormValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const { register, handleSubmit } = useForm<FormValues>();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signin, { isSuccess, data }] = useSigninMutation();
  const onSubmit: SubmitHandler<FormValues> = (formdata) => {
    signin(formdata);
  };
  useEffect(() => {
    if (user.accessToken) {
      navigate("/");
    }
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      navigate("/");
    }
  }, [isSuccess]);
  return (
    <div className="container py-10">
      <div className="max-w-[450px] mx-auto bg-white rounded-lg shadow-lg p-3 sm:p-5">
        <h3 className="text-3xl text-center mb-5">Sign in to your account</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input input-bordered input-primary w-full"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <input
            className="input input-bordered input-primary w-full"
            type="password"
            placeholder="password"
            {...register("password")}
          />

          <input className="btn btn-primary" type="submit" />
        </form>
        <p className="text-center py-4">
          Don't have an account?{" "}
          <Link className="text-primary font-medium" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
