// import Link component from react-router-dom
// para redirecionamento de páginas pelo usuário
import { Link } from "react-router-dom";
// import CSS
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
        <h1><Link to={"/"}>Memories</Link></h1>
        <ul>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            <li>
                <Link to={"/add-memory"}>Addicionar Memórias</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Navbar;
