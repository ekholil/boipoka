import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteBookMutation, useGetSingleBookQuery } from "./redux/bookApi";
import { Watch } from "react-loader-spinner";
import bookImg from "./assets/book.png";
import { useAppSelector } from "./hooks";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [deleteBook, { isSuccess }] = useDeleteBookMutation(data?.data?.id);
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const handleDelete = () => {
    const sure = confirm("Are you Sure?");
    if (sure) {
      deleteBook(data?.data?.id);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Book Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    }
  }, [isSuccess]);
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
            <h2>Reviews : </h2>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BookDetails;
