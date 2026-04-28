import { useEffect, useState } from "react"
import API from "../api/Api"
import Navbar from "../components/Navbar"

function Dashboard() {

    const [balance, setBalance] = useState(0)

    const fetchBalance = async () => {
        const res = await API.get("http://localhost:8000/api/user/balance")
        setBalance(res.data.balance)
    }


    useEffect(() => {
        fetchBalance()

    }, [])

    return (

        <>



            <Navbar />


            <div className="container mt-5">

                <div className="card p-5 shadow text-center">

                    <h3>Account Balance</h3>

                    <h1 className="text-success mt-3">
                        ₹ {Number(balance).toLocaleString("en-IN")}
                    </h1>

                </div>

            </div>

        </>

    )

}

export default Dashboard