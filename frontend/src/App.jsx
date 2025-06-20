import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import { AuthenticationProvider } from "./components/AuthenticationContext"
import Hero from "./pages/Hero"
import Insight from "./pages/Insight"
import DailyLogForm from "./pages/DailyLogForm"

function App() {
 

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <AuthenticationProvider>
            <Header/>
            {/* Other components and routes will go here */}
            <Routes>
                <Route path="/" element={<Hero/>} />
                <Route path="/myLogs" element={<Dashboard />} />
                <Route path="/insights" element={<Insight />} />
                <Route path="/create" element={<DailyLogForm />} />
                <Route path="*" element={<Hero />} />
            </Routes>
          </AuthenticationProvider>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
