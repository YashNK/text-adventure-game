import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import "./assets/color.scss";
import "./assets/constants.scss";
import "./assets/fonts.scss";

function App() {
  return (
    <div className="h-screen">
      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={1500}
        limit={5}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
