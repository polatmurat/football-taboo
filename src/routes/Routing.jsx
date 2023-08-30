import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/dashboard/Home";
import Taboo from "../pages/dashboard/Taboo";
import Private from "./Private";
import RegTeam from "../components/dashboard/RegTeam";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="reg-team" element={<RegTeam />} />
        <Route path="/taboo" element={<Private><Taboo /></Private>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
