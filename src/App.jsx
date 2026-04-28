import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import VerifyOTP from "./pages/VerifyOtp"
import Dashboard from "./pages/Dashboard"
import Deposit from "./pages/Deposit"
import SendMoney from "./pages/SendMoney"
import Transactions from "./pages/Transactions"
import Notifications from "./pages/Notifications"
import ChangePassword from "./pages/ChangePassword"
import ChangePin from "./pages/ChangePin"
import Logout from "./pages/Logout"

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<VerifyOTP />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/send" element={<SendMoney />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/change-pin" element={<ChangePin />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>

        </BrowserRouter>

    )

}

export default App