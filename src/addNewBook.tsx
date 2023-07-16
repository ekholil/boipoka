import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateBookMutation } from "./redux/bookApi";
type FormValues = {
  title: string;
  author: string;
  genre: string;
  publicationDate: number;
};

export default function AddNewBook() {
  const { register, handleSubmit } = useForm<FormValues>();

  const [createBook, { isError, error }] = useCreateBookMutation();
  const onSubmit: SubmitHandler<FormValues> = (formdata) => {
    console.log(formdata);
    createBook(formdata);
    console.log(error, isError);
  };

  useEffect(() => {
    console.log(error, isError);
  }, [error, isError]);
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <div className="container">
      <div className="max-w-[450px] mx-auto p-3 sm:p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-5">
          Add New Book
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            placeholder="Book Title"
            {...register("title")}
          />
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            placeholder="Author Name"
            {...register("author")}
          />
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            placeholder="Genre"
            {...register("genre")}
          />
          <input
            className="input input-bordered input-primary w-full "
            type="number"
            placeholder="Publication Year"
            {...register("publicationDate", { valueAsNumber: true })}
          />

          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
    </div>
  );
}
