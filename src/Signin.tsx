import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSigninMutation } from "./redux/bookApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
type FormValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin, { isError, isSuccess, data }] = useSigninMutation();
  const onSubmit: SubmitHandler<FormValues> = (formdata) => {
    signin(formdata);
  };
  useEffect(() => {
    if (isSuccess) {
      console.log("User login success", data);
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      navigate("/");
    }
  }, [isSuccess]);
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="border p-2 border-black"
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      <input
        className="border p-2 border-black"
        type="password"
        placeholder="password"
        {...register("password")}
      />

      <input type="submit" />
    </form>
  );
}
