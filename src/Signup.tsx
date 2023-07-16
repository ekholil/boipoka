import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignupMutation } from "./redux/bookApi";
import { useNavigate } from "react-router-dom";
type FormValues = {
  name: string;
  password: string;
  email: string;
};

export default function SignUp() {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const [signup, { isError, isSuccess, data }] = useSignupMutation();
  const onSubmit: SubmitHandler<FormValues> = (formdata) => {
    signup(formdata);
  };
  useEffect(() => {
    if (isSuccess) {
      console.log("User sign up success", data);
      navigate("/");
    }
  }, [isSuccess]);
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="border p-2 border-black"
        placeholder="name"
        type="text"
        {...register("name")}
      />
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
