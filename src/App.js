import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Stories } from "./containers/stories";
import "./App.css";
import { Levels } from "./containers/levels";
import { Chapters } from "./containers/chapters";

function App() {
  return (
    <div className="w-full p-3 h-screen bg-black text-white">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Stories />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/level" element={<Levels />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
