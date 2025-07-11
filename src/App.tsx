import { Outlet } from "react-router";
import "./App.css";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
        <ToastContainer></ToastContainer>
      </main>
      <Footer />
    </div>
  );
}

export default App;
