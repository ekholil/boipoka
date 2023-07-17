import { Link } from "react-router-dom";
import bookImg from "./assets/book.png";
import { useGetWishListQuery } from "./redux/bookApi";
const Wishlist = () => {
  const { data, isLoading } = useGetWishListQuery(undefined);
  console.log(data);
  return (
    <div className="container">
      {isLoading ? (
        <p>Be patient. wishlist loading</p>
      ) : (
        <div>
          {data.data.length ? (
            <div className="grid grid-cols-12 gap-4">
              {data.data.map((book: any) => (
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
              ))}
            </div>
          ) : (
            <p>wishlist is empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
