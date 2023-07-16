import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useCreateBookMutation,
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "./redux/bookApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "./hooks";
type FormValues = {
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: number;
};

export default function EditBook() {
  const { register, handleSubmit } = useForm<FormValues>();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [updateBook, { isSuccess, error }] = useUpdateBookMutation();
  const onSubmit: SubmitHandler<FormValues> = (formdata) => {
    console.log(formdata);
    updateBook({ id, body: formdata });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    console.log(error);
  }, [isSuccess, error]);
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
            defaultValue={data?.data?.title}
            placeholder="Book Title"
            {...register("title")}
          />
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            defaultValue={data?.data?.author}
            placeholder="Author Name"
            {...register("author")}
          />
          <input
            className="input input-bordered input-primary w-full"
            type="text"
            placeholder="Genre"
            defaultValue={data?.data?.genre}
            {...register("genre")}
          />
          <input
            className="input input-bordered input-primary w-full "
            type="number"
            placeholder="Publication Year"
            defaultValue={data?.data?.publicationDate}
            {...register("publicationDate", { valueAsNumber: true })}
          />

          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
    </div>
  );
}
