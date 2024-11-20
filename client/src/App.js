import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Stories } from "./containers/stories";
import { Levels } from "./containers/levels";
import { Chapters } from "./containers/chapters";
import "./App.css";
import axios from "axios";
import { Login } from "./containers/login";
import { Register } from "./containers/register";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="w-full p-3 h-screen bg-black text-white">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Stories />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/level" element={<Levels />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
