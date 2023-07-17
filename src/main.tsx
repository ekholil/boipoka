import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./Signup.tsx";
import Signin from "./Signin.tsx";
import App from "./App.tsx";
import Home from "./Home.tsx";
import AllBooks from "./AllBooks.tsx";
import BookDetails from "./BookDetails.tsx";
import AddNewBook from "./addNewBook.tsx";
import { PrivateRoute } from "./PrivateRoute.tsx";
import "react-toastify/dist/ReactToastify.css";
import EditBook from "./EditBook.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <h2>Page not found</h2>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
