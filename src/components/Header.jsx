import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between py-3 px-5 bg-palette3">
      <div className="logo">
        <h1 className="font-medium">Football Taboo</h1>
      </div>
      <nav>
        <ul className="flex">
          <li className="mr-3">
            <Link to="/">Item 1</Link>
          </li>
          <li className="mr-3">
            <Link to="/">Item 2</Link>
          </li>
          <li className="mr-3">
            <Link to="/">Item 3</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
