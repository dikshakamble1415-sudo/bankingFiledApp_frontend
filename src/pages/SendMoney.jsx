import { useEffect, useState } from "react"
import API from "../api/Api"
import Navbar from "../components/Navbar"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SendMoney() {

    const [users, setUsers] = useState([])
    const [recipient, setRecipient] = useState("")
    const [amount, setAmount] = useState("")
    const [transactionPin, setPin] = useState("")

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const res = await API.get("https://bankingfiledapp.onrender.com/api/user/users")
        setUsers(res.data)
    }

    const formatINR = (value) => {
        if (!value) return ""
        return Number(value.replace(/,/g, "")).toLocaleString("en-IN")
    }

    const send = async (e) => {
        e.preventDefault()

        if (!recipient) {
            toast.error("Please select user")
            return
        }

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
                type: "send",
                amount: amount.replace(/,/g, ""),
                recipient,
                transactionPin
            })

            toast.success("Transaction successful")

            setAmount("")
            setPin("")
            setRecipient("")

        } catch (err) {
            if (err.response?.data?.message === "Invalid PIN") {
                toast.error("Wrong PIN")
            } else {
                toast.error(err.response?.data?.message || "Transaction failed")
            }
        }
    }

    return (
        <>
            <Navbar />

            <div className="container col-md-4 mt-5">

                <h3 className="text-center mb-4">
                    Send Money
                </h3>

                <form className="card p-4 shadow" onSubmit={send}>

                    <select className="form-control mb-3" value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                        <option value="">Select User</option>

                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}

                    </select>

                    <input
                        className="form-control mb-3"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(formatINR(e.target.value))}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Transaction PIN"
                        type="password"
                        value={transactionPin}
                        onChange={(e) => setPin(e.target.value)}
                    />

                    <button className="btn btn-success w-100">
                        Send
                    </button>

                </form>

            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}

export default SendMoney