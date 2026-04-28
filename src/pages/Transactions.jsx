import { useEffect, useState } from "react"
import API from "../api/Api"
import Navbar from "../components/Navbar"

function Transactions() {

    const [transactions, setTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const transactionsPerPage = 10

    useEffect(() => {
        fetchTransactions()
    }, [])

    const fetchTransactions = async () => {
        const res = await API.get("https://bankingfiledapp.onrender.com/api/transactions/")

        // ✅ SORT BY LATEST FIRST
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date))

        setTransactions(sorted)
    }

    const indexOfLast = currentPage * transactionsPerPage
    const indexOfFirst = indexOfLast - transactionsPerPage
    const currentTransactions = transactions.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(transactions.length / transactionsPerPage)

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h3 className="mb-4">
                    Transactions
                </h3>

                <table className="table table-bordered">

                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {currentTransactions.map(t => (
                            <tr key={t._id}>
                                <td>{t.type}</td>
                                <td>₹ {Number(t.amount).toLocaleString("en-IN")}</td>
                                <td className={
                                    t.status === "success" ? "text-success" :
                                        t.status === "pending" ? "text-warning" :
                                            "text-danger"
                                }>
                                    {t.status}
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

                <div className="d-flex justify-content-center gap-2"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                    }}>

                    <button
                        className="btn btn-success"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Prev
                    </button>

                    <span className="align-self-center">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        className="btn btn-success"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>

        </>

    )

}

export default Transactions