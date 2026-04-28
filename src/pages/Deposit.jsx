import { useState } from "react"
import API from "../api/Api"
import Navbar from "../components/Navbar"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Deposit() {

    const [amount, setAmount] = useState("")
    const [transactionPin, setPin] = useState("")

    const formatINR = (value) => {
        if (!value) return ""
        return Number(value.replace(/,/g, "")).toLocaleString("en-IN")
    }

    const deposit = async (e) => {
        e.preventDefault()

        if (!amount) {
            toast.error("Please enter amount")
            return
        }

        if (!transactionPin) {
            toast.error("Please enter transaction PIN")
            return
        }

        try {

            await API.post("https://bankingfiledapp.onrender.com/api/transactions/", {
                type: "deposit",
                amount: amount.replace(/,/g, ""),
                transactionPin
            })

            toast.success("Deposit successful")

            setAmount("");
            setPin("");

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong")

        }
    }

    return (

        <>
            <Navbar />

            <div className="container col-md-4 mt-5">

                <h3 className="mb-4 text-center">
                    Deposit
                </h3>

                <form className="card p-4 shadow" onSubmit={deposit}>

                    <input
                        className="form-control mb-3"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(formatINR(e.target.value))}
                    />

                    <input
                        className="form-control mb-3"
                        type="password"
                        placeholder="Transaction PIN"
                        value={transactionPin}
                        onChange={(e) => setPin(e.target.value)}
                    />

                    <button className="btn btn-success w-100">
                        Deposit
                    </button>

                </form>

            </div>

            <ToastContainer position="top-right" autoClose={2000} />

        </>

    )

}

export default Deposit