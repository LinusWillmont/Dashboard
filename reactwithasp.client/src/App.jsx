import { Route, Routes } from "react-router-dom";
import "./App.css";
import HumidityTimeChart from "./components/HumidityTimeChart";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/sensors" element={<HumidityTimeChart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
