import {Link} from "react-router-dom"
import "../css/NavBar.css"

function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Film Catalogue</Link>
        </div>

        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <Link to="/watchlist" className="nav-link">Watchlist</Link>
        </div>

    </nav>
}

export default NavBar

//paths like "/favorites" are as defined in App.jsx