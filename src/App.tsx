import { useGetBooksQuery } from "./redux/bookApi";

function App() {
  const { data, error, isLoading } = useGetBooksQuery();
  console.log(data);
  return (
    <>
      <h3>All books</h3>
      <div></div>
    </>
  );
}

export default App;
