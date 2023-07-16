import { Link } from "react-router-dom";
import bookImg from "./assets/book.png";
import { useGetBooksQuery } from "./redux/bookApi";
import { Watch } from "react-loader-spinner";
function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  return (
    <div className="container">
      <h3 className="text-3xl font-semibold text-center mb-5 md:m-8">
        All books
      </h3>
      <div className="grid grid-cols-12 gap-4">
        {isLoading ? (
          <div className="flex justify-center py-10 w-full">
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
          </div>
        ) : (
          data.data.map((book: any) => (
            <div
              key={book._id}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3 md:p-4 shadow-lg bg-white rounded-lg border"
            >
              <img src={bookImg} alt="" />
              <h2 className="text-xl">{book.title}</h2>
              <p>Author : {book?.author}</p>
              <p className="mb-4">Genre : {book?.genre}</p>
              <Link to={`/book/${book?._id}`} className="btn btn-primary">
                See Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
