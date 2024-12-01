import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./assets/color.css";

function App() {
  return (
    <div className="h-screen bg-black text-white">
      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
