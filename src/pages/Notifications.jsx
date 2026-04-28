import { useEffect, useState } from "react"
import API from "../api/Api"
import Navbar from "../components/Navbar"

function Notifications() {

    const [notifications, setNotifications] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const notificationsPerPage = 10

    useEffect(() => {
        fetchNotifications()
    }, [])

    const fetchNotifications = async () => {
        const res = await API.get("https://bankingfiledapp.onrender.com/api/user/notifications")
        setNotifications(res.data.notifications)
    }

    const formatINR = (text) => {
        return text.replace(/\d+/g, (num) =>
            Number(num).toLocaleString("en-IN")
        )
    }

    const indexOfLast = currentPage * notificationsPerPage
    const indexOfFirst = indexOfLast - notificationsPerPage
    const currentNotifications = notifications.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(notifications.length / notificationsPerPage)

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h3 className="mb-4">
                    Notifications
                </h3>

                <ul className="list-group">

                    {currentNotifications.map(n => (
                        <li key={n._id} className="list-group-item d-flex justify-content-between">

                            <span>
                                {formatINR(n.message.split("Status")[0])}
                            </span>

                            <span className={
                                n.status === "success" ? "text-success" :
                                    n.status === "pending" ? "text-warning" :
                                        "text-danger"
                            }>
                                {n.status}
                            </span>

                        </li>
                    ))}

                </ul>

                <div
                    className="d-flex justify-content-center gap-2"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                    }}
                >

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

export default Notifications