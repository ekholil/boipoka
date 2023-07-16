import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
  usePostReviewMutation,
} from "./redux/bookApi";
import { Watch } from "react-loader-spinner";
import bookImg from "./assets/book.png";
import { useAppSelector } from "./hooks";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const BookDetails = () => {
  const [review, setReview] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [deleteBook, { isSuccess }] = useDeleteBookMutation(data?.data?.id);
  const [postReview, { error }] = usePostReviewMutation();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const handleDelete = () => {
    const sure = confirm("Are you Sure?");
    if (sure) {
      deleteBook(data?.data?.id);
    }
  };
  const postReviewHandle = (e) => {
    e.preventDefault();
    postReview({
      id,
      body: {
        name: user.name,
        review,
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Book Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    }
    console.log(error);
  }, [isSuccess, error]);

  return (
    <div className="container">
      {isLoading ? (
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass="mx-auto"
          visible={true}
        />
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex gap-3 justify-end">
            {user.email && (
              <Link to="/add-new-book" className="btn btn-primary">
                Add New Book
              </Link>
            )}
            {user.id === data?.data?.creatorId && (
              <div className="flex gap-3">
                <Link className="btn btn-secondary" to={`/update-book/${id}`}>
                  Edit Book
                </Link>
                <button onClick={handleDelete} className="btn btn-warning">
                  Delete Book
                </button>
              </div>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <img src={bookImg} alt="image" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xl font-semibold">
              Book Title : {data?.data?.title}
            </h2>
            <p>Author Name : {data?.data?.author}</p>
            <p>Date Published : {data?.data?.publicationDate}</p>
            <p>Genre : {data?.data?.genre}</p>
          </div>
          <div className="col-span-2">
            {user.email ? (
              <div>
                <h2 className="text-3xl mb-4">Write a review</h2>
                <form onSubmit={postReviewHandle}>
                  <input
                    type="text "
                    placeholder="Write your review "
                    className="mr-4 p-2 rounded-lg"
                    onChange={(e) => setReview(e.target.value)}
                    required
                  />
                  <input
                    type="submit"
                    value="Post Review"
                    className="btn btn-primary"
                  />
                </form>
              </div>
            ) : (
              <div>
                <p>
                  <Link className="text-primary" to="/signin">
                    Sign In
                  </Link>{" "}
                  to post a review
                </p>
              </div>
            )}
            <h2 className="text-3xl mt-4 font-semibold">Reviews : </h2>
          </div>
          <div className="flex flex-col gap-4">
            {data?.data?.reveiws.map((item) => (
              <div key={item.review} className="border p-2 rounded-md bg-white">
                <h2>{item.name}</h2>
                <p>{item.review}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BookDetails;
