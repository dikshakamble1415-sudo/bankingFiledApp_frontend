import { useState } from "react"
import API from "../api/Api"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifyOTP() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")

    const verify = async (e) => {
        e.preventDefault()

        console.log("Sending:", { email, otp }) // DEBUG

        try {
            const res = await API.post("http://localhost:8000/api/auth/verify-otp", { email, otp })

            console.log("Response:", res.data) // DEBUG

            toast.success("Registration Successful")

            localStorage.setItem("token", res.data.token)

            navigate("/")

        } catch (err) {
            console.log("Error:", err.response || err) // DEBUG
            toast.error(err.response?.data?.message || "Invalid OTP")
        }
    }

    return (
        <>

            <div className="container col-md-4 mt-5">

                <h3 className="text-center mb-4">
                    Verify OTP
                </h3>

                <form className="card p-4 shadow" onSubmit={verify}>

                    <input
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <button className="btn btn-success w-100">
                        Verify
                    </button>

                </form>

            </div>

            <ToastContainer position="top-right" autoClose={2000} />

        </>

    )

}

export default VerifyOTP