import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav>
            <h2>TechFest 2026</h2>

            <Link to="/login">Login</Link>{" "}
            <Link to="/signup">Sign Up</Link>{" "}
            <Link to="/events">Events</Link>{" "}

            {token && (
                <>
                    <Link to="/my-registrations">
                        My Registrations
                    </Link>{" "}

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </>
            )}
        </nav>
    );
}

export default Navbar;