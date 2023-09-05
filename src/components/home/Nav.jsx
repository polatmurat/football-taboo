import { BiFootball } from "react-icons/bi";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full h-[70px] flex items-center shadow-md fixed top-0 right-0 left-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1>Football Taboo</h1>
          </Link>
          <ul className="flex items-center">
            <li className="nav__item cursor-pointer">
              <BiFootball size={22} />
            </li>
            <li className="nav__item text-black">
              <Link to="/reg-team" className="nav__link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
