import { Link, NavLink } from "react-router-dom";

export default function Header() {
    const activeLink = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function fakeLogOut() {
        localStorage.removeItem("loggedin");
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
            <NavLink 
                to="/host"
                style={({isActive}) => isActive ? activeLink : null}
            >
                Host
            </NavLink>
            <NavLink 
                to="/about"
                style={({isActive}) => isActive ? activeLink : null}
            >
                About
            </NavLink>
            <NavLink 
                to="/vans"
                style={({isActive}) => isActive ? activeLink : null}
            >
                Vans
            </NavLink>
            <Link to="login" className="login-link">
                <img
                    src="/avatar-icon.png"
                    className="login-icon"
                />
            </Link>
            <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    );
}