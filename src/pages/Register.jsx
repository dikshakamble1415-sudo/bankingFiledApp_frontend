import { useState } from "react";
import API from "../api/Api";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [transactionPin, setTransactionPin] = useState("");
    const [message, setMessage] = useState("");

    const register = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("https://bankingfiledapp.onrender.com/api/auth/register", {
                name,
                email,
                password,
                confirmPassword,
                transactionPin
            });

            setMessage(res.data.message);

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setTransactionPin("");

            navigate("/verify");

        } catch (error) {
            if (error.response && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong");
            }
        }
    };

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
                        Member Register
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

                    {message && (
                        <p
                            style={{
                                textAlign: "center",
                                marginBottom: "15px",
                                color: "red",
                                fontWeight: "500"
                            }}
                        >
                            {message}
                        </p>
                    )}

                    <form onSubmit={register}>

                        <input
                            className="form-control mb-3"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                borderRadius: "8px",
                                padding: "10px",
                                border: "1px solid #ccc"
                            }}
                        />

                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            style={{
                                borderRadius: "8px",
                                padding: "10px",
                                border: "1px solid #ccc"
                            }}
                        />

                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                borderRadius: "8px",
                                padding: "10px",
                                border: "1px solid #ccc"
                            }}
                        />

                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Transaction PIN"
                            value={transactionPin}
                            onChange={(e) => setTransactionPin(e.target.value)}
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
                                Register
                            </button>

                            <button
                                type="button"
                                className="btn w-100"
                                onClick={() => navigate("/")}
                                style={{
                                    background: "linear-gradient(45deg, #dc3545, #c82333)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "10px"
                                }}
                            >
                                Login
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </>
    );
}

export default Register;