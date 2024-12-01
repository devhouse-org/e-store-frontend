import { Route, Routes } from "react-router-dom";
import "./App.css";
import Components from "./pages/Components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Components />} />
    </Routes>
  );
}

export default App;
