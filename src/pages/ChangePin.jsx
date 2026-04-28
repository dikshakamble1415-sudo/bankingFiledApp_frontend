import { useState } from "react"
import API from "../api/Api"
import Navbar from "../components/Navbar"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePin() {

    const [currentPin, setCurrent] = useState("")
    const [newPin, setNew] = useState("")
    const [confirmNewPin, setConfirm] = useState("")

    const change = async (e) => {
        e.preventDefault()

        await API.post("https://bankingfiledapp.onrender.com/api/user/change-pin", {
            currentPin,
            newPin,
            confirmNewPin
        })

        toast.success("PIN changed")

        setCurrent("")
        setNew("")
        setConfirm("")
    }

    return (

        <>
            <Navbar />

            <div className="container col-md-4 mt-5">

                <h3 className="text-center mb-4">
                    Change Transaction PIN
                </h3>

                <form className="card p-4 shadow" onSubmit={change}>

                    <input type="password" className="form-control mb-3" placeholder="Current PIN" value={currentPin}
                        onChange={(e) => setCurrent(e.target.value)} />

                    <input type="password" className="form-control mb-3" placeholder="New PIN" value={newPin}
                        onChange={(e) => setNew(e.target.value)} />

                    <input type="password" className="form-control mb-3" placeholder="Confirm PIN" value={confirmNewPin}
                        onChange={(e) => setConfirm(e.target.value)} />

                    <button className="btn btn-success w-100">
                        Change PIN
                    </button>

                </form>

            </div>

            <ToastContainer position="top-right" autoClose={2000} />

        </>

    )

}

export default ChangePin