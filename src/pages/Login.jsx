import { useState } from "react"
import API from "../api/Api"
import { useNavigate } from "react-router-dom"
import { FaUsers } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault()

        try {
            const res = await API.post("http://localhost:8000/api/auth/login", { email, password })

            localStorage.setItem("token", res.data.token)

            localStorage.setItem("user", JSON.stringify({
                name: res.data.name
            }))

            toast.success("Login Successful")

            // clear fields after login
            setEmail("")
            setPassword("")

            setTimeout(() => { navigate("/dashboard") }, 1000)

        } catch (err) {
            toast.error("Invalid credentials")
        }
    }

    return (
        <>
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <div
                    className="container col-md-4"
                    style={{
                        background: "rgba(255,255,255,0.95)",
                        padding: "30px",
                        borderRadius: "15px",
                        boxShadow: "0 10px 30px rgba(0.2,0.2,0.2,0.2)"
                    }}
                >

                    <h3
                        className="text-center fw-bold"
                        style={{ marginBottom: "20px", color: "#2c3e50" }}
                    >
                        Member Login
                    </h3>

                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "4rem",
                            marginBottom: "20px",
                            color: "#2c3e50"
                        }}
                    >
                        <FaUsers />
                    </div>

                    <form onSubmit={login} autoComplete="off">

                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                            style={{
                                borderRadius: "8px",
                                padding: "10px",
                                border: "1px solid #ccc"
                            }}
                        />

                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            style={{
                                borderRadius: "8px",
                                padding: "10px",
                                border: "1px solid #ccc"
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1rem"
                            }}
                        >
                            <button
                                className="btn w-100"
                                type="submit"
                                style={{
                                    background: "linear-gradient(45deg, #28a745, #218838)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "10px"
                                }}
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                className="btn w-100"
                                onClick={() => navigate("/register")}
                                style={{
                                    background: "linear-gradient(45deg, #dc3545, #c82333)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "10px"
                                }}
                            >
                                Sign Up
                            </button>
                        </div>

                    </form>

                </div>

            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}

export default Login