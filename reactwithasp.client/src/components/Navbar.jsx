import { useNavigate } from "react-router-dom";
import statisticsSvg from "../assets/statistics.svg";
import homeSvg from "../assets/home.svg";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="menu">
      <button onClick={() => navigate("/")}>
        <img src={homeSvg} alt="Stats" style={{ width: "50px" }} />
      </button>
      <button onClick={() => navigate("/sensors")}>
        <img src={statisticsSvg} alt="Stats" style={{ width: "50px" }} />
      </button>
    </div>
  );
};
// {`${assets.statistics.svg}`}
