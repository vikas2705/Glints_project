import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Profile from "./features/profile";
import Header from "./common/components/header";
import Footer from "./common/components/footer/footer";

function App() {
    return (
        <div className='App bg-light min-vh-100'>
            <Header />
            <Routes>
                <Route path='/' element={<Profile />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
