import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LOGO1 from "../assets/BankappLogo.png"

function Navbar() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("")


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setUserName(user.name)
        }

    }, [])

    return (
        <nav className="navbar navbar-dark bg-success navbar-expand-lg">

            <div className="container">


                <Link className="navbar-brand" to="/dashboard">

                    {loading && <span className="text-white">Loading...</span>}

                    <img
                        src={LOGO1}
                        alt="logo"
                        height="40rem"
                        style={{ display: loading ? "none" : "block" }}
                        onLoad={() => setLoading(false)}
                    />

                </Link>


                <div className="text-center mt-3 text-light">
                    <h4 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Welcome, {userName}</h4>
                </div>


                {/* Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setOpen(!open)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu */}
                <div className={`navbar-collapse ${open ? "show" : "collapse"}`}>

                    <div className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

                        <Link className="btn btn-outline-light fw-bold" to="/dashboard" onClick={() => setOpen(false)}>
                            Dashboard
                        </Link>

                        <Link className="btn btn-outline-light fw-bold" to="/deposit" onClick={() => setOpen(false)}>
                            Deposit
                        </Link>

                        <Link className="btn btn-outline-light fw-bold" to="/send" onClick={() => setOpen(false)}>
                            Send
                        </Link>

                        <Link className="btn btn-outline-light fw-bold" to="/transactions" onClick={() => setOpen(false)}>
                            Transactions
                        </Link>

                        <Link className="btn btn-outline-light fw-bold" to="/notifications" onClick={() => setOpen(false)}>
                            Notifications
                        </Link>

                        <Link className="btn btn-outline-light fw-bold" to="/change-password" onClick={() => setOpen(false)}>
                            Password
                        </Link>

                        <Link className="btn btn-outline-light fw-bold" to="/change-pin" onClick={() => setOpen(false)}>
                            PIN
                        </Link>

                        <button className="btn btn-danger fw-bold" onClick={() => { setOpen(false); navigate("/logout") }}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;