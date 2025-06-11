import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import { AuthenticationProvider } from "./components/AuthenticationContext"
import Hero from "./pages/Hero"

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
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </AuthenticationProvider>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
