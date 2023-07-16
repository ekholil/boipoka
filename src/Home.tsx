import bookImg from "./assets/book.png";
import { useGetBooksQuery } from "./redux/bookApi";

function Home() {
  const { data, error, isLoading } = useGetBooksQuery(undefined);
  console.log(data);
  return (
    <div className="mx-3">
      <h3 className="text-3xl font-semibold text-center mb-5 md:m-8">
        All books
      </h3>
      <div className="grid grid-cols-12 gap-4">
        {isLoading ? (
          <h3>Loading books. Please wait.....</h3>
        ) : (
          data.data.map((book) => (
            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3 md:p-4 shadow-lg bg-white rounded-lg border">
              <img src={bookImg} alt="" />
              <h2 className="text-xl">{book.title}</h2>
              <p>Author : {book?.author}</p>
              <p>Genre : {book?.genre}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
