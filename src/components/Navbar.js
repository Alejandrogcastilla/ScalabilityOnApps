import { Link } from 'react-router-dom'

const Navbar = () => {

    const logout = () => {
        localStorage.clear();
    }

    return (
        <nav className="navbar">
            <h1>InstaPost</h1>
            <div className="links">
                <Link to="/inicio">Inicio</Link>
                <Link to="/crear_publicacion">Crear publicación</Link>
                <Link to="/registro">Registrate</Link>
                {localStorage.getItem("logged") == "True" ?
                <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link> }

            </div>
            {localStorage.getItem("logged") == "True" ?
                <h4 className="username">{localStorage.getItem("user")}</h4> : null
            }

        </nav>
    );
}
export default Navbar;