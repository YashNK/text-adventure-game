import { createBrowserRouter, Navigate } from "react-router-dom";
import { Levels } from "../containers/levels";
import { Chapters } from "../containers/chapters";
import { Stories } from "../containers/stories";
import { Login } from "../containers/login";
import { Register } from "../containers/register";
import { MainContainer } from "../containers/main-container";
import { Page } from "../constants/routes";
import { ProtectedRoute, PublicRoute } from "../wrappers";
import { ErrorPage } from "../containers/error-page";
import { Characters } from "../containers/charecters";
import { ForbiddenPage } from "../containers/forbidden-page";
import { LandingPage } from "../containers/landing-page";

export const router = createBrowserRouter([
  {
    path: Page.BASE,
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: Page.LOGIN,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: Page.REGISTER,
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: Page.DASHBOARD,
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
        path: Page.CHARACTERS,
        element: <Characters />,
      },
      {
        path: Page.CHAPTERS,
        element: <Chapters />,
      },
      {
        path: Page.LEVEL,
        element: <Levels />,
      },
    ],
  },
  {
    path: Page.FORBIDDEN,
    element: <ForbiddenPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to={Page.BASE} />,
    errorElement: <ErrorPage />,
  },
]);
