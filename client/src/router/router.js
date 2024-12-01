import { createBrowserRouter } from "react-router-dom";
import { Levels } from "../containers/levels";
import { Chapters } from "../containers/chapters";
import { Stories } from "../containers/stories";
import { Login } from "../containers/login";
import { Register } from "../containers/register";
import { MainContainer } from "../containers/main-container";
import { Paths } from "../constants/paths";
import { ProtectedRoute, PublicRoute } from "../wrappers/wrapper";
import { ErrorPage } from "../containers/error-page";

export const router = createBrowserRouter([
  {
    path: Paths.LOGIN,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: Paths.REGISTER,
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: Paths.BASE,
    element: (
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Stories />,
      },
      {
        path: Paths.CHAPTERS,
        element: <Chapters />,
      },
      {
        path: Paths.LEVEL,
        element: <Levels />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);
