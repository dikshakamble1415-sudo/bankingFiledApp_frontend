import { useState } from "react"
import API from "../api/Api"
import Navbar from "../components/Navbar"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {

    const [currentPassword, setCurrent] = useState("")
    const [newPassword, setNew] = useState("")
    const [confirmPassword, setConfirm] = useState("")

    const change = async (e) => {
        e.preventDefault()

        await API.post("https://bankingfiledapp.onrender.com/api/user/change-password", {
            currentPassword,
            newPassword,
            confirmPassword
        })

        toast.success("Password changed")

        setCurrent("")
        setNew("")
        setConfirm("")
    }

    return (

        <>
            <Navbar />

            <div className="container col-md-4 mt-5">

                <h3 className="mb-4 text-center">
                    Change Password
                </h3>

                <form className="card p-4 shadow" onSubmit={change}>

                    <input type="password" className="form-control mb-3" placeholder="Current Password" value={currentPassword}
                        onChange={(e) => setCurrent(e.target.value)} />

                    <input type="password" className="form-control mb-3" placeholder="New Password" value={newPassword}
                        onChange={(e) => setNew(e.target.value)} />

                    <input type="password" className="form-control mb-3" placeholder="Confirm Password" value={confirmPassword}
                        onChange={(e) => setConfirm(e.target.value)} />

                    <button className="btn btn-success w-100">
                        Change Password
                    </button>

                </form>

            </div>

            <ToastContainer position="top-right" autoClose={2000} />

        </>

    )

}

export default ChangePassword