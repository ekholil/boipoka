import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignupMutation } from "./redux/bookApi";
import { Link, useNavigate } from "react-router-dom";
type FormValues = {
  name: string;
  password: string;
  email: string;
};

export default function SignUp() {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const [signup, { isSuccess }] = useSignupMutation();
  const onSubmit: SubmitHandler<FormValues> = (formdata) => {
    signup(formdata);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);
  return (
    <div className="container">
      <div className="max-w-[450px] mx-auto bg-white p-3 sm:p-5 rounded-lg shadow-lg">
        <h3 className="text-3xl text-center mb-5 font-semibold">
          Create a New Account
        </h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input input-bordered input-primary w-full"
            placeholder="name"
            type="text"
            {...register("name")}
          />
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

          <input type="submit" className="btn btn-primary" />
        </form>
        <p className="text-center py-5">
          Already Have an account?{" "}
          <Link to="/signin" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
